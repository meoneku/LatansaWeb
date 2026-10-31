"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Gamepad2,
  Maximize2,
  Terminal,
  Trophy,
  Zap,
  X,
  Sparkles,
} from "lucide-react";

export function SnakeGoMockup() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const imgSrc = "/assets/img/SnakeGo-Preview.png";

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
      {/* Container Jendela Desktop Arcade */}
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
              <Image
                src="/assets/img/SnakeGo.svg"
                alt="Snake Go Logo"
                width={16}
                height={16}
                className="size-3.5 object-contain"
              />
              <span>Snake Go v1.0.1</span>
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

        {/* Area Tampilan Tangkapan Layar Asli */}
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
          className="relative flex cursor-zoom-in items-center justify-center bg-gradient-to-b from-[#0b0f1a] via-[#09101d] to-[#060810] p-4 sm:p-8"
        >
          {/* Background Grid Accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-15"
          />

          <div className="relative mx-auto flex max-w-full items-center justify-center">
            <Image
              src={imgSrc}
              alt="Tangkapan Layar Asli Snake Go Desktop"
              width={631}
              height={717}
              className="max-h-[520px] w-auto rounded-xl border border-cyan-500/30 object-contain shadow-2xl shadow-emerald-950/50 transition duration-300 group-hover:scale-[1.01]"
              priority
            />
          </div>

          {/* Hover Overlay Hint */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition duration-200 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-slate-900/90 px-4 py-2 text-xs font-semibold text-emerald-300 shadow-xl">
              <Maximize2 className="size-3.5" />
              Klik untuk memperbesar tangkapan layar
            </span>
          </div>
        </div>

        {/* Feature Highlights Bar */}
        <div className="grid grid-cols-2 gap-2 border-t border-slate-800/80 bg-slate-900/70 p-3 sm:grid-cols-4 sm:p-4 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Gamepad2 className="size-4 shrink-0 text-emerald-400" />
            <span>60 FPS GUI Arcade</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Terminal className="size-4 shrink-0 text-cyan-400" />
            <span>Terminal CLI Mode</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Zap className="size-4 shrink-0 text-amber-400" />
            <span>Native Go Binary</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Trophy className="size-4 shrink-0 text-yellow-400" />
            <span>Top 10 Leaderboard</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-h-[92vh] max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-5 py-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/img/SnakeGo.svg"
                  alt="Snake Go Logo"
                  width={20}
                  height={20}
                  className="size-5 object-contain"
                />
                <span className="text-sm font-bold text-white">
                  Tangkapan Layar Snake Go
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                  v1.0.1
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                aria-label="Tutup"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="flex items-center justify-center bg-[#090d16] p-4 sm:p-6">
              <Image
                src={imgSrc}
                alt="Tangkapan Layar Penuh Snake Go Desktop"
                width={631}
                height={717}
                className="max-h-[75vh] w-auto rounded-lg border border-cyan-500/20 object-contain shadow-2xl"
              />
            </div>

            <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/60 px-5 py-2.5 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <Sparkles className="size-3.5" />
                Tampilan asli antarmuka desktop game Snake Go
              </span>
              <span className="text-[11px] text-slate-500">
                Tekan <kbd className="rounded bg-slate-800 px-1 py-0.5 text-slate-300">Esc</kbd> untuk menutup
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
