"use client";

import { Download } from "lucide-react";

/** Tombol unduh = membuka dialog cetak (simpan sebagai PDF) */
export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700"
    >
      <Download className="size-4" />
      {label}
    </button>
  );
}
