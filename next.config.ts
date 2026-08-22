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

const nextConfig: NextConfig = {
  // Izinkan resource dev (chunk JS & HMR) dari localhost dan seluruh IP lokal.
  allowedDevOrigins: ["localhost", "127.0.0.1", ...localIPv4Addresses()],
};

export default nextConfig;
