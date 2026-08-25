"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

// Deteksi hydration tanpa setState di dalam effect (aman dari cascading render)
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Toggle tema bergaya saklar lampu dengan animasi pegas halus:
 * - Terang : track kuning menyala bercahaya, knob putih berisi matahari,
 *            sisi kosong menampilkan bulan (mode yang akan dituju)
 * - Gelap  : track gelap bertabur bintang, knob gelap berisi bulan,
 *            sisi kosong menampilkan matahari
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const isDark = mounted && resolvedTheme === "dark";
  const anim = mounted ? "transition-all duration-500" : "";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Ganti tema terang atau gelap"
      title={
        isDark ? "Nyalakan lampu (tema terang)" : "Matikan lampu (tema gelap)"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`group relative inline-flex h-9 w-[68px] shrink-0 items-center rounded-full border active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${anim} ${
        isDark
          ? "border-slate-600/70 bg-slate-800 shadow-inner shadow-black/40"
          : "border-amber-300/80 bg-gradient-to-r from-amber-100 to-amber-200 shadow-[0_0_18px_rgba(245,158,11,0.4)] hover:shadow-[0_0_26px_rgba(245,158,11,0.55)]"
      }`}
    >
      {/* Bintang kecil - hanya tampak saat mode gelap */}
      <span
        aria-hidden="true"
        className={`absolute right-3 top-1.5 flex flex-col gap-1 ${anim} ${
          isDark ? "opacity-100 delay-200" : "opacity-0"
        }`}
      >
        <i className="size-1 rounded-full bg-slate-300/90" />
        <i className="size-[3px] translate-x-2 rounded-full bg-slate-500" />
        <i className="size-[3px] -translate-x-1.5 rounded-full bg-slate-400/80" />
      </span>

      {/* Ikon tujuan pada sisi kosong: menuju mode sebaliknya */}
      <Moon
        aria-hidden="true"
        className={`absolute left-2.5 size-4 text-slate-400 ${anim} ${
          isDark
            ? "-rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-70"
        }`}
      />
      <Sun
        aria-hidden="true"
        className={`absolute right-2.5 size-4 text-amber-500 ${anim} ${
          isDark ? "rotate-0 scale-100 opacity-80" : "-rotate-90 scale-0 opacity-0"
        }`}
      />

      {/* Knob saklar - memantul sedikit seperti saklar sungguhan */}
      <span
        aria-hidden="true"
        className={`absolute left-1 inline-flex size-7 items-center justify-center rounded-full shadow-md ring-1 ${
          anim
          ? "ease-[cubic-bezier(0.34,1.56,0.64,1)] group-active:scale-90"
          : ""
        } ${
          isDark
            ? "translate-x-0 bg-slate-900 ring-slate-600/60"
            : "translate-x-[30px] bg-white ring-amber-200"
        }`}
      >
        <Moon
          className={`absolute size-4 ${anim} ${
            isDark
              ? "rotate-0 scale-100 text-indigo-300"
              : "-rotate-90 scale-0 text-slate-400"
          }`}
        />
        <Sun
          className={`absolute size-4 ${anim} ${
            isDark
              ? "rotate-90 scale-0 text-slate-400"
              : "rotate-0 scale-100 text-amber-500"
          }`}
        />
      </span>
    </button>
  );
}
