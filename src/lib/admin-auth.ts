/**
 * Autentikasi admin panel /webmin.
 *
 * - Password disimpan di tabel admin_users (Supabase) sebagai scrypt hash
 *   (format: scrypt$N$r$p$salt$hash, encoding base64).
 * - Session = cookie HttpOnly bertanda tangan HMAC-SHA256
 *   (payload base64url {u, exp} + "." + sig), secret dari env
 *   WEBMIN_SESSION_SECRET (wajib; tanpa itu login ditolak).
 * - Brute force: rate limit per IP (10 menit / 10 percobaan) +
 *   jeda acak pada kegagalan.
 *
 * Env:
 *   WEBMIN_SESSION_SECRET — kunci HMAC (>= 32 karakter acak), wajib.
 */

import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "webmin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 jam

// ------------------------------------------------------- password hashing

export function hashPassword(password: string): string {
  const N = 16384, r = 8, p = 1;
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64, { N, r, p });
  return [
    "scrypt", String(N), String(r), String(p),
    salt.toString("base64"), hash.toString("base64"),
  ].join("$");
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [scheme, nStr, rStr, pStr, saltB64, hashB64] = stored.split("$");
    if (scheme !== "scrypt") return false;
    const N = Number(nStr), r = Number(rStr), p = Number(pStr);
    if (!Number.isFinite(N) || !Number.isFinite(r) || !Number.isFinite(p)) return false;
    const salt = Buffer.from(saltB64, "base64");
    const expected = Buffer.from(hashB64, "base64");
    const actual = scryptSync(password, salt, expected.length, { N, r, p });
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

// ------------------------------------------------------- session cookie

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

function hmac(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createSessionToken(username: string, secret: string): string {
  const payload = b64url(JSON.stringify({ u: username, exp: Date.now() + SESSION_TTL_MS }));
  return `${payload}.${hmac(payload, secret)}`;
}

export type SessionUser = { username: string };

export function verifySessionToken(token: string | undefined, secret: string): SessionUser | null {
  if (!token || !secret) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = hmac(payload, secret);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      u?: string; exp?: number;
    };
    if (!parsed.u || typeof parsed.exp !== "number" || parsed.exp < Date.now()) return null;
    return { username: parsed.u };
  } catch {
    return null;
  }
}

export function sessionCookieHeader(token: string): string {
  return [
    `${SESSION_COOKIE}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Secure",
    `Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`,
  ].join("; ");
}

export function clearSessionCookieHeader(): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`;
}

/** Baca session dari request; null bila tidak valid/tidak login */
export function readSession(request: Request): SessionUser | null {
  const secret = process.env.WEBMIN_SESSION_SECRET;
  if (!secret) return null;
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`));
  if (!match) return null;
  return verifySessionToken(match.slice(SESSION_COOKIE.length + 1), secret);
}

/** Guard untuk API admin: balas 401 Response bila belum login, else null */
export function requireSession(request: Request): Response | null {
  if (!process.env.WEBMIN_SESSION_SECRET) {
    return Response.json(
      { ok: false, error: "webmin_not_configured" },
      { status: 503 },
    );
  }
  if (!readSession(request)) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  return null;
}
