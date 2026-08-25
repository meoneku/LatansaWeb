"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Teks yang memuat angka, mis. "100%", "<24 Jam", "4" */
  value: string;
  className?: string;
  durationMs?: number;
};

/**
 * Menampilkan angka dengan animasi menghitung naik saat elemen masuk viewport.
 * Karakter non-angka (simbol/satuan) dipertahankan apa adanya.
 */
export function CountUp({ value, className, durationMs = 1300 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Hormati preferensi reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const match = value.match(/^(\D*?)(\d+)(.*)$/);
    if (!match) return;
    const [, prefix, rawNumber, suffix] = match;
    const target = Number(rawNumber);

    let raf = 0;
    let startedAt = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        const render = (n: number) =>
          setDisplay(`${prefix}${n}${suffix}`);

        if (reduce || target === 0) {
          render(target);
          return;
        }

        const tick = (now: number) => {
          if (!startedAt) startedAt = now;
          const progress = Math.min(1, (now - startedAt) / durationMs);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - progress, 3);
          render(Math.round(target * eased));
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
