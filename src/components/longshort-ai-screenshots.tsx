"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Cpu,
  Eye,
  Maximize2,
  ShieldCheck,
  Sparkles,
  Video,
  X,
} from "lucide-react";

export function LongShortAiScreenshots() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const lightImgSrc = "/assets/img/LongShortAI-Dashboard Light.webp";
  const darkImgSrc = "/assets/img/LongShortAI-Dashboard Dark.webp";

  // Tutup lightbox saat menekan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightboxOpen) {
        setLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div className="w-full">
      {/* Container Jendela Aplikasi */}
      <div className="group relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950 text-slate-100 shadow-2xl shadow-emerald-950/40">
        {/* Titlebar Window Style */}
        <div className="flex items-center justify-between border-b border-slate-800/90 bg-slate-900/95 px-4 py-2.5 sm:px-5">
          {/* Window control buttons */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="size-3 rounded-full bg-red-500/90 shadow-xs" />
              <span className="size-3 rounded-full bg-amber-500/90 shadow-xs" />
              <span className="size-3 rounded-full bg-emerald-500/90 shadow-xs" />
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-slate-800/80 px-2.5 py-0.5 text-[11px] font-semibold text-slate-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/img/LongShortAI.svg"
                alt="LongShort AI"
                className="size-3.5"
              />
              <span>LongShort AI Studio</span>
            </div>
          </div>

          {/* Tombol Perbesar / Lightbox */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            <Maximize2 className="size-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Perbesar Layar</span>
          </button>
        </div>

        {/* Area Tampilan Gambar Screenshot */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setLightboxOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setLightboxOpen(true);
            }
          }}
          className="group/screen relative block aspect-[1918/1032] w-full cursor-zoom-in overflow-hidden bg-slate-900"
        >
          {/* Dark Mode Screenshot */}
          <Image
            src={darkImgSrc}
            alt="Dashboard LongShort AI Studio"
            width={1919}
            height={1032}
            priority
            className="hidden dark:block size-full object-contain transition-transform duration-500 group-hover/screen:scale-[1.01]"
          />
          {/* Light Mode Screenshot */}
          <Image
            src={lightImgSrc}
            alt="Dashboard LongShort AI Studio"
            width={1919}
            height={1032}
            priority
            className="block dark:hidden size-full object-contain transition-transform duration-500 group-hover/screen:scale-[1.01]"
          />

          {/* Hover Hint Overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-[2px] transition duration-300 group-hover/screen:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-slate-950/85 px-4 py-2 text-xs font-bold text-white shadow-xl">
              <Eye className="size-4 text-emerald-400" />
              Klik untuk melihat detail resolusi penuh
            </span>
          </div>

          {/* Status Bar Pill di sudut bawah */}
          <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-950/85 px-3 py-1.5 text-[11px] font-semibold text-slate-300 backdrop-blur-md">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
            <span>Dashboard LongShort AI Studio</span>
          </div>
        </div>

        {/* Footer Bar Fitur Nyata Aplikasi */}
        <div className="grid grid-cols-2 gap-2 border-t border-slate-800/80 bg-slate-900/90 p-3 sm:grid-cols-4 sm:p-3.5 text-xs">
          <div className="flex items-center gap-2 rounded-lg bg-slate-800/50 p-2 text-slate-300">
            <Sparkles className="size-4 shrink-0 text-emerald-400" />
            <span className="truncate font-medium">AI Viral Detection</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-800/50 p-2 text-slate-300">
            <Video className="size-4 shrink-0 text-amber-400" />
            <span className="truncate font-medium">Auto Face Tracking 9:16</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-800/50 p-2 text-slate-300">
            <ShieldCheck className="size-4 shrink-0 text-sky-400" />
            <span className="truncate font-medium">100% Proses Lokal</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-800/50 p-2 text-slate-300">
            <Cpu className="size-4 shrink-0 text-teal-400" />
            <span className="truncate font-medium">GPU Hardware Accel</span>
          </div>
        </div>
      </div>

      {/* Modal Lightbox Resolusi Penuh */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Tangkapan Layar Resolusi Penuh LongShort AI"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative flex max-h-[94vh] max-w-7xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/img/LongShortAI.svg"
                  alt="LongShort AI"
                  className="size-6"
                />
                <div>
                  <h3 className="text-sm font-bold text-white sm:text-base">
                    Dashboard LongShort AI Studio
                  </h3>
                  <p className="text-xs text-slate-400">
                    Antarmuka pemrosesan video dan klip vertikal
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="rounded-lg border border-slate-700 p-1.5 text-slate-300 hover:bg-slate-800 hover:text-white"
                aria-label="Tutup pratinjau"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="overflow-auto bg-slate-950 p-2 sm:p-4">
              <Image
                src={darkImgSrc}
                alt="Dashboard LongShort AI Studio"
                width={1919}
                height={1032}
                className="hidden dark:block h-auto w-full rounded-lg object-contain shadow-lg"
              />
              <Image
                src={lightImgSrc}
                alt="Dashboard LongShort AI Studio"
                width={1919}
                height={1032}
                className="block dark:hidden h-auto w-full rounded-lg object-contain shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
