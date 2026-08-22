import type { NextConfig } from "next";
import os from "node:os";

/**
 * Kumpulkan semua alamat IPv4 lokal (Wi-Fi/LAN) agar dev server dapat
 * diakses dari perangkat lain dalam jaringan yang sama (misal HP lewat
 * intranet). Hanya berlaku saat `next dev`, tidak memengaruhi produksi.
 */
function localIPv4Addresses(): string[] {
  return Object.values(os.networkInterfaces())
    .flat()
    .filter(
      (net): net is os.NetworkInterfaceInfoIPv4 =>
        net !== undefined && net.family === "IPv4",
    )
    .map((net) => net.address);
}

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy:
 * - 'unsafe-inline' untuk script diperlukan oleh skrip inisialisasi tema,
 *   bahasa, dan hydration Next.js (seluruh konten situs dirender React
 *   sehingga permukaan XSS sudah minimal).
 * - 'unsafe-eval' hanya dibutuhkan saat development (Turbopack HMR).
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Sembunyikan header X-Powered-By: Next.js
  poweredByHeader: false,
  reactStrictMode: true,

  // Izinkan resource dev (chunk JS & HMR) dari localhost dan seluruh IP lokal.
  allowedDevOrigins: ["localhost", "127.0.0.1", ...localIPv4Addresses()],

  // Terapkan security header ke seluruh rute
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
