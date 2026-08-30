import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/i18n/config";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { getSupabaseAdmin } from "@/lib/db";

type ContactPayload = {
  nama?: string;
  email?: string;
  whatsapp?: string;
  kebutuhan?: string;
  pesan?: string;
  company?: string; // honeypot anti-spam
  startedAt?: number; // anti-bot: waktu form dibuka
};

const MAX_BODY_BYTES = 10_000;
const MIN_FILL_TIME_MS = 1500;

function isEmailConfigured() {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );
}

function isTelegramConfigured() {
  return Boolean(
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID,
  );
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Kirim notifikasi pesan ke Telegram; false bila gagal/tidak dikonfigurasi */
async function sendTelegram(payload: {
  nama: string;
  email: string;
  whatsapp: string;
  kebutuhan: string;
  pesan: string;
}): Promise<boolean> {
  if (!isTelegramConfigured()) return false;

  const text = [
    "<b>PESAN BARU - Website Latansa</b>",
    "",
    `<b>Nama:</b> ${escapeHtml(payload.nama)}`,
    `<b>Email:</b> ${escapeHtml(payload.email)}`,
    `<b>WhatsApp:</b> ${payload.whatsapp ? escapeHtml(payload.whatsapp) : "-"}`,
    `<b>Kebutuhan:</b> ${escapeHtml(payload.kebutuhan)}`,
    "",
    "<b>Pesan:</b>",
    escapeHtml(payload.pesan),
  ].join("\n");

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      },
    );
    return response.ok;
  } catch (error) {
    console.error("[kontak] Gagal mengirim notifikasi Telegram:", error);
    return false;
  }
}

/** Simpan pesan kontak ke database; false bila gagal/tidak dikonfigurasi */
async function saveToDb(payload: {
  nama: string;
  email: string;
  whatsapp: string;
  kebutuhan: string;
  pesan: string;
}): Promise<boolean> {
  try {
    // 1) @supabase/server — admin client (RLS ketat: anon punya nol akses)
    const db = getSupabaseAdmin();
    if (db) {
      const { error } = await db.from("contact_messages").insert(payload);
      if (error) throw error;
      return true;
    }
  } catch (error) {
    console.error("[kontak] Gagal menyimpan ke database:", error);
  }
  return false;
}

/** Tolak request yang Origin-nya jelas bukan dari situs ini (lapisan CSRF) */
function isForeignOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin || origin === "null") return false;

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return true;
  }

  // Sama dengan Host header = same-origin
  const hostHeader = request.headers.get("host");
  if (hostHeader && originHost === hostHeader) return false;

  // Izinkan localhost untuk development
  if (
    originHost.startsWith("localhost") ||
    originHost.startsWith("127.0.0.1")
  ) {
    return false;
  }

  // Domain produksi bisa ditambahkan lewat env (dipisah koma)
  const allowed = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (allowed.includes(originHost)) return false;

  return true;
}

export async function POST(request: Request) {
  // ---- Lapisan 1: batas ukuran body ----
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "payload_too_large" },
      { status: 413 },
    );
  }

  // ---- Lapisan 2: rate limit per IP ----
  const rate = checkRateLimit(getClientIp(request));
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfter) },
      },
    );
  }

  // ---- Lapisan 3: verifikasi asal request ----
  if (isForeignOrigin(request)) {
    return NextResponse.json(
      { ok: false, error: "forbidden_origin" },
      { status: 403 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_body" },
      { status: 400 },
    );
  }

  const nama = (payload.nama ?? "").trim().slice(0, 100);
  const email = (payload.email ?? "").trim().slice(0, 150);
  const whatsapp = (payload.whatsapp ?? "").trim().slice(0, 30);
  const kebutuhan = (payload.kebutuhan ?? "").trim().slice(0, 120);
  const pesan = (payload.pesan ?? "").trim().slice(0, 2000);

  // ---- Lapisan 4: honeypot - bot yang mengisi dibuang diam-diam ----
  if (payload.company) {
    return NextResponse.json({ ok: true });
  }

  // ---- Lapisan 5: bot mengisi terlalu cepat (< 1,5 detik) ----
  const startedAt = Number(payload.startedAt ?? 0);
  if (
    Number.isFinite(startedAt) &&
    startedAt > 0 &&
    Date.now() - startedAt < MIN_FILL_TIME_MS
  ) {
    return NextResponse.json({ ok: true });
  }

  // ---- Lapisan 6: validasi input ----
  if (
    !nama ||
    !kebutuhan ||
    !pesan ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      { ok: false, error: "invalid_fields" },
      { status: 400 },
    );
  }

  const data = { nama, email, whatsapp, kebutuhan, pesan };

  // 0) Simpan ke database Supabase (arsip permanen)
  const dbSaved = await saveToDb(data);

  // 1) Notifikasi Telegram (notifikasi real-time)
  const telegramSent = await sendTelegram(data);

  // 2) Email via SMTP (opsional)
  if (isEmailConfigured()) {
    try {
      const port = Number(process.env.SMTP_PORT ?? 587);
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: port === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.CONTACT_FROM
          ? `"Website Latansa" <${process.env.CONTACT_FROM}>`
          : `"Website Latansa" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_TO ?? site.email,
        replyTo: email,
        subject: `[Website Latansa] ${kebutuhan} - ${nama}`,
        text: [
          `Nama: ${nama}`,
          `Email: ${email}`,
          `No. WhatsApp: ${whatsapp || "-"}`,
          `Kebutuhan: ${kebutuhan}`,
          "",
          "Pesan:",
          pesan,
        ].join("\n"),
      });

      return NextResponse.json({ ok: true });
    } catch (error) {
      // Email gagal, tetapi pesan sudah tercatat di Telegram
      if (telegramSent) {
        return NextResponse.json({ ok: true });
      }
      console.error("[kontak] Gagal mengirim email:", error);
      return NextResponse.json(
        { ok: false, error: "send_failed" },
        { status: 502 },
      );
    }
  }

  // Tanpa SMTP: cukup Telegram/database, atau minta klien membuka aplikasi email
  if (telegramSent || dbSaved) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, fallback: true });
}
