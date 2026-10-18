import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getProductMeta,
  withLocale,
  type Locale,
} from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type ProductCardProps = {
  product: Dictionary["products"][number];
  locale: Locale;
  learnMoreLabel: string;
};

/** Kartu produk ringkas - dipakai di beranda & bagian "produk lainnya" */
export function ProductCard({
  product,
  locale,
  learnMoreLabel,
}: ProductCardProps) {
  const meta = getProductMeta(product.slug);
  const Icon = meta.icon;

  return (
    <Link
      href={withLocale(locale, `/produk/${product.slug}`)}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/10 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-brand-500/30"
    >
      <div className="flex items-center justify-between">
        {meta?.logo ? (
          <div className="inline-flex size-12 items-center justify-center rounded-xl bg-slate-900 p-1.5 shadow-md ring-1 ring-emerald-500/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={meta.logo}
              alt={product.name}
              className="size-9 object-contain"
            />
          </div>
        ) : (
          <span
            className={`inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} text-white shadow-md`}
          >
            <Icon className="size-6" />
          </span>
        )}
        {meta?.type === "ready" ? (
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300">
            {meta.badge?.[locale] ?? "Produk Jadi"}
          </span>
        ) : (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {locale === "en" ? "Custom" : "Kustom"}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
        {product.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {product.summary}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-all group-hover:gap-2.5 dark:text-brand-400">
        {learnMoreLabel}
        <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}
