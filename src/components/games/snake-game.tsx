"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Pause,
  Play,
  RotateCcw,
  Trophy,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getScores, submitSnakeScore } from "@/lib/scores";

type Point = { x: number; y: number };
type Dir = "up" | "down" | "left" | "right";

const GRID = 15;
const CELL = 30;
const CANVAS = GRID * CELL;

const DIRS: Record<Dir, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE: Record<Dir, Dir> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

type Status = "idle" | "running" | "paused" | "over";
type Ui = Dictionary["games"]["ui"];

export function SnakeGame({ ui }: { ui: Ui }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snakeRef = useRef<Point[]>([]);
  const dirRef = useRef<Dir>("right");
  const pendingDirRef = useRef<Dir>("right");
  const foodRef = useRef<Point>({ x: 10, y: 7 });
  const speedRef = useRef(130);
  const scoreRef = useRef(0);
  const bestRef = useRef(0);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const placeFood = useCallback(() => {
    let next: Point;
    do {
      next = {
        x: Math.floor(Math.random() * GRID),
        y: Math.floor(Math.random() * GRID),
      };
    } while (snakeRef.current.some((s) => s.x === next.x && s.y === next.y));
    foodRef.current = next;
  }, []);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // latar papan
    ctx.fillStyle = "#f0fdf5";
    ctx.fillRect(0, 0, CANVAS, CANVAS);

    // garis grid halus
    ctx.strokeStyle = "#d6efe2";
    ctx.lineWidth = 1;
    for (let i = 1; i < GRID; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL, 0);
      ctx.lineTo(i * CELL, CANVAS);
      ctx.moveTo(0, i * CELL);
      ctx.lineTo(CANVAS, i * CELL);
      ctx.stroke();
    }

    // makanan
    const f = foodRef.current;
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(
      f.x * CELL + CELL / 2,
      f.y * CELL + CELL / 2,
      CELL / 2.6,
      0,
      Math.PI * 2,
    );
    ctx.fill();

    // ular
    snakeRef.current.forEach((seg, i) => {
      const isHead = i === snakeRef.current.length - 1;
      ctx.fillStyle = isHead ? "#065f46" : "#059669";
      const pad = isHead ? 1.5 : 2.5;
      ctx.beginPath();
      ctx.roundRect(
        seg.x * CELL + pad,
        seg.y * CELL + pad,
        CELL - pad * 2,
        CELL - pad * 2,
        6,
      );
      ctx.fill();
    });
  }, []);

  const resetBoard = useCallback(() => {
    snakeRef.current = [
      { x: 5, y: 7 },
      { x: 6, y: 7 },
      { x: 7, y: 7 },
    ];
    dirRef.current = "right";
    pendingDirRef.current = "right";
    speedRef.current = 130;
    scoreRef.current = 0;
    placeFood();
    draw();
  }, [placeFood, draw]);

  const startGame = useCallback(() => {
    resetBoard();
    setScore(0);
    // Muat rekor tersimpan (event-driven)
    const stored = getScores().snake;
    bestRef.current = stored;
    setBest(stored);
    setStatus("running");
  }, [resetBoard]);

  const advance = useCallback(() => {
    dirRef.current = pendingDirRef.current;
    const d = DIRS[dirRef.current];
    const head = snakeRef.current[snakeRef.current.length - 1];
    const next: Point = { x: head.x + d.x, y: head.y + d.y };

    // tabrak dinding / badan sendiri
    const hitWall =
      next.x < 0 || next.y < 0 || next.x >= GRID || next.y >= GRID;
    const hitSelf = snakeRef.current.some(
      (s, i) => i > 0 && s.x === next.x && s.y === next.y,
    );
    if (hitWall || hitSelf) {
      setStatus("over");
      return;
    }

    snakeRef.current.push(next);

    if (next.x === foodRef.current.x && next.y === foodRef.current.y) {
      scoreRef.current += 1;
      const value = scoreRef.current;
      setScore(value);
      speedRef.current = Math.max(70, 130 - value * 4);

      if (value > bestRef.current) {
        bestRef.current = value;
        submitSnakeScore(value);
        setBest(value);
      }

      placeFood();
    } else {
      snakeRef.current.shift();
    }

    draw();
  }, [draw, placeFood]);

  // Loop permainan
  useEffect(() => {
    if (status !== "running") return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      if (cancelled) return;
      advance();
      if (!cancelled && status === "running") {
        timer = setTimeout(step, speedRef.current);
      }
    };

    timer = setTimeout(step, speedRef.current);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Gambar papan awal
  useEffect(() => {
    resetBoard();
  }, [resetBoard]);

  const changeDir = useCallback((dir: Dir) => {
    if (OPPOSITE[dir] === dirRef.current) return;
    pendingDirRef.current = dir;
  }, []);

  // Kontrol keyboard
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        s: "down",
        a: "left",
        d: "right",
        W: "up",
        S: "down",
        A: "left",
        D: "right",
      };
      const dir = map[event.key];
      if (dir) {
        event.preventDefault();
        changeDir(dir);
        if (status === "idle") startGame();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [changeDir, status, startGame]);

  // Kontrol gesek layar
  function handleTouchEnd(event: React.TouchEvent) {
    const start = touchRef.current;
    if (!start) return;
    touchRef.current = null;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      changeDir(dx > 0 ? "right" : "left");
    } else {
      changeDir(dy > 0 ? "down" : "up");
    }
  }

  const overlayVisible = status !== "running";
  const overlayText =
    status === "over"
      ? `${ui.gameOver} - ${ui.score}: ${score}`
      : status === "paused"
        ? ui.pause
        : ui.start;

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Papan skor */}
      <div className="flex w-full max-w-[420px] items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {ui.score}:{" "}
          <span className="font-extrabold text-brand-700 dark:text-brand-400">
            {score}
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <Trophy className="size-4 text-amber-500" />
          {ui.best}:{" "}
          <span className="font-extrabold text-amber-600 dark:text-amber-400">
            {best}
          </span>
        </span>
      </div>

      {/* Papan permainan */}
      <div
        className="relative w-full max-w-[420px] overflow-hidden rounded-3xl border border-slate-200 shadow-sm select-none dark:border-slate-800"
        onTouchStart={(e) => {
          const t = e.touches[0];
          touchRef.current = { x: t.clientX, y: t.clientY };
        }}
        onTouchEnd={handleTouchEnd}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS}
          height={CANVAS}
          className="block h-auto w-full touch-none"
        />

        {overlayVisible ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/85 backdrop-blur-sm dark:bg-slate-950/80">
            <p className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              {overlayText}
            </p>
            {status === "paused" ? (
              <button
                type="button"
                onClick={() => setStatus("running")}
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
              >
                <Play className="size-4" />
                {ui.resume}
              </button>
            ) : (
              <button
                type="button"
                onClick={startGame}
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
              >
                <Play className="size-4" />
                {status === "over" ? ui.restart : ui.start}
              </button>
            )}
          </div>
        ) : null}
      </div>

      {/* Tombol arah (mobile-first, tetap bisa diklik di desktop) */}
      <div className="grid w-fit grid-cols-3 gap-2">
        <span aria-hidden="true" />
        <ArrowButton
          label={ui.up}
          onClick={() => changeDir("up")}
          icon={<ArrowUp className="size-5" />}
        />
        <span aria-hidden="true" />

        <ArrowButton
          label={ui.left}
          onClick={() => changeDir("left")}
          icon={<ArrowLeft className="size-5" />}
        />
        <button
          type="button"
          aria-label={status === "running" ? ui.pause : ui.resume}
          onClick={() =>
            setStatus((prev) =>
              prev === "running" ? "paused" : prev === "paused" ? "running" : prev,
            )
          }
          disabled={status === "idle" || status === "over"}
          className="inline-flex size-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-brand-400 hover:text-brand-600 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-400"
        >
          {status === "running" ? (
            <Pause className="size-5" />
          ) : (
            <Play className="size-5" />
          )}
        </button>
        <ArrowButton
          label={ui.right}
          onClick={() => changeDir("right")}
          icon={<ArrowRight className="size-5" />}
        />

        <span aria-hidden="true" />
        <ArrowButton
          label={ui.down}
          onClick={() => changeDir("down")}
          icon={<ArrowDown className="size-5" />}
        />
        <span aria-hidden="true" />
      </div>

      <button
        type="button"
        onClick={startGame}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
      >
        <RotateCcw className="size-4" />
        {ui.restart}
      </button>
    </div>
  );
}

function ArrowButton({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition active:scale-95 hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-400"
    >
      {icon}
    </button>
  );
}
