import type { Metadata } from "next";
import Link from "next/link";
import {
  Download,
  Laptop,
  Monitor,
  Sparkles,
  Calendar,
  FileCode2,
  ArrowLeft,
  ShieldCheck,
  Cpu,
  Video,
} from "lucide-react";
import { fetchLatestRelease, type ReleaseInfo } from "@/lib/releases";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "LongShort AI - Aplikasi Desktop Pembuat Klip Pendek Otomatis",
  description:
    "Ubah video podcast, webinar, dan presentasi panjang menjadi video pendek vertikal siap upload (TikTok, Reels, Shorts) dengan AI langsung di PC/Mac Anda.",
  openGraph: {
    title: "LongShort AI - Desktop Video Repurposing Tool",
    description:
      "Aplikasi desktop pintar untuk memotong video panjang menjadi konten pendek viral dengan subtitle otomatis.",
    url: "https://latansa.biz.id/products/longshort-ai",
  },
};

const fallbackRelease: ReleaseInfo = {
  product: "longshort-ai",
  product_name: "LongShort AI",
  version: "1.0.1",
  pub_date: new Date().toISOString(),
  notes: "Rilis perdana LongShort AI Desktop Studio untuk Windows dan macOS.",
  homepage: "https://latansa.biz.id/products/longshort-ai",
  download_url: "https://latansa.biz.id/products/longshort-ai",
  installers: {
    windows_x64: "/download/longshort-ai/windows",
    macos_arm64: "/download/longshort-ai/mac-arm64",
    macos_intel: "/download/longshort-ai/mac-intel",
  },
};

export default async function LongShortAIPage() {
  const latest = await fetchLatestRelease("longshort-ai");
  const release = latest ?? fallbackRelease;

  const keyFeatures = [
    {
      icon: ShieldCheck,
      title: "100% Privasi & Lokal",
      desc: "Video diproses langsung di komputer Anda tanpa perlu upload file besar ke cloud.",
    },
    {
      icon: Video,
      title: "Auto Face-Tracking 9:16",
      desc: "AI otomatis mendeteksi pembicara dan memposisikannya di tengah frame vertikal.",
    },
    {
      icon: Sparkles,
      title: "Subtitle Dinamis Otomatis",
      desc: "Transkripsi otomatis berkecepatan tinggi dengan gaya subtitle animasi ala kreator papan atas.",
    },
    {
      icon: Cpu,
      title: "Akselerasi GPU Hardware",
      desc: "Mendukung GPU NVIDIA CUDA, Apple Silicon Metal (M1-M4), dan Intel QuickSync.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
            >
              <ArrowLeft className="size-4" />
              <span>Kembali ke Latansa</span>
            </Link>
            <div className="hidden h-4 w-px bg-slate-200 dark:bg-slate-700 sm:block" />
            <div className="hidden sm:block">
              <Logo locale="id" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24">
        {/* Version Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <Sparkles className="size-3.5" />
          <span>LongShort AI Desktop v{release.version}</span>
        </div>

        {/* Hero Title */}
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Ubah Video Panjang Jadi{" "}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">
            Klip Pendek Siap Upload
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
          Aplikasi desktop pintar untuk memotong video podcast, webinar, dan presentasi
          menjadi konten vertikal siap viral di TikTok, Reels, dan YouTube Shorts lengkap dengan
          transkripsi otomatis.
        </p>

        {/* Download Buttons Grid */}
        <div className="mx-auto mt-12 grid max-w-2xl gap-5 sm:grid-cols-2">
          {/* Windows */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="inline-flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                <Monitor className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                Windows (64-bit)
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Windows 10 / 11 (.exe installer)
              </p>
            </div>

            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/download/longshort-ai/windows"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 active:scale-95"
            >
              <Download className="size-4" />
              Download (.exe)
            </a>
          </div>

          {/* Mac ARM */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="inline-flex size-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                <Laptop className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                macOS Apple Silicon
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Apple M1, M2, M3, M4 (.dmg)
              </p>
            </div>

            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/download/longshort-ai/mac-arm64"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 active:scale-95"
            >
              <Download className="size-4" />
              Download (.dmg)
            </a>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mx-auto mt-20 grid max-w-4xl gap-6 text-left sm:grid-cols-2">
          {keyFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/70 p-5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60"
              >
                <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {feat.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Catatan Rilis */}
        {release.notes && (
          <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                <FileCode2 className="size-4 text-emerald-500" />
                <span>Catatan Rilis v{release.version}:</span>
              </div>
              {release.pub_date && (
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <Calendar className="size-3" />
                  <span>
                    {new Date(release.pub_date).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
            <pre className="mt-4 max-h-56 overflow-y-auto whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              {release.notes}
            </pre>
          </div>
        )}
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-slate-200 bg-white/50 py-8 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-500">
        <p>© {new Date().getFullYear()} Latansa. Seluruh hak cipta dilindungi.</p>
        <p className="mt-1">
          <Link href="/" className="underline hover:text-slate-800 dark:hover:text-slate-300">
            Kembali ke Beranda Latansa
          </Link>
        </p>
      </footer>
    </div>
  );
}
