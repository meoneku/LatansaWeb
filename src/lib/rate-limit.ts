/**
 * Rate limiter sederhana berbasis memori untuk melindungi endpoint publik
 * (khususnya /api/kontak) dari spam dan penyalahgunaan.
 *
 * Catatan: pada hosting serverless penyimpanan ini per-instance, namun tetap
 * efektif menaikkan biaya serangan. Untuk VPS/proses Node tunggal, ini sudah
 * cukup sebagai pembatas.
 */

const WINDOW_MS = 10 * 60 * 1000; // jendela waktu 10 menit
const MAX_REQUESTS = 5; // maksimal 5 submit per IP per jendela

type Entry = { count: number; resetAt: number };

const hits = new Map<string, Entry>();

function cleanupExpired(now: number) {
  // Jaga agar Map tidak tumbuh tanpa batas
  if (hits.size < 5000) return;
  for (const [key, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(key);
  }
}

export function checkRateLimit(key: string): {
  allowed: boolean;
  retryAfter: number;
} {
  const now = Date.now();
  cleanupExpired(now);

  const entry = hits.get(key);

  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  entry.count += 1;

  if (entry.count > MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  return { allowed: true, retryAfter: 0 };
}

/** Ambil IP klien dari header standar di balik reverse-proxy */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    "unknown"
  );
}
