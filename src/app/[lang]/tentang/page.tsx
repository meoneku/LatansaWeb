import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Clock,
  Download,
  Gem,
  HeartHandshake,
  Lightbulb,
  Mail,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/cta-section";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, site, withLocale, type Locale } from "@/lib/i18n/config";

type TentangPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: TentangPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.nav.about, description: dict.tentang.header.description };
}

const valueIcons = [
  ShieldCheck,
  Lightbulb,
  BadgeCheck,
  Users,
  HeartHandshake,
  TrendingUp,
];

/* Warna tile nilai berselang-seling agar halaman lebih hidup */
const valueTileColors = [
  "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
  "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400",
  "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
];

export default async function TentangPage({ params }: TentangPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const t = dict.tentang;

  return (
    <>
      <PageHeader
        eyebrow={t.header.eyebrow}
        breadcrumbs={[{ label: dict.nav.home, href: withLocale(locale, "/") }, { label: t.header.eyebrow }]}
        eyebrowIcon={Users}
        badgeVariant="solid"
        badgeColor="rose"
        title={
          <>
            {t.header.titleStart}
            <span className="text-highlight">{t.header.titleHighlight}</span>
            {t.header.titleEnd}
          </>
        }
        description={t.header.description}
      />

      {/* ============ CERITA ============ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
              {t.story.eyebrow}
            </span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {t.story.title}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {t.story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900/60">
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 size-52 rounded-full bg-brand-500/10 blur-3xl"
              />
              <h3 className="relative text-lg font-bold text-slate-900 dark:text-white">
                {t.factsTitle}
              </h3>
              <ul className="relative mt-6 space-y-5">
                {[
                  { icon: MapPin, label: t.factLabels.location, value: dict.contactInfo.addressFull },
                  { icon: Mail, label: t.factLabels.email, value: site.email },
                  { icon: Clock, label: t.factLabels.hours, value: dict.contactInfo.hours },
                ].map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <li key={fact.label} className="flex items-start gap-4">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          {fact.label}
                        </p>
                        <p className="mt-1 text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                          {fact.value}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="relative mt-7 rounded-2xl bg-gradient-to-br from-brand-700 to-teal-700 p-5 text-white">
                <p className="text-sm font-semibold">{t.focusLabel}</p>
                <p className="mt-1 text-sm leading-relaxed text-emerald-50">
                  {dict.products.map((product) => product.name).join(" · ")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ VISI MISI ============ */}
      <section className="border-y border-slate-100 bg-slate-50/60 dark:border-slate-800/70 dark:bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
            <Reveal className="h-full">
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:p-10">
                <span className="inline-flex items-center rounded-full bg-brand-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                  {t.visionLabel}
                </span>
                <p className="mt-6 text-xl font-semibold leading-relaxed text-slate-800 sm:text-2xl dark:text-slate-200">
                  {t.visionText}
                </p>
              </div>
            </Reveal>
            <Reveal delay={110} className="h-full">
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:p-10">
                <span className="inline-flex items-center rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                  {t.missionLabel}
                </span>
                <ul className="mt-6 space-y-3.5 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
                  {t.missionItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ NILAI KAMI ============ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow={t.valuesSection.eyebrow}
          eyebrowIcon={Gem}
          badgeVariant="dashed"
          badgeColor="cyan"
          title={t.valuesSection.title}
          description={t.valuesSection.description}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.valuesSection.items.map((value, index) => {
            const Icon = valueIcons[index] ?? HeartHandshake;
            return (
              <Reveal
                key={value.title}
                delay={(index % 3) * 90}
                className="h-full"
              >
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/5 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-brand-500/30">
                  <span
                    className={`inline-flex size-11 items-center justify-center rounded-xl transition group-hover:scale-110 ${
                      valueTileColors[index % valueTileColors.length]
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ UNDUH PROFIL ============ */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-5 rounded-3xl border border-dashed border-emerald-300 bg-emerald-50/50 p-7 text-center sm:flex-row sm:p-8 sm:text-left dark:border-emerald-500/40 dark:bg-emerald-500/5">
            <p className="text-sm font-semibold leading-relaxed text-slate-700 dark:text-slate-300">
              {dict.profile.docNote}
            </p>
            <Link
              href={withLocale(locale, "/profil")}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700"
            >
              <Download className="size-4" />
              {dict.profile.download}
            </Link>
          </div>
        </Reveal>
      </section>

      <CtaSection
        cta={t.cta}
        email={site.email}
        contactHref={withLocale(locale, "/kontak")}
      />
    </>
  );
}
