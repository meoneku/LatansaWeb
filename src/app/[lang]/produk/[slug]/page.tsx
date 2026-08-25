import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquareText,
  UserCheck,
} from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { ProductCard } from "@/components/product-card";
import {
  EducationMockup,
  EnterpriseMockup,
  MobileAppMockup,
  WebMockup,
} from "@/components/product-mockups";
import { Reveal } from "@/components/reveal";
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
            <span
              className={`inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} text-white shadow-xl`}
            >
              <Icon className="size-8" />
            </span>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] dark:text-white">
                {product.name}
              </h1>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
                {product.tagline}
              </p>
            </div>
          </div>

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
        </div>
      </section>

      {/* ============ MOCKUP PRODUK (ILUSTRASI KONSEP) ============ */}
      <section className="mx-auto max-w-5xl px-4 pt-14 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-brand-50 via-white to-teal-50 p-6 shadow-sm sm:p-10 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-teal-950/30">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
            />
            <p className="relative mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-700/80 dark:text-brand-400/80">
              Ilustrasi Konsep Antarmuka
            </p>
            <div className="relative mx-auto w-full max-w-xl">
              {product.slug === "aplikasi-enterprise" && <EnterpriseMockup />}
              {product.slug === "aplikasi-pendidikan" && <EducationMockup />}
              {product.slug === "mobile-app" && <MobileAppMockup />}
              {product.slug === "website-profesional" && <WebMockup />}
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

      <CtaSection
        cta={dict.cta}
        email={site.email}
        contactHref={withLocale(locale, "/kontak")}
      />
    </>
  );
}
