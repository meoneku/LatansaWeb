"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n/config";

type NotFoundContentProps = {
  title: string;
  description: string;
  backHome: string;
};

/**
 * 404 yang menyesuaikan bahasa berdasarkan URL aktif.
 * Dirender sebagai client component agar bisa membaca pathname.
 */
export function NotFoundContent({
  fallback,
}: {
  fallback: NotFoundContentProps;
}) {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/");
  const detected = locales.includes(segments[1] as Locale)
    ? (segments[1] as Locale)
    : null;

  const content =
    detected === "en"
      ? {
          title: "Page not found",
          description:
            "The page you're looking for may have been moved or never existed. Head back to the homepage to keep exploring.",
          backHome: "Back to Home",
        }
      : fallback;

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_55%_55%_at_50%_40%,black,transparent)]"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <p className="text-highlight text-7xl font-extrabold tracking-tight sm:text-8xl">
          404
        </p>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          {content.title}
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {content.description}
        </p>
        <Link
          href={`/${detected ?? "id"}`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
        >
          <ArrowLeft className="size-4" />
          {content.backHome}
        </Link>
      </div>
    </section>
  );
}
