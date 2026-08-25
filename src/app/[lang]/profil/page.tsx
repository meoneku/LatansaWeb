import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
} from "lucide-react";
import { PrintButton } from "@/components/print-button";
import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";
import {
  getProductMeta,
  isLocale,
  site,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type ProfilPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: ProfilPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.profile.title,
    description: dict.meta.description,
    robots: { index: false },
  };
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-800">
      <span aria-hidden="true" className="h-px w-5 bg-brand-500" />
      {children}
    </h2>
  );
}

export default async function ProfilPage({ params }: ProfilPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const pr = dict.profile;
  const t = dict.tentang;

  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      {/* Bilah aksi (tidak ikut tercetak) */}
      <div className="no-print mb-6 flex items-center justify-between">
        <Link
          href={`/${locale}/tentang`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
        >
          <ArrowLeft className="size-4" />
          {dict.nav.about}
        </Link>
        <PrintButton label={pr.download} />
      </div>

      {/* Lembar dokumen - selalu gaya terang seperti kertas */}
      <Reveal>
        <article
          className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10"
          style={{
            WebkitPrintColorAdjust: "exact",
            printColorAdjust: "exact",
          }}
        >
          {/* ======== SAMPUL ======== */}
          <header className="relative overflow-hidden px-8 pb-10 pt-14 text-center sm:px-14">
            <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-brand-50 to-transparent" />
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 size-56 rounded-full bg-teal-400/15 blur-2xl"
            />

            <div className="relative">
              <LogoMark className="mx-auto size-20" />
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900">
                {site.name}
              </h1>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-800">
                {pr.tagline}
              </p>
              <div
                aria-hidden="true"
                className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
              />
              <p className="mt-4 text-[11px] text-slate-400">
                latansa.biz.id · {new Date().getFullYear()}
              </p>
            </div>
          </header>

          {/* ======== ISI ======== */}
          <div className="space-y-11 px-8 pb-12 sm:px-14">
            {/* Tentang singkat */}
            <section>
              <SectionTitle>{t.header.eyebrow}</SectionTitle>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                {dict.meta.description}
              </p>

              <dl className="mt-7 grid grid-cols-3 gap-4">
                {dict.hero.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-center"
                  >
                    <dd className="text-xl font-extrabold text-brand-800">
                      {stat.value}
                    </dd>
                    <dt className="mt-1 text-[10px] font-semibold uppercase leading-snug tracking-wide text-slate-500">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </section>

            {/* Visi */}
            <section>
              <SectionTitle>{t.visionLabel}</SectionTitle>
              <blockquote className="mt-3 border-l-4 border-brand-500 pl-4 text-sm italic leading-relaxed text-slate-700">
                {t.visionText}
              </blockquote>
            </section>

            {/* Layanan */}
            <section>
              <SectionTitle>{t.focusLabel}</SectionTitle>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {dict.products.map((product) => {
                  const meta = getProductMeta(product.slug);
                  const Icon = meta.icon;
                  return (
                    <div
                      key={product.slug}
                      className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                    >
                      <span
                        className={`inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${meta.gradient} text-white`}
                      >
                        <Icon className="size-4" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {product.name}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                          {product.summary}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Keunggulan ringkas */}
            <section>
              <SectionTitle>{dict.whyUs.eyebrow}</SectionTitle>
              <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {dict.whyUs.items.map((item) => (
                  <li key={item.title} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                    <span className="text-sm font-medium text-slate-800">
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Kontak */}
            <section>
              <SectionTitle>{dict.nav.contact}</SectionTitle>
              <div className="mt-4 space-y-2.5 text-sm text-slate-700">
                <p className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" />
                  {dict.contactInfo.addressFull}
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 transition hover:text-brand-700"
                >
                  <Mail className="size-4 shrink-0 text-brand-600" />
                  {site.email}
                </a>
                <p className="flex items-center gap-2.5">
                  <Clock className="size-4 shrink-0 text-brand-600" />
                  {dict.contactInfo.hours}
                </p>
              </div>
            </section>
          </div>

          {/* Kaki dokumen */}
          <footer className="flex items-center justify-between border-t border-slate-100 px-8 py-5 text-[11px] text-slate-400 sm:px-14">
            <span>{dict.footer.builtWith}</span>
            <span className="font-semibold">latansa.biz.id/{locale}</span>
          </footer>
        </article>
      </Reveal>
    </section>
  );
}
