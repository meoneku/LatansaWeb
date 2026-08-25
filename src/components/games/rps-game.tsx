"use client";

import { useState } from "react";
import { Mountain, Newspaper, RotateCcw, Scissors } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Choice = "rock" | "paper" | "scissors";
type Ui = Dictionary["games"]["ui"];

const CHOICES: { id: Choice; label: string; icon: typeof Mountain }[] = [
  { id: "rock", label: "rock", icon: Mountain },
  { id: "paper", label: "paper", icon: Newspaper },
  { id: "scissors", label: "scissors", icon: Scissors },
];

function beats(a: Choice, b: Choice): boolean {
  return (
    (a === "rock" && b === "scissors") ||
    (a === "scissors" && b === "paper") ||
    (a === "paper" && b === "rock")
  );
}

function randomChoice(): Choice {
  const options: Choice[] = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

export function RockPaperScissorsGame({ ui }: { ui: Ui }) {
  const [scores, setScores] = useState({ you: 0, computer: 0 });
  const [rounds, setRounds] = useState(0);
  const [last, setLast] = useState<{
    user: Choice;
    bot: Choice;
    result: "win" | "lose" | "draw";
  } | null>(null);

  function play(user: Choice) {
    const bot = randomChoice();
    const result =
      user === bot ? "draw" : beats(user, bot) ? "win" : "lose";

    setLast({ user, bot, result });
    setRounds((r) => r + 1);
    if (result === "win") setScores((s) => ({ ...s, you: s.you + 1 }));
    if (result === "lose") setScores((s) => ({ ...s, computer: s.computer + 1 }));
  }

  function reset() {
    setScores({ you: 0, computer: 0 });
    setRounds(0);
    setLast(null);
  }

  const resultText = last
    ? last.result === "win"
      ? ui.win
      : last.result === "lose"
        ? ui.lose
        : ui.draw
    : null;

  return (
    <div className="flex w-full flex-col items-center gap-6">
      {/* Papan skor */}
      <div className="flex w-full max-w-sm items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {ui.you}:{" "}
          <span className="font-extrabold text-emerald-700 dark:text-emerald-400">
            {scores.you}
          </span>
        </span>
        <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {ui.score}
        </span>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {ui.computer}:{" "}
          <span className="font-extrabold text-rose-700 dark:text-rose-400">
            {scores.computer}
          </span>
        </span>
      </div>

      {/* Hasil ronde terakhir */}
      <div className="min-h-[72px] text-center" aria-live="polite">
        {last ? (
          <>
            <p
              className={`text-xl font-extrabold tracking-tight ${
                last.result === "win"
                  ? "text-emerald-700 dark:text-emerald-400"
                  : last.result === "lose"
                    ? "text-rose-700 dark:text-rose-400"
                    : "text-slate-700 dark:text-slate-300"
              }`}
            >
              {resultText}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {ui.you}:{" "}
              <span className="font-bold uppercase">
                {ui[last.user as keyof Ui] as string}
              </span>{" "}
              vs{" "}
              <span className="font-bold uppercase">
                {ui[last.bot as keyof Ui] as string}
              </span>{" "}
              : {ui.computer}
            </p>
          </>
        ) : (
          <p className="pt-4 text-base font-semibold text-slate-600 dark:text-slate-400">
            {ui.chooseWeapon}
          </p>
        )}
      </div>

      {/* Tombol senjata */}
      <div className="grid w-full max-w-md grid-cols-3 gap-3">
        {CHOICES.map((choice) => {
          const Icon = choice.icon;
          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => play(choice.id)}
              className={`flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border transition active:scale-95 ${
                last?.user === choice.id
                  ? "border-brand-400 bg-brand-50 dark:border-brand-500/40 dark:bg-brand-500/10"
                  : "border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50/40 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-brand-500/30 dark:hover:bg-brand-500/5"
              }`}
            >
              <Icon className="size-8 text-slate-700 sm:size-10 dark:text-slate-200" strokeWidth={1.8} />
              <span className="text-xs font-bold uppercase tracking-wide text-slate-600 sm:text-sm dark:text-slate-300">
                {ui[choice.id]}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={reset}
        disabled={rounds === 0}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-brand-600 disabled:opacity-40 dark:text-slate-400 dark:hover:text-brand-400"
      >
        <RotateCcw className="size-4" />
        {ui.resetScore}
      </button>
    </div>
  );
}
