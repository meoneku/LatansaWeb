"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
        <AlertTriangle className="size-8" />
      </span>
      <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
        Terjadi kendala di sisi kami
      </h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
        Maaf, sesuatu berjalan tidak semestinya. Silakan coba lagi - atau kembali
        beberapa saat kemudian.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
        >
          <RotateCcw className="size-4" />
          Coba Lagi
        </button>
        <Link
          href="/id"
          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-400 hover:text-brand-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-500/50"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
}
