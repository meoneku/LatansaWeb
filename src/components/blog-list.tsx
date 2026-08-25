"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

export type BlogItem = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  dateLabel: string;
  minutes: number;
};

type BlogListProps = {
  items: BlogItem[];
  basePath: string;
  ui: {
    searchPlaceholder: string;
    allTags: string;
    noResults: string;
    readMore: string;
    minRead: string;
  };
};

export function BlogList({ items, basePath, ui }: BlogListProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(
    () => Array.from(new Set(items.map((item) => item.tag))),
    [items],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesTag = !activeTag || item.tag === activeTag;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q);
      return matchesTag && matchesQuery;
    });
  }, [items, query, activeTag]);

  return (
    <>
      {/* Pencarian & filter */}
      <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={ui.searchPlaceholder}
            aria-label={ui.searchPlaceholder}
            className="w-full rounded-full border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-brand-400"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {[null, ...tags].map((tag) => {
            const active = activeTag === tag;
            return (
              <button
                key={tag ?? "all"}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                  active
                    ? "bg-brand-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-500/40 dark:hover:text-brand-400"
                }`}
              >
                {tag ?? ui.allTags}
              </button>
            );
          })}
        </div>
      </div>

      {/* Daftar artikel */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Link
            key={item.slug}
            href={`${basePath}/${item.slug}`}
            className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/10 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-brand-500/30"
          >
            <div className="flex items-center gap-2 text-xs">
              <span className="rounded-full bg-brand-50 px-3 py-1 font-bold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                {item.tag}
              </span>
              <span className="text-slate-400 dark:text-slate-500">
                {item.minutes} {ui.minRead}
              </span>
            </div>

            <h2 className="mt-4 flex-none text-lg font-extrabold leading-snug tracking-tight text-slate-900 transition group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400">
              {item.title}
            </h2>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {item.dateLabel}
            </p>

            <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {item.excerpt}
            </p>

            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-all group-hover:gap-2.5 dark:text-brand-400">
              {ui.readMore}
              <ArrowRight className="size-4" />
            </span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
          {ui.noResults}
        </p>
      ) : null}
    </>
  );
}
