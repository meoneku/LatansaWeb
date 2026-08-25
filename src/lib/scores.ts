/**
 * Skor game terpusat berbasis localStorage - tanpa database.
 * Struktur: { snake: number; memory: number|null; tictactoe: number }
 */

const KEY = "latansa-game-scores";
const LEGACY_SNAKE_KEY = "latansa-snake-best";

export type GameScores = {
  snake: number;
  memory: number | null; // jumlah langkah terbaik (makin kecil makin baik)
  tictactoe: number;
};

function read(): GameScores {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as GameScores;
    // migrasi dari key lama Snake
    const legacy = Number(localStorage.getItem(LEGACY_SNAKE_KEY) ?? "0");
    if (legacy > 0) {
      const migrated: GameScores = { snake: legacy, memory: null, tictactoe: 0 };
      write(migrated);
      return migrated;
    }
  } catch {
    /* abaikan */
  }
  return { snake: 0, memory: null, tictactoe: 0 };
}

function write(scores: GameScores) {
  try {
    localStorage.setItem(KEY, JSON.stringify(scores));
  } catch {
    /* abaikan */
  }
}

export function getScores(): GameScores {
  return read();
}

export function submitSnakeScore(score: number): boolean {
  const scores = read();
  if (score > scores.snake) {
    write({ ...scores, snake: score });
    return true; // rekor baru
  }
  return false;
}

/** true bila mencetak rekor langkah terbaik */
export function submitMemoryScore(moves: number): boolean {
  const scores = read();
  if (scores.memory === null || moves < scores.memory) {
    write({ ...scores, memory: moves });
    return true;
  }
  return false;
}

export function addTicTacToeWin() {
  const scores = read();
  write({ ...scores, tictactoe: scores.tictactoe + 1 });
}
