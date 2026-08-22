import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/logo";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/social-icons";
import { site, withLocale, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const socialIcons = [InstagramIcon, FacebookIcon, LinkedinIcon, GithubIcon];

type SiteFooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const year = new Date().getFullYear();

  const navItems = [
    { href: withLocale(locale, "/"), label: dict.nav.home },
    { href: withLocale(locale, "/tentang"), label: dict.nav.about },
    { href: withLocale(locale, "/produk"), label: dict.nav.products },
    { href: withLocale(locale, "/kontak"), label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800/80 dark:bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo locale={locale} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {dict.footer.description}
            </p>
            <div className="mt-5 flex items-center gap-2">
              {site.socials.map((social, index) => {
                const Icon = socialIcons[index];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-500/50 dark:hover:text-brand-400"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigasi */}
          <nav aria-label={dict.footer.navigationTitle}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {dict.footer.navigationTitle}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-600 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Produk */}
          <nav aria-label={dict.footer.productsTitle}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {dict.footer.productsTitle}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {dict.products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={withLocale(locale, `/produk/${product.slug}`)}
                    className="text-slate-600 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontak */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {dict.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" />
                <span>{dict.contactInfo.addressFull}</span>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 transition hover:text-brand-600 dark:hover:text-brand-400"
                >
                  <Mail className="size-4 shrink-0 text-brand-500" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand-500" />
                <span>{dict.contactInfo.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 sm:flex-row dark:border-slate-800 dark:text-slate-500">
          <p>
            © {year} {site.name}. {dict.footer.copyright}
          </p>
          <p>{dict.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
