"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n/config";

const shortLabels: Record<Locale, string> = { id: "ID", en: "EN" };
const fullNames: Record<Locale, string> = {
  id: "Bahasa Indonesia",
  en: "English",
};

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";

  // Ganti segmen bahasa pertama pada URL saat ini (mis. /id/produk → /en/produk)
  const rest = pathname.replace(/^\/(id|en)(?=\/|$)/, "") || "/";
  const hrefFor = (target: Locale) => `/${target}${rest === "/" ? "" : rest}`;

  return (
    <div
      role="group"
      aria-label={fullNames[locale]}
      className="flex items-center gap-0.5 rounded-full border border-slate-200 bg-white/60 p-1 dark:border-slate-700 dark:bg-slate-900/60"
    >
      <Globe
        aria-hidden="true"
        className="ml-1 size-3.5 text-slate-400 dark:text-slate-500"
      />
      {locales.map((item) => {
        const active = item === locale;
        return (
          <Link
            key={item}
            href={hrefFor(item)}
            hrefLang={item}
            title={fullNames[item]}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${
              active
                ? "bg-brand-600 text-white shadow-sm"
                : "text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
            }`}
          >
            {shortLabels[item]}
          </Link>
        );
      })}
    </div>
  );
}
