import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { isLocale, locales, site, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type LangLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: Omit<LangLayoutProps, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);
  const title = `${site.name} — ${dict.meta.tagline}`;

  return {
    title: { default: title, template: `%s | ${site.name}` },
    description: dict.meta.description,
    alternates: {
      languages: {
        id: `/id`,
        en: `/en`,
        "x-default": `/id`,
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "id" ? "id_ID" : "en_US",
      siteName: site.name,
      title,
      description: dict.meta.description,
    },
  };
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      {/* Sinkronkan atribut lang dokumen dengan locale aktif */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${locale}";`,
        }}
      />
      <SiteHeader locale={locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
