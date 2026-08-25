import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import {
  EyebrowBadge,
  type BadgeColor,
  type BadgeVariant,
} from "@/components/eyebrow-badge";
import { Reveal } from "@/components/reveal";

export type Breadcrumb = { label: string; href?: string };

type PageHeaderProps = {
  eyebrow: string;
  eyebrowIcon?: LucideIcon;
  badgeVariant?: BadgeVariant;
  badgeColor?: BadgeColor;
  title: React.ReactNode;
  description?: string;
  breadcrumbs?: Breadcrumb[];
};

/** Header kecil yang dipakai di bagian atas halaman selain beranda */
export function PageHeader({
  eyebrow,
  eyebrowIcon = Sparkles,
  badgeVariant = "solid",
  badgeColor = "emerald",
  title,
  description,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-brand-50/70 via-white to-white dark:border-slate-800/70 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_60%_60%_at_50%_35%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 h-56 w-[28rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl dark:bg-brand-500/10"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          {breadcrumbs && breadcrumbs.length ? (
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex justify-center text-xs"
            >
              <ol className="flex items-center gap-2">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {index > 0 ? (
                      <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">
                        /
                      </span>
                    ) : null}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="font-medium transition hover:text-brand-600 dark:hover:text-brand-400"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="font-semibold text-slate-500 dark:text-slate-400">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <EyebrowBadge
            icon={eyebrowIcon}
            variant={badgeVariant}
            color={badgeColor}
          >
            {eyebrow}
          </EyebrowBadge>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            {title}
          </h1>
          {description ? (
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
              {description}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
