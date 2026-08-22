import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/i18n/config";

type ContactPayload = {
  nama?: string;
  email?: string;
  whatsapp?: string;
  kebutuhan?: string;
  pesan?: string;
  company?: string; // honeypot anti-spam
};

function isConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS,
  );
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const nama = (payload.nama ?? "").trim().slice(0, 100);
  const email = (payload.email ?? "").trim().slice(0, 150);
  const whatsapp = (payload.whatsapp ?? "").trim().slice(0, 30);
  const kebutuhan = (payload.kebutuhan ?? "").trim().slice(0, 120);
  const pesan = (payload.pesan ?? "").trim().slice(0, 2000);

  // Bot yang mengisi honeypot dianggap sukses tanpa dikirim
  if (payload.company) {
    return NextResponse.json({ ok: true });
  }

  if (
    !nama ||
    !kebutuhan ||
    !pesan ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  // Tanpa konfigurasi SMTP, minta klien beralih ke mode mailto
  if (!isConfigured()) {
    return NextResponse.json({ ok: false, fallback: true });
  }

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
      subject: `[Website Latansa] ${kebutuhan} — ${nama}`,
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
    console.error("[kontak] Gagal mengirim email:", error);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
