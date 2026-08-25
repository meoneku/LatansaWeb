import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MemoryGame } from "@/components/games/memory-game";
import { RockPaperScissorsGame } from "@/components/games/rps-game";
import { SnakeGame } from "@/components/games/snake-game";
import { TicTacToeGame } from "@/components/games/tic-tac-toe-game";
import { Reveal } from "@/components/reveal";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  gameSlugs,
  getGameMeta,
  isLocale,
  withLocale,
  type GameSlug,
  type Locale,
} from "@/lib/i18n/config";

type GameDetailProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
  return gameSlugs.flatMap((slug) =>
    ["id", "en"].map((lang) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: GameDetailProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  const game = dict.games.items.find((item) => item.slug === slug);
  if (!game) return {};
  return { title: game.name, description: game.tagline };
}

export default async function GameDetailPage({ params }: GameDetailProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const game = dict.games.items.find((item) => item.slug === slug);
  if (!game) notFound();

  const meta = getGameMeta(game.slug);
  const Icon = meta.icon;
  const g = dict.games;
  const activeSlug: GameSlug = game.slug as GameSlug;
  const others = g.items.filter((item) => item.slug !== slug);

  function renderGame() {
    switch (activeSlug) {
      case "snake":
        return <SnakeGame ui={g.ui} />;
      case "memory-match":
        return <MemoryGame ui={g.ui} />;
      case "tic-tac-toe":
        return <TicTacToeGame ui={g.ui} />;
      case "rock-paper-scissors":
        return <RockPaperScissorsGame ui={g.ui} />;
    }
  }

  return (
    <>
      {/* ============ HERO GAME ============ */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-brand-50/70 via-white to-white dark:border-slate-800/70 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_60%_65%_at_50%_30%,black,transparent)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pt-16 lg:px-8">
          <Link
            href={withLocale(locale, "/games")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
          >
            <ArrowLeft className="size-4" />
            {g.backToAll}
          </Link>

          <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <span
              className={`inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} text-white shadow-xl`}
            >
              <Icon className="size-8" />
            </span>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                {game.name}
              </h1>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
                {game.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ AREA PERMAINAN ============ */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900/40">
            {renderGame()}
          </div>
        </Reveal>
      </section>

      {/* ============ CARA BERMAIN ============ */}
      <section className="border-y border-slate-100 bg-slate-50/60 dark:border-slate-800/70 dark:bg-slate-900/30">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {g.howToTitle}
          </h2>
          <ol className="mt-8 space-y-4">
            {game.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-extrabold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                  {index + 1}
                </span>
                <p className="pt-1 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  {instruction}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ PERMAINAN LAINNYA ============ */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {g.otherGames}
          </h2>
          <Link
            href={withLocale(locale, "/games")}
            className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-600 transition hover:gap-2.5 sm:inline-flex dark:text-brand-400"
          >
            {g.backToAll}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((item, index) => {
            const itemMeta = getGameMeta(item.slug);
            const ItemIcon = itemMeta.icon;
            return (
              <Reveal key={item.slug} delay={index * 80} className="h-full">
                <Link
                  href={withLocale(locale, `/games/${item.slug}`)}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/10 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-brand-500/30"
                >
                  <span
                    className={`inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${itemMeta.gradient} text-white shadow-md`}
                  >
                    <ItemIcon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-slate-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {item.tagline}
                    </p>
                  </div>
                  <ArrowRight className="ml-auto size-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-500" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
