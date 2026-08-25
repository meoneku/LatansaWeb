import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Package } from "lucide-react";
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

      {/* ============ DAFTAR PRODUK ============ */}
      <section className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:space-y-24 sm:px-6 sm:py-24 lg:px-8">
        {dict.products.map((product, index) => {
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
                        {p.eyebrow} {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                        {product.name}
                      </h2>
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
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    {p.featureHeading}
                  </h3>
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
      </section>

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
