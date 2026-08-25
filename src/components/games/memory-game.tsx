"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  Bell,
  Cloud,
  Fish,
  Heart,
  Moon,
  RotateCcw,
  Star,
  Sun,
  TreePine,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { submitMemoryScore } from "@/lib/scores";

type Ui = Dictionary["games"]["ui"];

const ICONS = [Star, Heart, Bell, Moon, Sun, Cloud, Fish, TreePine];

const TILE_COLORS = [
  "text-emerald-600 dark:text-emerald-400",
  "text-sky-600 dark:text-sky-400",
  "text-amber-600 dark:text-amber-400",
  "text-rose-600 dark:text-rose-400",
  "text-cyan-600 dark:text-cyan-400",
  "text-orange-600 dark:text-orange-400",
  "text-teal-600 dark:text-teal-400",
  "text-brand-700 dark:text-brand-400",
];

type Card = { key: number; icon: number };

function shuffle(): Card[] {
  const cards: Card[] = [];
  for (let i = 0; i < ICONS.length; i++) {
    cards.push({ key: i * 2, icon: i }, { key: i * 2 + 1, icon: i });
  }
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

// Deteksi hydration tanpa setState di dalam effect
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

// Punggung kartu netral untuk render awal server & client (bebas acak)
const PLACEHOLDER_CARDS: Card[] = Array.from({ length: 16 }, (_, i) => ({
  key: i,
  icon: -1,
}));

export function MemoryGame({ ui }: { ui: Ui }) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [cards, setCards] = useState<Card[]>(PLACEHOLDER_CARDS);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [newRecord, setNewRecord] = useState(false);

  // Acak kartu pada frame pertama setelah mount (bebas warning cascading)
  useEffect(() => {
    const id = requestAnimationFrame(() => setCards(shuffle()));
    return () => cancelAnimationFrame(id);
  }, []);

  const locked = open.length === 2;
  const won = mounted && matched.length === cards.length && cards.length > 0;

  function restart() {
    setCards(shuffle());
    setOpen([]);
    setMatched([]);
    setMoves(0);
    setNewRecord(false);
  }

  function flip(key: number) {
    if (!mounted || locked || won) return;
    if (open.includes(key) || matched.includes(key)) return;

    const nextOpen = [...open, key];
    setOpen(nextOpen);

    if (nextOpen.length < 2) return;

    const movesNow = moves + 1;
    setMoves(movesNow);

    const [firstKey, secondKey] = nextOpen;
    const firstIcon = cards.find((c) => c.key === firstKey)?.icon;
    const secondIcon = cards.find((c) => c.key === secondKey)?.icon;

    if (firstIcon !== undefined && firstIcon === secondIcon) {
      setTimeout(() => {
        const nextMatched = [...matched, firstKey, secondKey];
        setMatched(nextMatched);
        setOpen([]);
        if (nextMatched.length === cards.length) {
          setNewRecord(submitMemoryScore(movesNow));
        }
      }, 350);
    } else {
      setTimeout(() => setOpen([]), 750);
    }
  }

  const board = cards;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full max-w-md items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {ui.moves}:{" "}
          <span className="font-extrabold text-sky-700 dark:text-sky-400">
            {moves}
          </span>
        </span>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {ui.pairsFound}:{" "}
          <span className="font-extrabold text-emerald-700 dark:text-emerald-400">
            {matched.length / 2}/8
          </span>
        </span>
      </div>

      <div className="relative w-full max-w-md">
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {board.map((card) => {
            const isOpen =
              open.includes(card.key) || matched.includes(card.key);
            const Icon = ICONS[card.icon];
            return (
              <button
                key={card.key}
                type="button"
                onClick={() => flip(card.key)}
                aria-label={isOpen ? undefined : "kartu tertutup"}
                className={`aspect-square rounded-xl border transition duration-300 ${
                  isOpen
                    ? `border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900 ${TILE_COLORS[card.icon]}`
                    : "border-transparent bg-gradient-to-br from-brand-500 to-teal-500 shadow-md hover:brightness-105"
                }`}
              >
                {isOpen ? (
                  <Icon className="mx-auto size-7 sm:size-8" strokeWidth={2.2} />
                ) : (
                  <span className="block h-full w-full pt-[26%] text-center text-lg font-black text-white/80 sm:text-xl">
                    ?
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {won ? (
          <div className="absolute inset-0 -m-2 flex flex-col items-center justify-center gap-4 rounded-3xl bg-white/90 backdrop-blur-sm dark:bg-slate-950/85">
            <p className="text-center text-lg font-extrabold tracking-tight text-emerald-700 dark:text-emerald-400">
              {ui.win} - {ui.moves}: {moves}
            </p>
            {newRecord ? (
              <p className="text-sm font-bold text-amber-600 dark:text-amber-400">
                Rekor baru!
              </p>
            ) : null}
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-600/25 transition hover:bg-sky-700"
            >
              <RotateCcw className="size-4" />
              {ui.restart}
            </button>
          </div>
        ) : null}
      </div>

      {!won ? (
        <button
          type="button"
          onClick={restart}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
        >
          <RotateCcw className="size-4" />
          {ui.restart}
        </button>
      ) : null}
    </div>
  );
}
