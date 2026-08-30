import { hashPassword } from "@/lib/admin-auth";
import { getSupabaseAdmin, isDbConfigured } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 4_000;

/** Cek apakah tabel admin_users masih kosong (tanpa perlu login) */
export async function GET() {
  if (!isDbConfigured()) {
    return Response.json({ ok: false, error: "db_unavailable" }, { status: 503 });
  }
  const db = getSupabaseAdmin();
  if (!db) {
    return Response.json({ ok: false, error: "db_unavailable" }, { status: 503 });
  }
  try {
    const { count, error } = await db
      .from("admin_users")
      .select("username", { count: "exact", head: true });
    if (error) throw error;
    return Response.json({ ok: true, empty: (count ?? 0) === 0 });
  } catch (error) {
    console.error("[webmin] gagal mengecek admin_users:", error);
    return Response.json({ ok: false, error: "check_failed" }, { status: 502 });
  }
}

/**
 * Bootstrap admin pertama: hanya berlaku saat tabel admin_users kosong.
 * Mencegah situasi "lupa semua akun" tanpa membuka celah saat sudah ada akun.
 */
export async function POST(request: Request) {
  if (!process.env.WEBMIN_SESSION_SECRET) {
    return Response.json(
      { ok: false, error: "webmin_not_configured" },
      { status: 503 },
    );
  }

  const rate = checkRateLimit(`webmin-${getClientIp(request)}`);
  if (!rate.allowed) {
    return Response.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    );
  }

  let username = "";
  let password = "";
  try {
    if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
      return Response.json({ ok: false, error: "payload_too_large" }, { status: 413 });
    }
    const body = (await request.json()) as { username?: string; password?: string };
    username = (body.username ?? "").trim().slice(0, 64);
    password = (body.password ?? "").slice(0, 256);
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (!/^[a-zA-Z0-9_.-]{3,64}$/.test(username)) {
    return Response.json({ ok: false, error: "invalid_username" }, { status: 400 });
  }
  if (password.length < 8) {
    return Response.json({ ok: false, error: "weak_password" }, { status: 400 });
  }
  if (!isDbConfigured()) {
    return Response.json({ ok: false, error: "db_unavailable" }, { status: 503 });
  }

  const db = getSupabaseAdmin();
  if (!db) {
    return Response.json({ ok: false, error: "db_unavailable" }, { status: 503 });
  }

  try {
    const { count, error: countError } = await db
      .from("admin_users")
      .select("username", { count: "exact", head: true });
    if (countError) throw countError;

    if ((count ?? 0) > 0) {
      return Response.json({ ok: false, error: "already_bootstrapped" }, { status: 409 });
    }

    const { error } = await db.from("admin_users").insert({
      username,
      password_hash: hashPassword(password),
      disabled: false,
    });
    if (error) throw error;

    return Response.json({ ok: true, username });
  } catch (error) {
    console.error("[webmin] bootstrap gagal:", error);
    return Response.json({ ok: false, error: "bootstrap_failed" }, { status: 502 });
  }
}
