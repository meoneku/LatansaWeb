import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgePercent,
  CheckCircle2,
  MessageSquareText,
  Rocket,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { PageHeader } from "@/components/page-header";
import { PriceCalculator } from "@/components/price-calculator";
import { Reveal } from "@/components/reveal";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, site, withLocale, type Locale } from "@/lib/i18n/config";

type HargaPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: HargaPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.nav.pricing,
    description: dict.pricing.header.description,
  };
}

const planIcons = [Zap, Rocket, ShoppingBag];

export default async function HargaPage({ params }: HargaPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const p = dict.pricing;

  return (
    <>
      <PageHeader
        eyebrow={p.header.eyebrow}
        breadcrumbs={[{ label: dict.nav.home, href: withLocale(locale, "/") }, { label: p.header.eyebrow }]}
        eyebrowIcon={BadgePercent}
        badgeVariant="solid"
        badgeColor="amber"
        title={
          <>
            {p.header.titleStart}
            <span className="text-highlight">{p.header.titleHighlight}</span>
            {p.header.titleEnd}
          </>
        }
        description={p.header.description}
      />

      {/* ============ PAKET WEBSITE ============ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-6">
          {p.plans.map((plan, index) => {
            const Icon = planIcons[index] ?? Zap;
            const popular = "popular" in plan && plan.popular;

            const cardInner = (
              <div
                className={`relative flex h-full flex-col rounded-3xl p-7 transition duration-300 sm:p-8 ${
                  popular
                    ? "bg-white dark:bg-slate-900"
                    : "border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/5 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-brand-500/30"
                }`}
              >
                  {popular ? (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-600 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-600/30">
                      {p.popularBadge}
                    </span>
                  ) : null}

                  <span
                    className={`inline-flex size-11 items-center justify-center rounded-xl ${
                      popular
                        ? "bg-brand-600 text-white"
                        : "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>

                  <h2 className="mt-4 text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {plan.name}
                  </h2>

                  <p className="mt-1.5 min-h-10 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {plan.description}
                  </p>

                  <div className="mt-5 border-t border-dashed border-slate-200 pt-5 dark:border-slate-700">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {p.startFrom}
                    </p>
                    <p className="mt-1 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold tracking-tight text-brand-700 dark:text-brand-400">
                        {plan.price}
                      </span>
                      <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                        {p.perProject}
                      </span>
                    </p>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-emerald-500" />
                        <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={withLocale(locale, "/kontak")}
                    className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition ${
                      popular
                        ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700"
                        : "border border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/20"
                    }`}
                  >
                    <MessageSquareText className="size-4" />
                    {p.ctaPlan}
                  </Link>
                </div>
            );

            return (
              <Reveal key={plan.name} delay={index * 90} className="h-full">
                {popular ? (
                  <div className="animate-border-flow h-full rounded-3xl bg-gradient-to-br from-brand-700 via-teal-500 to-cyan-500 p-[2px] shadow-xl shadow-brand-600/20">
                    {cardInner}
                  </div>
                ) : (
                  cardInner
                )}
              </Reveal>
            );
          })}
        </div>

        {/* Catatan harga */}
        <Reveal delay={150}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-slate-400 dark:text-slate-500">
            {p.note}
          </p>
        </Reveal>
      </section>

      {/* ============ KALKULATOR ESTIMASI ============ */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <Reveal>
          <PriceCalculator calc={p.calc} locale={locale} />
        </Reveal>
      </section>

      {/* ============ PROYEK KUSTOM ============ */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-dashed border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-8 sm:p-10 lg:flex-row lg:items-center dark:border-amber-500/40 dark:from-amber-500/10 dark:to-orange-500/5">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:border-amber-500/30 dark:bg-slate-900 dark:text-amber-300">
                <BadgePercent className="size-3.5" />
                {p.custom.priceLabel} {p.custom.price}
              </span>
              <h2 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                {p.custom.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
                {p.custom.description}
              </p>
            </div>

            <Link
              href={withLocale(locale, "/kontak")}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-amber-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-600/25 transition hover:-translate-y-0.5 hover:bg-orange-700"
            >
              <MessageSquareText className="size-4" />
              {p.custom.cta}
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
