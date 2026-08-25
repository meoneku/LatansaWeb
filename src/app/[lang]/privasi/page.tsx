import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal-page";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { legalContent } from "@/lib/legal";

type PrivasiPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: PrivasiPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.legal.privacyTitle,
    description: dict.legal.contactBody,
  };
}

export default async function PrivasiPage({ params }: PrivasiPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <LegalPage
      doc={legalContent.privacy[locale]}
      dict={dict}
      locale={locale}
    />
  );
}
