/**
 * Koneksi database Supabase via @supabase/server (core primitives).
 *
 * Env (server-side, lihat docs/environment-variables.md):
 *   SUPABASE_URL               — URL project
 *   SUPABASE_PUBLISHABLE_KEY   — sb_publishable_... (peran anon, tunduk RLS)
 *   SUPABASE_SECRET_KEY        — sb_secret_... (bypass RLS, server only)
 *   SUPABASE_JWKS_URL          — endpoint JWKS untuk verifikasi JWT
 *                                (https://<ref>.supabase.co/auth/v1/.well-known/jwks.json)
 *
 * Semua env opsional: jika tidak diisi, fitur DB dilewati diam-diam
 * (perilaku sama seperti Telegram/SMTP yang belum dikonfigurasi).
 */

import { resolveEnv, createContextClient, createAdminClient } from "@supabase/server/core";
import type { SupabaseClient } from "@supabase/server/peer/supabase-js";

// ------------------------------------------------------- helpers

/** Resolve environment Supabase dari process env (SUPABASE_URL wajib) */
function tryResolveEnv() {
  const url = process.env.SUPABASE_URL;
  if (!url) return null;

  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  const jwksUrl = process.env.SUPABASE_JWKS_URL;

  const { data: env, error } = resolveEnv({
    url,
    publishableKeys: publishableKey ? { default: publishableKey } : {},
    secretKeys: secretKey ? { default: secretKey } : {},
    jwks: jwksUrl ? new URL(jwksUrl) : undefined,
  });
  if (error) return null;
  return env;
}

// ------------------------------------------------- server clients

/**
 * Client anonim (peran anon) — policy RLS tetap berlaku.
 * Dipakai di Route Handlers untuk tulisan publik (form kontak, newsletter).
 * Dibuat per request — jangan dishare antar request.
 */
export function getSupabaseAnon(): SupabaseClient | null {
  const env = tryResolveEnv();
  if (!env) return null;

  try {
    return createContextClient({ env });
  } catch {
    return null;
  }
}

/**
 * Client admin (secret key) — melewati RLS sepenuhnya.
 * Untuk operasi CRUD administratif yang policy anon tidak mencakup
 * (upsert/UPDATE/DELETE/SELECT data pengguna).
 * Dibuat per request — jangan dishare antar request.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const env = tryResolveEnv();
  if (!env) return null;

  try {
    return createAdminClient({ env });
  } catch {
    return null;
  }
}

/** Cek konfigurasi DB sudah tersedia (env dasar ada) */
export function isDbConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL);
}
