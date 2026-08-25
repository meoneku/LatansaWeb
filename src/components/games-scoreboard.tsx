"use client";

import { useEffect, useState } from "react";
import { RotateCcw, Trophy } from "lucide-react";
import { getScores, type GameScores } from "@/lib/scores";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type LeaderboardUi = Dictionary["games"]["leaderboard"];

/** Papan skor lokal yang membaca seluruh rekor game dari localStorage */
export function GamesScoreboard({ dict }: { dict: LeaderboardUi }) {
  const [scores, setScores] = useState<GameScores | null>(null);

  useEffect(() => {
    // Baca via rAF agar tidak memicu setState sinkron di dalam effect
    const id = requestAnimationFrame(() => setScores(getScores()));
    return () => cancelAnimationFrame(id);
  }, []);

  function resetAll() {
    try {
      localStorage.removeItem("latansa-game-scores");
      localStorage.removeItem("latansa-snake-best");
    } catch {
      /* abaikan */
    }
    setScores(getScores());
  }

  const items = scores
    ? [
        { label: dict.snakeLabel, value: String(scores.snake) },
        {
          label: dict.memoryLabel,
          value: scores.memory === null ? "-" : `${scores.memory} ${dict.movesSuffix}`,
        },
        { label: dict.tttLabel, value: String(scores.tictactoe) },
      ]
    : [];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
          <Trophy className="size-5 text-amber-500" />
          {dict.title}
        </h2>
        {scores && (scores.snake > 0 || scores.tictactoe > 0 || scores.memory !== null) ? (
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-rose-500 dark:text-slate-500"
          >
            <RotateCcw className="size-3.5" />
            {dict.resetAll}
          </button>
        ) : null}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-center dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-2xl font-extrabold text-brand-700 dark:text-brand-400">
              {item.value}
            </p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
        {dict.emptyHint}
      </p>
    </div>
  );
}
