/**
 * Logo Latansa — "L yang Bertumbuh"
 *
 * Makna di balik bentuknya:
 * - Huruf L sebagai inisial Latansa.
 * - Garis kaki L yang berujung naik membentuk panah = perjalanan
 *   pertumbuhan klien bersama kami (dari ide menuju hasil yang naik).
 * - Titik gelap di sudut kanan atas = inovasi & tujuan yang tercapai.
 *
 * Warna: latar hijau pastel dengan gradasi sangat halus,
 * lambang hijau tua agar kontras tetap kuat.
 */
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient
          id="latansa-mark"
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#b8f2d4" />
          <stop offset="1" stopColor="#93e7bd" />
        </linearGradient>
      </defs>

      {/* Latar badge */}
      <rect width="48" height="48" rx="13" fill="url(#latansa-mark)" />

      {/* Batang & kaki huruf L yang menanjak menjadi panah pertumbuhan */}
      <path
        d="M17 12v21h11l7-7"
        fill="none"
        stroke="#065f46"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Kepala panah di ujung garis menanjak */}
      <path
        d="M29.5 25.5H35V31"
        fill="none"
        stroke="#065f46"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Percikan inovasi */}
      <circle cx="38.5" cy="11" r="3" fill="#065f46" />
    </svg>
  );
}

export function Logo({ locale = "id" }: { locale?: Locale }) {
  return (
    <Link
      href={`/${locale}`}
      className="group inline-flex items-center gap-2.5"
      aria-label="Latansa — kembali ke beranda"
    >
      <span className="inline-flex">
        <LogoMark className="size-9 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3" />
      </span>
      <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
        Latansa
      </span>
    </Link>
  );
}
