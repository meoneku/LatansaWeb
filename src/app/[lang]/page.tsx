import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ListChecks,
  LifeBuoy,
  MapPin,
  MessagesSquare,
  Package,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  ThumbsUp,
  Wallet,
} from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { CountUp } from "@/components/count-up";
import { CursorGlow } from "@/components/cursor-glow";
import { Magnetic } from "@/components/magnetic";
import { ProcessSection } from "@/components/process-section";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Tilt } from "@/components/tilt-card";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, site, techStack, withLocale, type Locale } from "@/lib/i18n/config";

type HomePageProps = {
  params: Promise<{ lang: string }>;
};

/** Posisi bintang dekoratif pada hero mode gelap */
const STARS: [number, number, number][] = [
  [12, 18, 2],
  [22, 78, 3],
  [30, 42, 2],
  [8, 55, 2],
  [40, 12, 3],
  [18, 90, 2],
  [48, 68, 2],
  [6, 35, 2],
  [35, 88, 2],
  [52, 28, 2],
  [15, 62, 2],
  [44, 80, 3],
];

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).nav.home };
}

const whyUsIcons = [Wallet, MessagesSquare, Sparkles, Smartphone, LifeBuoy, MapPin];

/* Warna tile berselang-seling - hangat & sejuk bersanding dengan hijau logo */
const whyUsTileColors = [
  "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
  "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400",
  "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
];

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const hero = dict.hero;

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <CursorGlow />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl dark:bg-brand-500/15"
        />

        {/* Bintang berkelip + shooting star (mode gelap) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden overflow-visible dark:block"
        >
          {STARS.map(([top, left, size], index) => (
            <span
              key={index}
              className="animate-twinkle absolute rounded-full bg-white"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: size,
                height: size,
                ["--twinkle-duration" as string]: `${2.4 + ((index * 7) % 30) / 10}s`,
                ["--twinkle-delay" as string]: `${((index * 13) % 40) / 10}s`,
              }}
            />
          ))}
          {/* 3 shooting star: kanan atas → kiri bawah, kepala terang didahului ekor */}
          <span className="animate-shoot absolute left-[74%] top-0 h-[120px] w-[2px] rounded-full bg-gradient-to-b from-transparent via-white/40 to-white shadow-[0_8px_14px_rgba(255,255,255,0.35)] [--shoot-delay:1.2s] [--shoot-duration:7s]" />
          <span className="animate-shoot absolute left-[56%] top-0 h-[100px] w-[2px] rounded-full bg-gradient-to-b from-transparent via-brand-200/30 to-brand-100 shadow-[0_8px_12px_rgba(167,243,208,0.3)] [--shoot-delay:4.5s] [--shoot-duration:9s]" />
          <span className="animate-shoot absolute left-[88%] top-0 h-[130px] w-[2px] rounded-full bg-gradient-to-b from-transparent via-white/35 to-cyan-200 shadow-[0_8px_14px_rgba(165,243,252,0.3)] [--shoot-delay:7.5s] [--shoot-duration:11s]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-16">
            {/* Kolom teks */}
            <Reveal>
              <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08] dark:text-white">
                {hero.titleStart}
                <span className="text-highlight">{hero.titleHighlight}</span>
              </h1>

              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
                {hero.description}
              </p>

              <div className="mt-8 flex flex-row flex-wrap gap-3">
                <Magnetic className="min-w-[148px] flex-1 [&>span]:w-full [&>span]:justify-center">
                  <Link
                    href={withLocale(locale, "/kontak")}
                    className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700"
                  >
                    {hero.primaryCta}
                    <ArrowRight className="size-4" />
                  </Link>
                </Magnetic>
                <Link
                  href={withLocale(locale, "/produk")}
                  className="inline-flex min-w-[148px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-500/50 dark:hover:text-brand-400"
                >
                  {hero.secondaryCta}
                </Link>
              </div>

              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-200 pt-8 sm:gap-6 dark:border-slate-800">
                {hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <dd className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                      <CountUp value={stat.value} />
                    </dd>
                    <dt className="mt-1 text-xs leading-snug text-slate-500 sm:text-sm dark:text-slate-400">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* Kolom visual */}
            <Reveal delay={150}>
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div
                  aria-hidden="true"
                  className="absolute -right-8 -top-12 size-56 rounded-full bg-amber-400/25 blur-3xl dark:bg-amber-500/15"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-14 -left-10 size-64 rounded-full bg-brand-400/25 blur-3xl dark:bg-brand-500/15"
                />

                {/* Mockup jendela aplikasi */}
                <div className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40">
                  <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                    <div className="flex gap-1.5">
                      <span className="size-2.5 rounded-full bg-red-400" />
                      <span className="size-2.5 rounded-full bg-amber-400" />
                      <span className="size-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex-1 truncate rounded-md bg-slate-100 px-3 py-1 text-center text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      {hero.mockUrl}
                    </div>
                  </div>

                  <div className="space-y-4 p-5">
                    <div className="flex items-center gap-3">
                      <span className="size-9 shrink-0 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-500" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-2 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
                        <div className="h-2 w-16 rounded-full bg-slate-100 dark:bg-slate-800" />
                      </div>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                        {hero.liveBadge}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {["bg-brand-500", "bg-sky-500", "bg-amber-500"].map(
                        (color) => (
                          <div
                            key={color}
                            className="rounded-xl border border-slate-100 p-3 dark:border-slate-800"
                          >
                            <div
                              className={`h-1.5 w-6 rounded-full ${color}`}
                            />
                            <div className="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800" />
                            <div className="mt-1.5 h-2 w-2/3 rounded-full bg-slate-100 dark:bg-slate-800" />
                          </div>
                        ),
                      )}
                    </div>

                    <div className="space-y-3 pt-1">
                      {hero.progress.map((row) => (
                        <div key={row.label}>
                          <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                            <span>{row.label}</span>
                            <span>{row.width}</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-500"
                              style={{ width: row.width }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Kartu mengapung */}
                <div className="animate-float absolute -left-3 top-10 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white/95 px-3.5 py-2.5 shadow-lg backdrop-blur sm:-left-8 dark:border-slate-700 dark:bg-slate-900/95">
                  <span className="inline-flex size-8 items-center justify-center rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                    <Rocket className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {hero.floatA.title}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {hero.floatA.sub}
                    </p>
                  </div>
                </div>
                <div className="animate-float-delay absolute -right-3 bottom-8 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white/95 px-3.5 py-2.5 shadow-lg backdrop-blur sm:-right-8 dark:border-slate-700 dark:bg-slate-900/95">
                  <span className="inline-flex size-8 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400">
                    <ShieldCheck className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {hero.floatB.title}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {hero.floatB.sub}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ STRIP TEKNOLOGI (MARQUEE) ============ */}
      <section className="border-y border-slate-100 bg-slate-50/60 dark:border-slate-800/70 dark:bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
            {dict.techStrip}
          </p>
          <div className="group relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="animate-marquee flex w-max items-center gap-3 pr-3">
              {[...techStack, ...techStack].map((tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  aria-hidden={index >= techStack.length}
                  className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-500/50 dark:hover:text-brand-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRODUK ============ */}
      <section
        id="produk"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <SectionHeading
          eyebrow={dict.productsSection.eyebrow}
          eyebrowIcon={Package}
          badgeVariant="solid"
          badgeColor="emerald"
          title={
            <>
              {dict.productsSection.titleStart}
              <span className="text-highlight">
                {dict.productsSection.titleHighlight}
              </span>
              {dict.productsSection.titleEnd}
            </>
          }
          description={dict.productsSection.description}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.products.map((product, index) => (
            <Reveal key={product.slug} delay={index * 80} className="h-full">
              <Tilt className="h-full">
                <ProductCard
                  product={product}
                  locale={locale}
                  learnMoreLabel={dict.learnMore}
                />
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ KENAPA LATANSA ============ */}
      <section className="border-y border-slate-100 bg-slate-50/60 dark:border-slate-800/70 dark:bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading
            eyebrow={dict.whyUs.eyebrow}
            eyebrowIcon={ThumbsUp}
            badgeColor="sky"
            title={dict.whyUs.title}
            description={dict.whyUs.description}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dict.whyUs.items.map((feature, index) => {
              const Icon = whyUsIcons[index] ?? Sparkles;
              return (
                <Reveal
                  key={feature.title}
                  delay={(index % 3) * 90}
                  className="h-full"
                >
                  <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/5 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-brand-500/30">
                    <span
                      className={`inline-flex size-11 items-center justify-center rounded-xl transition group-hover:scale-110 ${
                        whyUsTileColors[index % whyUsTileColors.length]
                      }`}
                    >
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PROSES KERJA ============ */}
      <ProcessSection dict={dict.processSection} eyebrowIcon={ListChecks} />

      {/* ============ CTA ============ */}
      <CtaSection
        cta={dict.cta}
        email={site.email}
        contactHref={withLocale(locale, "/kontak")}
      />
    </>
  );
}
