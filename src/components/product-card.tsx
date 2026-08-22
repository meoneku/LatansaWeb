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

/** Kartu produk ringkas — dipakai di beranda & bagian "produk lainnya" */
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
      <span
        className={`inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${meta.gradient} text-white shadow-md`}
      >
        <Icon className="size-6" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
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
