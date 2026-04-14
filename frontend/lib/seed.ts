import type { Draw } from "./types";

// Deterministic pseudo-draws so the log page always has history to show.
// Not meant to be cryptographically meaningful — the real draws will come
// from drand and be appended to a persistent store in production.

function pseudoRandom(seed: number): number {
  // Simple LCG so the seed is stable across renders.
  const a = 1664525;
  const c = 1013904223;
  const m = 2 ** 32;
  return (Math.imul(seed, a) + c) % m;
}

function hexFromSeed(seed: number, len = 10): string {
  // Mask to unsigned 32-bit before hex-encoding — `toString(16)` on a
  // negative number prepends "-", which shows up as a dash in the log.
  let s = "";
  let cur = seed;
  while (s.length < len) {
    cur = pseudoRandom(cur);
    s += (cur >>> 0).toString(16).padStart(8, "0");
  }
  return s.slice(0, len);
}

const closeCalls = new Set([41, 45]);
const startDay = 1;
const endDay = 47;
// Rounds increment roughly 2880/day on drand's 30s cadence; start at a plausible offset.
const baseRound = 4_664_257;
const baseDate = Date.UTC(2025, 8, 25); // 2025-09-25

export const seedDraws: Draw[] = Array.from(
  { length: endDay - startDay + 1 },
  (_, i) => {
    const day = endDay - i; // newest first
    const idx = day - startDay;
    let drawn: number;
    if (closeCalls.has(day)) {
      // Close call: within 10 of the cursed number.
      drawn = day === 45 ? 662 : 669;
    } else {
      // JS `%` preserves the sign of the dividend; ensure non-negative.
      drawn = ((pseudoRandom(idx * 97 + 13) % 1000) + 1000) % 1000;
    }
    const round = baseRound + idx * 2880;
    const hash = hexFromSeed(idx * 31 + 7);
    const timestamp = new Date(baseDate + idx * 86_400_000).toISOString();
    return { day, round, drawn, hash, timestamp };
  },
);
