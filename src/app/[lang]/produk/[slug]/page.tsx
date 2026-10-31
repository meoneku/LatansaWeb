import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  Mail,
  MessageSquareText,
  Terminal,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import { CtaSection } from "@/components/cta-section";
import { ProductCard } from "@/components/product-card";
import { LongShortAiScreenshots } from "@/components/longshort-ai-screenshots";
import {
  EducationMockup,
  EnterpriseMockup,
  MobileAppMockup,
  SnakeGoMockup,
  WebMockup,
} from "@/components/product-mockups";
import { Reveal } from "@/components/reveal";
import { fetchLatestRelease } from "@/lib/releases";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  getProductMeta,
  isLocale,
  productSlugs,
  site,
  withLocale,
  type Locale,
} from "@/lib/i18n/config";

type ProductDetailProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
  return productSlugs.flatMap((slug) =>
    ["id", "en"].map((lang) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: ProductDetailProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  const product = dict.products.find((item) => item.slug === slug);
  if (!product) return {};

  return {
    title: product.name,
    description: `${product.tagline}. ${product.summary}`,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const product = dict.products.find((item) => item.slug === slug);
  if (!product) notFound();

  const meta = getProductMeta(product.slug);
  const Icon = meta.icon;
  const d = dict.productDetail;
  const otherProducts = dict.products.filter((item) => item.slug !== slug);
  const release =
    product.slug === "longshort-ai"
      ? await fetchLatestRelease("longshort-ai")
      : null;
  const version = release?.version ?? "1.0.1";

  return (
    <>
      {/* ============ HERO PRODUK ============ */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-brand-50/70 via-white to-white dark:border-slate-800/70 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_60%_65%_at_50%_30%,black,transparent)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8">
          <Link
            href={withLocale(locale, "/produk")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
          >
            <ArrowLeft className="size-4" />
            {d.backToAll}
          </Link>

          <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            {meta.logo ? (
              <div className="inline-flex size-20 shrink-0 items-center justify-center rounded-3xl bg-slate-900 p-2.5 shadow-xl ring-2 ring-emerald-500/30">
                <Image
                  src={meta.logo}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="size-16 object-contain"
                  priority
                />
              </div>
            ) : (
              <span
                className={`inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} text-white shadow-xl`}
              >
                <Icon className="size-8" />
              </span>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider ${
                    meta.type === "ready"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                      : "bg-brand-100 text-brand-800 dark:bg-brand-500/20 dark:text-brand-300"
                  }`}
                >
                  {meta.type === "ready"
                    ? meta.badge?.[locale] ?? "Aplikasi Desktop"
                    : dict.productsIndex.categories.onDemand}
                </span>
                {meta.type === "ready" && (
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                    v{version}
                  </span>
                )}
              </div>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] dark:text-white">
                {product.name}
              </h1>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
                {product.tagline}
              </p>
            </div>
          </div>

          {meta.type === "ready" ? (
            <div className="mt-8 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`/download/${product.slug}/windows`}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition hover:-translate-y-0.5 hover:bg-emerald-500 active:scale-95"
                >
                  <Download className="size-4" />
                  Windows (.exe)
                </a>
                <a
                  href={`/download/${product.slug}/mac-arm64`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white active:scale-95"
                >
                  <Download className="size-4" />
                  macOS (.dmg)
                </a>
                {product.slug === "snake-go" && (
                  <a
                    href={`/download/${product.slug}/linux`}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white active:scale-95"
                  >
                    <Download className="size-4" />
                    Linux Binary
                  </a>
                )}
              </div>
              {product.slug === "snake-go" && (
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Versi Terminal CLI:</span>
                  <a
                    href={`/download/${product.slug}/windows-terminal`}
                    className="rounded-full bg-slate-100 px-3 py-1 font-mono text-[11px] font-semibold text-slate-700 transition hover:bg-emerald-100 hover:text-emerald-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-emerald-950 dark:hover:text-emerald-300"
                  >
                    Windows
                  </a>
                  <a
                    href={`/download/${product.slug}/mac-terminal`}
                    className="rounded-full bg-slate-100 px-3 py-1 font-mono text-[11px] font-semibold text-slate-700 transition hover:bg-emerald-100 hover:text-emerald-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-emerald-950 dark:hover:text-emerald-300"
                  >
                    macOS
                  </a>
                  <a
                    href={`/download/${product.slug}/linux-terminal`}
                    className="rounded-full bg-slate-100 px-3 py-1 font-mono text-[11px] font-semibold text-slate-700 transition hover:bg-emerald-100 hover:text-emerald-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-emerald-950 dark:hover:text-emerald-300"
                  >
                    Linux
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={withLocale(locale, "/kontak")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700"
              >
                <MessageSquareText className="size-4" />
                {d.consultCta}
              </Link>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(
                  `${d.emailSubjectPrefix} ${product.name}`,
                )}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-500/50 dark:hover:text-brand-400"
              >
                <Mail className="size-4" />
                {d.emailCta}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ============ MOCKUP / SCREENSHOT PRODUK ============ */}
      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-brand-50 via-white to-teal-50 p-4 shadow-sm sm:p-8 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-teal-950/30">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
            />
            {meta.type !== "ready" && (
              <p className="relative mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-700/80 dark:text-brand-400/80">
                Ilustrasi Konsep Antarmuka
              </p>
            )}
            <div
              className={`relative mx-auto w-full ${
                meta.type === "ready" ? "max-w-4xl" : "max-w-xl"
              }`}
            >
              {product.slug === "aplikasi-enterprise" && <EnterpriseMockup />}
              {product.slug === "aplikasi-pendidikan" && <EducationMockup />}
              {product.slug === "mobile-app" && <MobileAppMockup />}
              {product.slug === "website-profesional" && <WebMockup />}
              {product.slug === "longshort-ai" && <LongShortAiScreenshots />}
              {product.slug === "snake-go" && <SnakeGoMockup />}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ KONTEN UTAMA ============ */}
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_340px] lg:px-8">
        {/* Kolom utama */}
        <div>
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {d.overviewTitle}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {product.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {d.featuresTitle}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-200 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-brand-500/30"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                  <span className="text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {d.idealForTitle}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {product.idealFor.map((target) => (
                <li
                  key={target}
                  className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/60"
                >
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                    <UserCheck className="size-4.5" />
                  </span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {target}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <Reveal delay={60}>
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                {d.techTitle}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-500">
                {d.techNote}
              </p>
            </div>
          </Reveal>

          {meta.type === "ready" ? (
            <Reveal delay={140}>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 p-7 text-white shadow-xl ring-1 ring-emerald-500/30">
                <div className="flex items-center gap-3">
                  {meta.logo && (
                    <div className="rounded-xl bg-slate-950/80 p-1.5 shadow-sm">
                      <Image
                        src={meta.logo}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="size-8 object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {d.readyDownloadTitle}
                    </h3>
                    <p className="text-xs text-emerald-200">
                      {locale === "en" ? `Release v${version}` : `Rilis v${version}`}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-emerald-100">
                  {d.readyDownloadSubtitle}
                </p>

                {product.slug === "snake-go" ? (
                  <div className="mt-5 space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                      Versi Desktop GUI:
                    </p>
                    <div className="grid grid-cols-3 gap-1.5">
                      <a
                        href={`/download/${product.slug}/windows`}
                        className="flex items-center justify-center gap-1 rounded-lg bg-white px-2 py-2 text-[11px] font-bold text-emerald-950 shadow-sm transition hover:bg-emerald-50"
                      >
                        <Download className="size-3" />
                        Windows
                      </a>
                      <a
                        href={`/download/${product.slug}/mac-arm64`}
                        className="flex items-center justify-center gap-1 rounded-lg border border-emerald-400/40 bg-emerald-950/50 px-2 py-2 text-[11px] font-semibold text-white transition hover:bg-emerald-900"
                      >
                        <Download className="size-3" />
                        macOS
                      </a>
                      <a
                        href={`/download/${product.slug}/linux`}
                        className="flex items-center justify-center gap-1 rounded-lg border border-emerald-400/40 bg-emerald-950/50 px-2 py-2 text-[11px] font-semibold text-white transition hover:bg-emerald-900"
                      >
                        <Download className="size-3" />
                        Linux
                      </a>
                    </div>

                    <p className="pt-1 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                      Versi Terminal CLI:
                    </p>
                    <div className="grid grid-cols-3 gap-1.5">
                      <a
                        href={`/download/${product.slug}/windows-terminal`}
                        className="flex items-center justify-center gap-1 rounded-lg border border-emerald-400/30 bg-emerald-950/40 px-2 py-1.5 text-[11px] font-medium text-emerald-200 transition hover:bg-emerald-900"
                      >
                        <Terminal className="size-3" />
                        Windows
                      </a>
                      <a
                        href={`/download/${product.slug}/mac-terminal`}
                        className="flex items-center justify-center gap-1 rounded-lg border border-emerald-400/30 bg-emerald-950/40 px-2 py-1.5 text-[11px] font-medium text-emerald-200 transition hover:bg-emerald-900"
                      >
                        <Terminal className="size-3" />
                        macOS
                      </a>
                      <a
                        href={`/download/${product.slug}/linux-terminal`}
                        className="flex items-center justify-center gap-1 rounded-lg border border-emerald-400/30 bg-emerald-950/40 px-2 py-1.5 text-[11px] font-medium text-emerald-200 transition hover:bg-emerald-900"
                      >
                        <Terminal className="size-3" />
                        Linux
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 space-y-2">
                    <a
                      href={`/download/${product.slug}/windows`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-emerald-950 shadow-md transition hover:bg-emerald-50 active:scale-95"
                    >
                      <Download className="size-3.5" />
                      <span>Download Windows (.exe)</span>
                    </a>
                    <a
                      href={`/download/${product.slug}/mac-arm64`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-950/50 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-900 active:scale-95"
                    >
                      <Download className="size-3.5" />
                      <span>macOS Apple Silicon (.dmg)</span>
                    </a>
                  </div>
                )}

                <div className="mt-4 border-t border-emerald-700/60 pt-3 text-[11px] text-emerald-200/90">
                  <p className="font-semibold text-white">Spesifikasi Minimum:</p>
                  {product.slug === "snake-go" ? (
                    <>
                      <p className="mt-0.5">Windows 10/11 64-bit / macOS 11+ / Linux</p>
                      <p>RAM 512MB • Native Go Binary (Ultra-ringan)</p>
                    </>
                  ) : (
                    <>
                      <p className="mt-0.5">Windows 10/11 64-bit / macOS 12+</p>
                      <p>RAM 8GB • Akselerasi GPU (CUDA/Metal)</p>
                    </>
                  )}
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={140}>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-700 to-cyan-700 p-7 text-white">
                <h3 className="text-lg font-bold">{d.interestedTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sky-50">
                  {d.interestedDesc}
                </p>
                <Link
                  href={withLocale(locale, "/kontak")}
                  className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-sky-800 transition hover:-translate-y-0.5 hover:bg-sky-50"
                >
                  {d.interestedButton}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          )}
        </aside>
      </div>

      {/* ============ PRODUK LAINNYA ============ */}
      <section className="border-t border-slate-100 bg-slate-50/60 dark:border-slate-800/70 dark:bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {d.otherProducts}
            </h2>
            <Link
              href={withLocale(locale, "/produk")}
              className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-600 transition hover:gap-2.5 sm:inline-flex dark:text-brand-400"
            >
              {d.viewAll}
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherProducts.map((item, index) => (
              <Reveal key={item.slug} delay={index * 80} className="h-full">
                <ProductCard
                  product={item}
                  locale={locale}
                  learnMoreLabel={dict.learnMore}
                />
              </Reveal>
            ))}
          </div>
          <Link
            href={withLocale(locale, "/produk")}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 sm:hidden dark:text-brand-400"
          >
            {d.viewAllMobile}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {meta.type === "ready" ? (
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 px-6 py-14 text-center shadow-xl shadow-emerald-900/25 sm:px-12 sm:py-16">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
              />
              <div className="relative">
                <div className="mx-auto mb-4 inline-flex size-16 items-center justify-center rounded-2xl bg-white/10 p-2 backdrop-blur-sm">
                  {meta.logo && (
                    <Image
                      src={meta.logo}
                      alt={product.name}
                      width={56}
                      height={56}
                      className="size-12 object-contain"
                    />
                  )}
                </div>
                <h2 className="mx-auto max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {product.slug === "snake-go"
                    ? locale === "en"
                      ? "Play Snake Go on Your Computer Now"
                      : "Mainkan Snake Go di Komputer Anda Sekarang"
                    : locale === "en"
                    ? "Start Repurposing Your Videos with LongShort AI"
                    : "Mulai Buat Video Pendek Otomatis dengan LongShort AI"}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-emerald-100 sm:text-lg">
                  {product.slug === "snake-go"
                    ? locale === "en"
                      ? "Download the modern Go Lang Snake game for free. Ultra-lightweight, 100% offline, and zero lag."
                      : "Unduh game Snake Go berbasis Go Lang secara gratis. Performa kilat, 100% offline, dan bebas lag."
                    : locale === "en"
                    ? "Download the desktop installer now. Enjoy 100% offline processing, local privacy, and zero cloud limits."
                    : "Unduh installer desktop sekarang dan nikmati pemrosesan 100% lokal di komputer Anda tanpa batas kuota."}
                </p>
                {product.slug === "snake-go" ? (
                  <div className="mt-8 flex flex-col items-center justify-center gap-4">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={`/download/${product.slug}/windows`}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50"
                      >
                        <Download className="size-4" />
                        Windows (.exe)
                      </a>
                      <a
                        href={`/download/${product.slug}/mac-arm64`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                      >
                        <Download className="size-4" />
                        macOS (.dmg)
                      </a>
                      <a
                        href={`/download/${product.slug}/linux`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                      >
                        <Download className="size-4" />
                        Linux Binary
                      </a>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-emerald-200">
                      <span className="font-semibold text-white">Versi Terminal CLI:</span>
                      <a
                        href={`/download/${product.slug}/windows-terminal`}
                        className="rounded-full border border-emerald-400/30 bg-emerald-950/50 px-3 py-1 font-mono transition hover:bg-emerald-900 hover:text-white"
                      >
                        Terminal Windows
                      </a>
                      <a
                        href={`/download/${product.slug}/mac-terminal`}
                        className="rounded-full border border-emerald-400/30 bg-emerald-950/50 px-3 py-1 font-mono transition hover:bg-emerald-900 hover:text-white"
                      >
                        Terminal macOS
                      </a>
                      <a
                        href={`/download/${product.slug}/linux-terminal`}
                        className="rounded-full border border-emerald-400/30 bg-emerald-950/50 px-3 py-1 font-mono transition hover:bg-emerald-900 hover:text-white"
                      >
                        Terminal Linux
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a
                      href={`/download/${product.slug}/windows`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-emerald-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50 sm:w-auto"
                    >
                      <Download className="size-4" />
                      Download Windows (.exe)
                    </a>
                    <a
                      href={`/download/${product.slug}/mac-arm64`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
                    >
                      <Download className="size-4" />
                      macOS Apple Silicon (.dmg)
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </section>
      ) : (
        <CtaSection
          cta={dict.cta}
          email={site.email}
          contactHref={withLocale(locale, "/kontak")}
        />
      )}
    </>
  );
}
