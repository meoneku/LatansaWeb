import Link from "next/link";
import { Mail } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { site, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { LegalDoc } from "@/lib/legal";

type LegalPageProps = {
  doc: LegalDoc;
  dict: Dictionary;
  locale: Locale;
};

/** Kerangka bersama untuk halaman Kebijakan Privasi & Syarat-Ketentuan */
export function LegalPage({ doc, dict, locale }: LegalPageProps) {
  return (
    <>
      <PageHeader
        eyebrow={doc.title}
        title={doc.title}
      />

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {dict.legal.lastUpdated}:{" "}
            {new Date().toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <div className="mt-8 space-y-9">
            {doc.sections.map((section) => (
              <article key={section.heading}>
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-brand-200 bg-brand-50/60 p-5 dark:border-brand-500/30 dark:bg-brand-500/5">
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {dict.legal.contactHeading}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
            >
              <Mail className="size-4" />
              {site.email}
            </a>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {dict.legal.contactBody}
            </p>
          </div>

          <Link
            href={withLocaleSafe(locale)}
            className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-400"
          >
            ← {dict.nav.home}
          </Link>
        </Reveal>
      </section>
    </>
  );
}

function withLocaleSafe(locale: Locale) {
  return `/${locale}`;
}
