import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Download, Package } from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  getProductMeta,
  isLocale,
  site,
  withLocale,
  type Locale,
} from "@/lib/i18n/config";

type ProdukPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: ProdukPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.nav.products,
    description: dict.productsIndex.description,
  };
}

export default async function ProdukPage({ params }: ProdukPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const p = dict.productsIndex;

  const readyProducts = dict.products.filter(
    (product) => getProductMeta(product.slug)?.type === "ready",
  );
  const onDemandProducts = dict.products.filter(
    (product) => getProductMeta(product.slug)?.type !== "ready",
  );

  return (
    <>
      <PageHeader
        eyebrow={p.eyebrow}
        breadcrumbs={[{ label: dict.nav.home, href: withLocale(locale, "/") }, { label: p.eyebrow }]}
        eyebrowIcon={Package}
        badgeVariant="solid"
        badgeColor="emerald"
        title={
          <>
            {p.titleStart}
            <span className="text-highlight">{p.titleHighlight}</span>
            {p.titleEnd}
          </>
        }
        description={p.description}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 space-y-20 sm:space-y-28">
        {/* ============ 1. LONGSHORT AI ============ */}
        <section aria-labelledby="ready-made-heading">
          <Reveal>
            <div className="mb-10 border-b border-slate-200 pb-6 dark:border-slate-800">
              <h2
                id="ready-made-heading"
                className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
              >
                LongShort AI
              </h2>
            </div>
          </Reveal>

          <div className="space-y-12">
            {readyProducts.map((product) => {
              const meta = getProductMeta(product.slug);
              const topFeatures = product.features.slice(0, 4);

              return (
                <Reveal key={product.slug}>
                  <div className="overflow-hidden rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 p-6 shadow-xl shadow-emerald-950/5 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 sm:p-10">
                    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                      {/* Left: Info */}
                      <div className="lg:col-span-6 space-y-5">
                        <div className="flex items-center gap-4">
                          {meta?.logo ? (
                            <div className="size-16 shrink-0 rounded-2xl bg-slate-900 p-2 shadow-md ring-1 ring-emerald-500/40">
                              <Image
                                src={meta.logo}
                                alt={product.name}
                                width={64}
                                height={64}
                                className="size-full object-contain"
                              />
                            </div>
                          ) : null}
                          <div>
                            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                              Desktop Application
                            </span>
                            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                              {product.name}
                            </h3>
                          </div>
                        </div>

                        <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
                          {product.tagline}
                        </p>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          {product.summary}
                        </p>

                        <div className="space-y-2 pt-1">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {p.featureHeading}
                          </p>
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {topFeatures.map((feature) => (
                              <li key={feature} className="flex items-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Direct Download & Detail Links */}
                        <div className="flex flex-wrap items-center gap-3 pt-3">
                          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                          <a
                            href="/download/longshort-ai/windows"
                            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-500 active:scale-95"
                          >
                            <Download className="size-3.5" />
                            <span>Download Windows (.exe)</span>
                          </a>
                          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                          <a
                            href="/download/longshort-ai/mac-arm64"
                            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-xs transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white active:scale-95"
                          >
                            <Download className="size-3.5" />
                            <span>macOS (.dmg)</span>
                          </a>
                          <Link
                            href={withLocale(locale, `/produk/${product.slug}`)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 transition hover:gap-2.5 hover:underline dark:text-brand-400"
                          >
                            <span>{p.detailPrefix} {product.name}</span>
                            <ArrowRight className="size-3.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Right: Real Screenshot Preview */}
                      <div className="lg:col-span-6">
                        <Link
                          href={withLocale(locale, `/produk/${product.slug}`)}
                          className="group/img block overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl transition hover:border-emerald-500/50 dark:border-slate-700/80 dark:bg-slate-950"
                        >
                          <div className="mb-2 flex items-center justify-between px-2 pt-1 text-[10px] text-slate-500 dark:text-slate-400">
                            <div className="flex gap-1.5">
                              <span className="size-2 rounded-full bg-red-400" />
                              <span className="size-2 rounded-full bg-amber-400" />
                              <span className="size-2 rounded-full bg-emerald-400" />
                            </div>
                            <span className="font-mono text-emerald-600 dark:text-emerald-400">LongShort AI Studio</span>
                            <span className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500">Pratinjau</span>
                          </div>
                          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-900">
                            {/* Light Mode Screenshot */}
                            <Image
                              src="/assets/img/LongShortAI-Dashboard Light.webp"
                              alt="Tangkapan Layar LongShort AI"
                              width={960}
                              height={540}
                              className="block size-full object-cover transition duration-500 group-hover/img:scale-105 dark:hidden"
                            />
                            {/* Dark Mode Screenshot */}
                            <Image
                              src="/assets/img/LongShortAI-Dashboard Dark.webp"
                              alt="Tangkapan Layar LongShort AI"
                              width={960}
                              height={540}
                              className="hidden size-full object-cover transition duration-500 group-hover/img:scale-105 dark:block"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover/img:opacity-100">
                              <span className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg">
                                Buka Halaman Produk & Tangkapan Layar Lengkap →
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ============ 2. SOLUSI SOFTWARE ============ */}
        <section aria-labelledby="on-demand-heading" className="space-y-12">
          <Reveal>
            <div className="border-b border-slate-200 pb-6 dark:border-slate-800">
              <h2
                id="on-demand-heading"
                className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
              >
                {p.categories.onDemand}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
                {p.categories.onDemandSubtitle}
              </p>
            </div>
          </Reveal>

          <div className="space-y-16 sm:space-y-20">
            {onDemandProducts.map((product, index) => {
              const meta = getProductMeta(product.slug);
              const Icon = meta.icon;
              const flip = index % 2 === 1;
              const topFeatures = product.features.slice(0, 4);

              return (
                <Reveal key={product.slug}>
                  <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                    {/* Info produk */}
                    <div className={flip ? "lg:order-2" : ""}>
                      <div className="flex items-center gap-4">
                        <span
                          className={`inline-flex size-13 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} p-3.5 text-white shadow-lg`}
                        >
                          <Icon className="size-7" />
                        </span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {p.categories.onDemand} {String(index + 1).padStart(2, "0")}
                          </p>
                          <h3 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                            {product.name}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-5 text-base font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
                        {product.tagline}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
                        {product.summary}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-2">
                        {product.tech.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-400"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Kartu fitur */}
                    <div
                      className={`rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:shadow-lg hover:shadow-brand-600/5 dark:border-slate-800 dark:bg-slate-900/60 sm:p-8 ${
                        flip ? "lg:order-1" : ""
                      }`}
                    >
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                        {p.featureHeading}
                      </h4>
                      <ul className="mt-4 space-y-3">
                        {topFeatures.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                            <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={withLocale(locale, `/produk/${product.slug}`)}
                        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-5 py-3 text-sm font-bold text-brand-700 transition hover:bg-brand-100 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/20"
                      >
                        {p.detailPrefix} {product.name}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>
      </div>

      {/* ============ SOLUSI KUSTOM ============ */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-dashed border-brand-300 bg-brand-50/60 p-8 sm:p-10 md:flex-row md:items-center dark:border-brand-500/40 dark:bg-brand-500/5">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                {p.customTitle}
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
                {p.customDescription}
              </p>
            </div>
            <Link
              href={withLocale(locale, "/kontak")}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700"
            >
              {p.customButton}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <CtaSection
        cta={dict.cta}
        email={site.email}
        contactHref={withLocale(locale, "/kontak")}
      />
    </>
  );
}
