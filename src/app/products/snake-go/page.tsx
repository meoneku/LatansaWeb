import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Download,
  Laptop,
  Monitor,
  Terminal,
  Gamepad2,
  Calendar,
  FileCode2,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Trophy,
  Layers,
  Sparkles,
} from "lucide-react";
import { fetchLatestRelease, type ReleaseInfo } from "@/lib/releases";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { SnakeGoMockup } from "@/components/snake-go-mockup";

export const metadata: Metadata = {
  title: "Snake Go - Game Ular Klasik Modern Berbasis Go (Golang)",
  description:
    "Mainkan game Ular (Snake) klasik legendaris yang dibangun ulang dengan performa tinggi menggunakan bahasa pemrograman Go (Golang). Ringan, cepat, 100% offline.",
  openGraph: {
    title: "Snake Go - High Performance Classic Snake Game in Go",
    description:
      "Game arcade klasik legendaris dengan sentuhan arsitektur modern Go Lang. GUI halus, dukungan terminal CLI, dan skor tertinggi lokal.",
    url: "https://latansa.biz.id/products/snake-go",
  },
};

const fallbackRelease: ReleaseInfo = {
  product: "snake-go",
  product_name: "Snake Go",
  version: "1.0.1",
  pub_date: new Date().toISOString(),
  notes: "Rilis perdana Snake Go v1.0.1 dengan dukungan GUI desktop (Ebitengine) & Terminal CLI untuk Windows, macOS, dan Linux.",
  homepage: "https://latansa.biz.id/products/snake-go",
  download_url: "https://latansa.biz.id/products/snake-go",
  installers: {
    windows_x64: "/download/snake-go/windows",
    macos_arm64: "/download/snake-go/mac-arm64",
    macos_intel: "/download/snake-go/mac-intel",
    linux: "/download/snake-go/linux",
  },
};

export default async function SnakeGoPage() {
  const latest = await fetchLatestRelease("snake-go");
  const release = latest ?? fallbackRelease;

  const keyFeatures = [
    {
      icon: Zap,
      title: "Native Go & Ultra-Cepat",
      desc: "Dikompilasi langsung ke binary mesin native Go Lang tanpa runtime VM berat atau Electron.",
    },
    {
      icon: Layers,
      title: "60 FPS GUI & Terminal Mode",
      desc: "Pilih bermain dengan antarmuka grafis arcade retro yang mulus atau langsung dari terminal favorit Anda.",
    },
    {
      icon: Trophy,
      title: "Leaderboard & Mode Klasik",
      desc: "Sistem pencatatan skor tertinggi lokal, pengaturan level dinamis, dan tantangan tabrakan dinding.",
    },
    {
      icon: ShieldCheck,
      title: "100% Offline & Bebas Iklan",
      desc: "Tidak memerlukan koneksi internet, tidak ada pelacakan data, dan 100% bebas iklan atau monetisasi tersembunyi.",
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
        {/* Product Logo & Badge */}
        <div className="mx-auto mb-5 inline-flex size-20 items-center justify-center rounded-3xl bg-slate-900 p-2.5 shadow-xl ring-2 ring-emerald-500/30">
          <Image
            src="/assets/img/SnakeGo.svg"
            alt="Snake Go Logo"
            width={80}
            height={80}
            className="size-16 object-contain"
            priority
          />
        </div>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Gamepad2 className="size-3.5" />
            <span>Snake Go v{release.version}</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Game Ular Klasik Legendaris{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
            Bertenaga Go Lang
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
          Nikmati nostalgia game Ular klasik yang dibangun ulang dengan efisiensi tinggi
          menggunakan Go (Golang). Responsivitas instan, memori minimal (&lt;50MB), 100% offline,
          dan siap dimainkan kapan saja di komputer Anda.
        </p>

        {/* Tangkapan Layar Asli */}
        <div className="mx-auto mt-12 max-w-2xl">
          <SnakeGoMockup />
        </div>

        {/* Section 1: Versi Desktop GUI */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
              <Sparkles className="size-3.5" />
              <span>Versi Desktop GUI (Ebitengine 60 FPS)</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Unduh Versi Desktop GUI
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
              Antarmuka grafis arcade 2D halus dengan efek partikel, skor, dan kontrol keyboard.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl gap-5 sm:grid-cols-3">
            {/* Windows GUI */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div>
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                  <Monitor className="size-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                  Windows (GUI)
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Windows 10 / 11 64-bit (.exe)
                </p>
              </div>

              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/download/snake-go/windows"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-500 active:scale-95"
              >
                <Download className="size-4" />
                Download Windows (.exe)
              </a>
            </div>

            {/* macOS GUI */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div>
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                  <Laptop className="size-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                  macOS (GUI)
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  macOS 11+ Universal (.dmg)
                </p>
              </div>

              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/download/snake-go/mac-arm64"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 active:scale-95"
              >
                <Download className="size-4" />
                Download macOS (.dmg)
              </a>
            </div>

            {/* Linux GUI */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div>
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Monitor className="size-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                  Linux (GUI)
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Linux x86_64 amd64 Binary
                </p>
              </div>

              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/download/snake-go/linux"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 active:scale-95"
              >
                <Download className="size-4" />
                Download Linux Binary
              </a>
            </div>
          </div>
        </div>

        {/* Section 2: Versi Terminal CLI */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300">
              <Terminal className="size-3.5" />
              <span>Versi Terminal CLI (Murni Go Stdlib)</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Unduh Versi Terminal CLI
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
              Mainkan langsung di Command Prompt, PowerShell, Terminal macOS, atau bash Linux.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl gap-5 sm:grid-cols-3">
            {/* Windows Terminal */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div>
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <Terminal className="size-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                  Terminal Windows
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  CMD / PowerShell (.exe)
                </p>
              </div>

              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/download/snake-go/windows-terminal"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 active:scale-95"
              >
                <Download className="size-4" />
                Download Windows CLI
              </a>
            </div>

            {/* macOS Terminal */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div>
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <Terminal className="size-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                  Terminal macOS
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Darwin Terminal Binary
                </p>
              </div>

              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/download/snake-go/mac-terminal"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 active:scale-95"
              >
                <Download className="size-4" />
                Download macOS CLI
              </a>
            </div>

            {/* Linux Terminal */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div>
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <Terminal className="size-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                  Terminal Linux
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Linux x86_64 CLI Binary
                </p>
              </div>

              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/download/snake-go/linux-terminal"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 active:scale-95"
              >
                <Download className="size-4" />
                Download Linux CLI
              </a>
            </div>
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
                <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
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
