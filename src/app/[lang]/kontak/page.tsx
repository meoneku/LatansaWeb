import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, HelpCircle, Mail, MapPin, MessageSquareText } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { NewsletterForm } from "@/components/newsletter-form";
import { OpenStatus } from "@/components/open-status";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, site, withLocale, type Locale } from "@/lib/i18n/config";

type KontakPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: KontakPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.nav.contact,
    description: `${dict.kontak.header.description} Email: ${site.email}.`,
  };
}

export default async function KontakPage({ params }: KontakPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const k = dict.kontak;

  const contactItems = [
    {
      icon: MapPin,
      label: k.labels.address,
      value: dict.contactInfo.addressFull,
      href: undefined as string | undefined,
      tile: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    {
      icon: Mail,
      label: k.labels.email,
      value: site.email,
      href: `mailto:${site.email}`,
      tile: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
    },
    {
      icon: Clock,
      label: k.labels.hours,
      value: dict.contactInfo.hours,
      href: undefined,
      tile: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={k.header.eyebrow}
        breadcrumbs={[{ label: dict.nav.home, href: withLocale(locale, "/") }, { label: k.header.eyebrow }]}
        eyebrowIcon={MessageSquareText}
        badgeVariant="dashed"
        badgeColor="cyan"
        title={
          <>
            {k.header.titleStart}
            <span className="text-highlight">{k.header.titleHighlight}</span>
            {k.header.titleEnd}
          </>
        }
        description={k.header.description}
      />

      {/* ============ INFO + FORMULIR ============ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          {/* Info kontak */}
          <div className="space-y-5">
            <Reveal>
              <OpenStatus dict={dict.kontak} />
            </Reveal>

            {contactItems.map((item, index) => {
              const Icon = item.icon;
              const content = (
                <>
                  <span
                    className={`inline-flex size-12 shrink-0 items-center justify-center rounded-2xl transition group-hover:scale-110 ${item.tile}`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                      {item.value}
                    </p>
                  </div>
                </>
              );

              return (
                <Reveal key={item.label} delay={index * 80}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-brand-500/30"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                      {content}
                    </div>
                  )}
                </Reveal>
              );
            })}

            <Reveal delay={240}>
              <div className="rounded-2xl bg-gradient-to-br from-sky-700 to-cyan-700 p-6 text-white">
                <p className="text-base font-bold">{k.quickResponse.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-sky-50">
                  {k.quickResponse.description}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Formulir */}
          <Reveal delay={100}>
            <ContactForm
              locale={locale}
              dict={dict.kontak}
              productNames={dict.products.map((product) => product.name)}
              email={site.email}
            />
          </Reveal>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-t border-slate-100 bg-slate-50/60 py-16 dark:border-slate-800/70 dark:bg-slate-900/30 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={k.faq.eyebrow}
            eyebrowIcon={HelpCircle}
            badgeVariant="tab"
            badgeColor="amber"
            title={k.faq.title}
            description={k.faq.description}
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion items={k.faq.items} />
          </div>
        </div>
      </section>
    </>
  );
}
