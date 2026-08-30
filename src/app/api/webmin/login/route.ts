import { createSessionToken, sessionCookieHeader, verifyPassword } from "@/lib/admin-auth";
import { getSupabaseAdmin, isDbConfigured } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 1_000;

/** Login admin: verifikasi scrypt hash dari tabel admin_users, terbitkan cookie session */
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

  if (!username || !password || !isDbConfigured()) {
    return Response.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
  }

  const db = getSupabaseAdmin();
  if (!db) {
    return Response.json({ ok: false, error: "db_unavailable" }, { status: 503 });
  }

  try {
    const { data, error } = await db
      .from("admin_users")
      .select("username, password_hash, disabled")
      .eq("username", username)
      .maybeSingle();

    if (error) throw error;

    const row = data as { username: string; password_hash: string; disabled?: boolean } | null;
    const valid = row && !row.disabled && verifyPassword(password, row.password_hash);

    if (!valid) {
      // Jeda acak untuk meratakan waktu respons (anti timing oracle)
      await new Promise((resolve) => setTimeout(resolve, 300 + Math.floor(Math.random() * 400)));
      return Response.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
    }

    const token = createSessionToken(row.username, process.env.WEBMIN_SESSION_SECRET);
    return Response.json(
      { ok: true, username: row.username },
      { headers: { "Set-Cookie": sessionCookieHeader(token) } },
    );
  } catch (error) {
    console.error("[webmin] login gagal:", error);
    return Response.json({ ok: false, error: "login_failed" }, { status: 502 });
  }
}
