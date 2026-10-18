import React from "react";
import Link from "next/link";
import {
  Download,
  Laptop,
  Monitor,
  Sparkles,
  CheckCircle2,
  Calendar,
  FileCode2,
  ArrowRight,
} from "lucide-react";
import { fetchLatestRelease, type ReleaseInfo } from "@/lib/releases";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { Locale } from "@/lib/i18n/config";

const fallbackRelease: ReleaseInfo = {
  product: "longshort-ai",
  product_name: "LongShort AI",
  version: "1.0.1",
  pub_date: new Date().toISOString(),
  notes: "Rilis perdana LongShort AI Studio Desktop untuk Windows dan macOS.",
  homepage: "https://latansa.biz.id/products/longshort-ai",
  download_url: "https://latansa.biz.id/products/longshort-ai",
  installers: {
    windows_x64: "/download/longshort-ai/windows",
    macos_arm64: "/download/longshort-ai/mac-arm64",
    macos_intel: "/download/longshort-ai/mac-intel",
  },
};

type DownloadSectionProps = {
  locale?: Locale;
};

export async function DownloadSection({ locale = "id" }: DownloadSectionProps) {
  const latest = await fetchLatestRelease();
  const release = latest ?? fallbackRelease;
  const isEn = locale === "en";

  const t = isEn
    ? {
        eyebrow: "Desktop Application",
        title: "Download LongShort AI for Desktop",
        description:
          "Transform long videos into engaging viral shorts automatically right on your computer. Fast, private, and powered by cutting-edge AI.",
        latestBadge: `Latest Release: v${release.version}`,
        windowsTitle: "Windows (64-bit)",
        windowsSubtitle: "Windows 10 / 11 (.exe installer)",
        macArmTitle: "macOS Apple Silicon",
        macArmSubtitle: "Apple M1, M2, M3, M4 (.dmg)",
        macIntelTitle: "macOS Intel",
        macIntelSubtitle: "Intel 64-bit (.dmg)",
        downloadBtn: "Download",
        notesTitle: `Release Notes v${release.version}:`,
        features: [
          "100% Local processing & private",
          "Automated subtitle & face tracking",
          "Fast GPU hardware acceleration",
        ],
      }
    : {
        eyebrow: "Aplikasi Desktop",
        title: "Unduh LongShort AI untuk Desktop",
        description:
          "Ubah video panjang menjadi klip pendek siap upload secara otomatis langsung di komputer Anda. Cepat, hemat kuota bandwidth, dan privasi video terjamin.",
        latestBadge: `Versi Terbaru: v${release.version}`,
        windowsTitle: "Windows (64-bit)",
        windowsSubtitle: "Windows 10 / 11 (.exe installer)",
        macArmTitle: "macOS Apple Silicon",
        macArmSubtitle: "Apple M1, M2, M3, M4 (.dmg)",
        macIntelTitle: "macOS Intel",
        macIntelSubtitle: "Intel 64-bit (.dmg)",
        downloadBtn: "Unduh",
        notesTitle: `Catatan Pembaruan v${release.version}:`,
        features: [
          "100% Proses lokal & privasi data aman",
          "Subtitle otomatis & pelacakan wajah cerdas",
          "Akselerasi hardware GPU berkecepatan tinggi",
        ],
      };

  return (
    <section
      id="download"
      className="relative scroll-mt-20 border-t border-slate-100 bg-slate-50/70 py-16 dark:border-slate-800/70 dark:bg-slate-900/40 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.eyebrow}
          eyebrowIcon={Download}
          badgeColor="emerald"
          title={t.title}
          description={t.description}
        />

        {/* Versi & Keunggulan Cepat */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <Sparkles className="size-3.5" />
            {t.latestBadge}
          </span>
          {t.features.map((feat) => (
            <span
              key={feat}
              className="hidden items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400 sm:inline-flex"
            >
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              {feat}
            </span>
          ))}
        </div>

        {/* Pilihan Download Cards */}
        <div className="mx-auto mt-10 grid max-w-2xl gap-5 sm:grid-cols-2">
          {/* Windows */}
          <Reveal delay={0} className="h-full">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div>
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                  <Monitor className="size-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                  {t.windowsTitle}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t.windowsSubtitle}
                </p>
              </div>

              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/download/longshort-ai/windows"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-500 active:scale-95"
              >
                <Download className="size-4" />
                {t.downloadBtn} (.exe)
              </a>
            </div>
          </Reveal>

          {/* Mac ARM */}
          <Reveal delay={90} className="h-full">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div>
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                  <Laptop className="size-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                  {t.macArmTitle}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t.macArmSubtitle}
                </p>
              </div>

              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/download/longshort-ai/mac-arm64"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 active:scale-95"
              >
                <Download className="size-4" />
                {t.downloadBtn} (.dmg)
              </a>
            </div>
          </Reveal>
        </div>

        {/* Link ke Halaman Produk Lengkap */}
        <div className="mt-8 text-center">
          <Link
            href="/products/longshort-ai"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 transition hover:text-brand-500 hover:underline dark:text-brand-400 dark:hover:text-brand-300"
          >
            <span>
              {isEn
                ? "View full LongShort AI product page & documentation"
                : "Lihat halaman produk & informasi lengkap LongShort AI"}
            </span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Catatan Rilis */}
        {release.notes && (
          <Reveal delay={240}>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-left dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <FileCode2 className="size-4 text-brand-500" />
                  {t.notesTitle}
                </div>
                {release.pub_date && (
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <Calendar className="size-3" />
                    {new Date(release.pub_date).toLocaleDateString(
                      isEn ? "en-US" : "id-ID",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </div>
                )}
              </div>
              <pre className="mt-3 max-h-48 overflow-y-auto whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {release.notes}
              </pre>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
