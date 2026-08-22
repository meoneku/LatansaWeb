"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Ganti tema terang atau gelap"
      title="Ganti tema terang atau gelap"
      className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-600 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-400"
    >
      {/* Kedua ikon dirender sekaligus; CSS memilih sesuai tema aktif agar bebas hydration mismatch */}
      <Sun className="hidden size-[18px] dark:block" />
      <Moon className="block size-[18px] dark:hidden" />
    </button>
  );
}
