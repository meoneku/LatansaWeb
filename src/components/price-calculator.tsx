"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Calculator, Check, MessageSquareText } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type CalcUi = Dictionary["pricing"]["calc"];

const BASE_PRICES: Record<string, number> = {
  web: 1_500_000,
  toko: 6_000_000,
  mobile: 15_000_000,
  system: 20_000_000,
};

const ADDONS: { id: string; price: number; key: keyof CalcUi["addons"] }[] = [
  { id: "admin", price: 1_000_000, key: "admin" },
  { id: "login", price: 800_000, key: "login" },
  { id: "payment", price: 1_500_000, key: "payment" },
  { id: "i18n", price: 750_000, key: "i18n" },
  { id: "waapi", price: 600_000, key: "waapi" },
  { id: "dashboard", price: 1_200_000, key: "dashboard" },
  { id: "push", price: 1_000_000, key: "push" },
];

const formatIDR = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export function PriceCalculator({
  calc,
  locale,
}: {
  calc: CalcUi;
  locale: Locale;
}) {

  const [project, setProject] = useState("web");
  const [selected, setSelected] = useState<string[]>([]);

  const toggleAddon = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );

  const total = useMemo(() => {
    const base = BASE_PRICES[project] ?? 0;
    const extras = ADDONS.filter((addon) =>
      selected.includes(addon.id),
    ).reduce((sum, addon) => sum + addon.price, 0);
    return base + extras;
  }, [project, selected]);

  const min = Math.round((total * 0.85) / 50_000) * 50_000;
  const max = Math.round((total * 1.3) / 50_000) * 50_000;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-600 text-white">
          <Calculator className="size-5" />
        </span>
        <div>
          <h2 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
            {calc.title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {calc.subtitle}
          </p>
        </div>
      </div>

      {/* Jenis proyek */}
      <fieldset className="mt-7">
        <legend className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {calc.projectLabel}
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {Object.entries(calc.projects).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setProject(id)}
              aria-pressed={project === id}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                project === id
                  ? "border-brand-500 bg-brand-50 text-brand-800 dark:border-brand-500/50 dark:bg-brand-500/10 dark:text-brand-300"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-500/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Fitur tambahan */}
      <fieldset className="mt-6">
        <legend className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {calc.addonsLabel}
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {ADDONS.map((addon) => {
            const active = selected.includes(addon.id);
            return (
              <button
                key={addon.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleAddon(addon.id)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  active
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-500/40"
                }`}
              >
                {active ? <Check className="size-3.5" /> : null}
                {calc.addons[addon.key]}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Hasil estimasi */}
      <div className="mt-7 rounded-2xl bg-gradient-to-br from-brand-700 to-teal-700 p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-100">
          {calc.estimateLabel}
        </p>
        <p className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {formatIDR(min)} - {formatIDR(max)}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-indigo-100">
          {calc.note}
        </p>
        <Link
          href={{ pathname: `/${locale}/kontak`, query: { estimasi: formatIDR(min) } }}
          className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-brand-700 transition hover:-translate-y-0.5 hover:bg-emerald-50"
        >
          <MessageSquareText className="size-4" />
          {calc.cta}
        </Link>
      </div>
    </div>
  );
}
