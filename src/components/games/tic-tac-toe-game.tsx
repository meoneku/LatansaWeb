"use client";

import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { addTicTacToeWin } from "@/lib/scores";

type Cell = "X" | "O" | null;
type Ui = Dictionary["games"]["ui"];

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(board: Cell[]): Cell | "draw" | null {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.every(Boolean) ? "draw" : null;
}

function minimax(board: Cell[], isMaximizing: boolean): number {
  const result = getWinner(board);
  if (result === "O") return 10;
  if (result === "X") return -10;
  if (result === "draw") return 0;

  let best = isMaximizing ? -Infinity : Infinity;
  for (let i = 0; i < 9; i++) {
    if (board[i]) continue;
    board[i] = isMaximizing ? "O" : "X";
    const score = minimax(board, !isMaximizing);
    board[i] = null;
    best = isMaximizing ? Math.max(best, score) : Math.min(best, score);
  }
  return best;
}

function bestMove(board: Cell[]): number {
  let bestScore = -Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (board[i]) continue;
    board[i] = "O";
    const score = minimax(board, false);
    board[i] = null;
    if (score > bestScore) {
      bestScore = score;
      move = i;
    }
  }
  return move;
}

function emptyBoard(): Cell[] {
  return Array(9).fill(null);
}

export function TicTacToeGame({ ui }: { ui: Ui }) {
  const [board, setBoard] = useState<Cell[]>(emptyBoard);
  const [scores, setScores] = useState({ win: 0, lose: 0, draw: 0 });
  const [botThinking, setBotThinking] = useState(false);

  // Cermin board agar callback terjadwal selalu membaca nilai terbaru
  const boardRef = useRef<Cell[]>(board);

  function updateBoard(next: Cell[]) {
    boardRef.current = next;
    setBoard(next);
  }

  function recordResult(target: Cell[]) {
    const result = getWinner(target);
    if (result === "X") {
      addTicTacToeWin();
      setScores((s) => ({ ...s, win: s.win + 1 }));
    } else if (result === "O") setScores((s) => ({ ...s, lose: s.lose + 1 }));
    else if (result === "draw") setScores((s) => ({ ...s, draw: s.draw + 1 }));
  }

  function resetBoard() {
    updateBoard(emptyBoard());
  }

  function resetScores() {
    setScores({ win: 0, lose: 0, draw: 0 });
    resetBoard();
  }

  function play(index: number) {
    const current = boardRef.current;
    if (current[index] || getWinner(current)) return;

    // Langkah pemain (X)
    const afterPlayer = [...current];
    afterPlayer[index] = "X";
    updateBoard(afterPlayer);

    const playerResult = getWinner(afterPlayer);
    if (playerResult) {
      recordResult(afterPlayer);
      return;
    }

    // Balasan komputer (O) dengan jeda agar terasa hidup
    setBotThinking(true);
    setTimeout(() => {
      const beforeBot = [...boardRef.current];
      const move = bestMove(beforeBot);
      const afterBot = [...beforeBot];
      if (move >= 0) afterBot[move] = "O";
      updateBoard(afterBot);
      recordResult(afterBot);
      setBotThinking(false);
    }, 400);
  }

  const result = getWinner(board);
  const statusText = result
    ? result === "X"
      ? ui.win
      : result === "O"
        ? ui.lose
        : ui.draw
    : botThinking
      ? `${ui.computer}...`
      : ui.yourTurn;

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Papan skor berjalan */}
      <div className="grid w-full max-w-sm grid-cols-3 gap-2 text-center">
        {[
          {
            label: ui.you,
            value: scores.win,
            color: "text-emerald-700 dark:text-emerald-400",
          },
          {
            label: ui.draw,
            value: scores.draw,
            color: "text-slate-700 dark:text-slate-300",
          },
          {
            label: ui.computer,
            value: scores.lose,
            color: "text-rose-700 dark:text-rose-400",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-white px-2 py-2.5 dark:border-slate-800 dark:bg-slate-900/60"
          >
            <p className={`text-lg font-extrabold ${item.color}`}>
              {item.value}
            </p>
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <p
        aria-live="polite"
        className="text-sm font-semibold text-slate-600 dark:text-slate-400"
      >
        {statusText}
      </p>

      {/* Papan 3x3 */}
      <div className="relative grid w-full max-w-xs grid-cols-3 gap-2 sm:max-w-sm sm:gap-3">
        {board.map((cell, index) => (
          <button
            key={index}
            type="button"
            onClick={() => play(index)}
            disabled={Boolean(cell) || Boolean(result) || botThinking}
            aria-label={`kotak ${index + 1}`}
            className={`aspect-square rounded-2xl border text-4xl font-black transition sm:text-5xl ${
              cell === "X"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400"
                : cell === "O"
                  ? "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-400"
                  : "border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50/50 disabled:hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 disabled:hover:bg-slate-900/60 dark:hover:border-brand-500/30 dark:disabled:hover:bg-slate-900/60"
            }`}
          >
            {cell}
          </button>
        ))}

        {result ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/90 backdrop-blur-sm dark:bg-slate-950/85">
            <p
              className={`text-xl font-extrabold tracking-tight ${
                result === "X"
                  ? "text-emerald-700 dark:text-emerald-400"
                  : result === "O"
                    ? "text-rose-700 dark:text-rose-400"
                    : "text-slate-700 dark:text-slate-300"
              }`}
            >
              {statusText}
            </p>
            <button
              type="button"
              onClick={resetBoard}
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
            >
              <RotateCcw className="size-4" />
              {ui.restart}
            </button>
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={resetScores}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
      >
        <RotateCcw className="size-4" />
        {ui.resetScore}
      </button>
    </div>
  );
}
