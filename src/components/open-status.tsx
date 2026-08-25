"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Ui = Dictionary["kontak"];

function getJakartaInfo(): { day: number; hour: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    hour12: false,
    weekday: "short",
    hour: "2-digit",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return {
    day: dayMap[get("weekday")] ?? 1,
    hour: Number(get("hour")) % 24,
  };
}

/** Indikator live "Buka Sekarang / Tutup" berdasarkan jam kerja WIB */
export function OpenStatus({ dict }: { dict: Ui }) {
  const [state, setState] = useState<"open" | "closed" | null>(null);

  useEffect(() => {
    const check = () => {
      const { day, hour } = getJakartaInfo();
      // Buka: Sabtu(6), Minggu(0), Senin(1), Selasa(2), Rabu(3)
      const isOpenDay = [0, 1, 2, 3, 6].includes(day);
      setState(isOpenDay && hour >= 8 && hour < 16 ? "open" : "closed");
    };
    check();
    const timer = setInterval(check, 60_000);
    return () => clearInterval(timer);
  }, []);

  if (!state) return null;

  const isOpen = state === "open";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
        isOpen
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400"
          : "border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
      }`}
    >
      <span className="relative flex size-2">
        {isOpen ? (
          <>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </>
        ) : (
          <span className="relative inline-flex size-2 rounded-full bg-slate-400" />
        )}
      </span>
      {isOpen ? dict.openNow : dict.closedNow}
    </span>
  );
}
