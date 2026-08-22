"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { withLocale, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) =>
    path === `/${locale}`
      ? pathname === path
      : pathname === path || pathname.startsWith(`${path}/`);

  const closeMenu = () => setOpen(false);

  const navItems = [
    { href: withLocale(locale, "/"), label: dict.nav.home },
    { href: withLocale(locale, "/tentang"), label: dict.nav.about },
    { href: withLocale(locale, "/produk"), label: dict.nav.products },
    { href: withLocale(locale, "/kontak"), label: dict.nav.contact },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-slate-200/80 bg-white/85 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/85"
          : "border-b border-transparent bg-white/60 backdrop-blur-sm dark:bg-slate-950/60"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Logo locale={locale} />

        {/* Navigasi desktop */}
        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
          <Link
            href={withLocale(locale, "/kontak")}
            className="hidden items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 hover:shadow-brand-700/30 md:inline-flex"
          >
            {dict.nav.startProject}
            <ArrowRight className="size-4" />
          </Link>

          {/* Tombol menu mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-700 transition hover:border-brand-300 hover:text-brand-600 lg:hidden dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-400"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Panel menu mobile */}
      <div
        id="mobile-menu"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <nav aria-label="Navigasi mobile" className="overflow-hidden">
          <div className="space-y-1 border-t border-slate-100 px-4 py-4 dark:border-slate-800/70">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={withLocale(locale, "/kontak")}
              onClick={closeMenu}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
            >
              {dict.nav.startProject}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
