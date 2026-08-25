import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { GamesScoreboard } from "@/components/games-scoreboard";
import { Tilt } from "@/components/tilt-card";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  getGameMeta,
  isLocale,
  withLocale,
  type Locale,
} from "@/lib/i18n/config";

type GamesPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: GamesPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.nav.games, description: dict.games.header.description };
}

export default async function GamesPage({ params }: GamesPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const g = dict.games;

  return (
    <>
      <PageHeader
        eyebrow={g.header.eyebrow}
        breadcrumbs={[{ label: dict.nav.home, href: withLocale(locale, "/") }, { label: g.header.eyebrow }]}
        eyebrowIcon={Gamepad2}
        badgeVariant="solid"
        badgeColor="orange"
        title={
          <>
            {g.header.titleStart}
            <span className="text-highlight">{g.header.titleHighlight}</span>
            {g.header.titleEnd}
          </>
        }
        description={g.header.description}
      />

      {/* ============ PAPAN REKOR ============ */}
      <section className="mx-auto max-w-3xl px-4 pt-2 sm:px-6 lg:px-8">
        <GamesScoreboard dict={g.leaderboard} />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {g.items.map((game, index) => {
            const meta = getGameMeta(game.slug);
            const Icon = meta.icon;
            return (
              <Reveal key={game.slug} delay={(index % 2) * 90} className="h-full">
                <Tilt className="h-full">
                  <Link
                  href={withLocale(locale, `/games/${game.slug}`)}
                  className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/10 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-brand-500/30"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex size-13 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} text-white shadow-lg`}
                    >
                      <Icon className="size-6" />
                    </span>
                    <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      {game.name}
                    </h2>
                  </div>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {game.tagline}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-600/20 transition group-hover:gap-3 group-hover:bg-brand-700">
                    {g.playNow}
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
