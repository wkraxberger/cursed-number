import type { Draw, SiteState } from "./types";
import { seedDraws } from "./seed";

// This app is a read-only front-end. Elsewhere in the architecture, a
// scheduled AWS Lambda:
//   1. Pulls the latest round from the drand public beacon.
//   2. Converts the randomness to a number in [0, 999].
//   3. Writes the resulting Draw to DynamoDB.
//   4. Compares against the real cursed number (kept only on the backend)
//      and flips the `dead` flag in DynamoDB when it matches.
//
// A separate read API (typically API Gateway fronting a small Lambda that
// queries DynamoDB) exposes the current state as JSON. This module hits
// that endpoint server-side from React Server Components and returns the
// shape the pages expect.
//
// Environment variables
// ---------------------
// CURSED_API_BASE_URL  Base URL of the read API, e.g. https://api.example.com
//                      The module will GET `${CURSED_API_BASE_URL}/state`.
// CURSED_FORCE_DEAD    Set to "1" to short-circuit to a synthetic memorial
//                      state (useful in dev / preview).
//
// When CURSED_API_BASE_URL is not set the module falls back to the
// deterministic seed data in lib/seed.ts so pages still render during local
// development without any backend running.

const API_BASE = process.env.CURSED_API_BASE_URL?.replace(/\/+$/, "") ?? "";
const FORCE_DEAD = process.env.CURSED_FORCE_DEAD === "1";
const FORCE_WAITING = process.env.CURSED_FORCE_WAITING === "1";

/**
 * Shape returned by GET ${CURSED_API_BASE_URL}/state.
 *
 * The backend is expected to return the complete site state in a single
 * call. 47 draws at ~120 bytes each is well under 10 KB, and the payload is
 * cached by CloudFront (or whatever CDN fronts the read API), so the cost
 * of asking for "everything" is negligible.
 */
type ApiState = {
  dead: boolean;
  deathDay: number | null;
  draws: Draw[];
};

// Used only by the CURSED_FORCE_DEAD dev/preview flag to synthesize a plausible
// memorial state. Not the real cursed number.
const FORCE_DEAD_PLACEHOLDER_NUMBER = 0;

function synthesizeDeadState(): SiteState {
  const base = [...seedDraws];
  const latest = base[0];
  const cursedDay = (latest?.day ?? 0) + 1;
  const cursedRound = (latest?.round ?? 4_000_000) + 2880;
  const cursed: Draw = {
    day: cursedDay,
    round: cursedRound,
    drawn: FORCE_DEAD_PLACEHOLDER_NUMBER,
    hash: "deadc0ded0",
    timestamp: new Date().toISOString(),
  };
  return { dead: true, deathDay: cursedDay, draws: [cursed, ...base] };
}

function seedFallback(): SiteState {
  if (FORCE_DEAD) return synthesizeDeadState();
  if (FORCE_WAITING) return { dead: false, deathDay: null, draws: [] };
  // In development, show the seed data so pages have something to render.
  // In production, show the "awaiting first signal" state until the backend
  // is wired up (CURSED_API_BASE_URL set).
  if (process.env.NODE_ENV === "development") {
    return { dead: false, deathDay: null, draws: [...seedDraws] };
  }
  return { dead: false, deathDay: null, draws: [] };
}

function normalizeState(raw: unknown): SiteState {
  if (!raw || typeof raw !== "object") return seedFallback();
  const r = raw as Partial<ApiState>;
  return {
    dead: Boolean(r.dead),
    deathDay: typeof r.deathDay === "number" ? r.deathDay : null,
    draws: Array.isArray(r.draws) ? r.draws : [],
  };
}

/**
 * Fetch the current site state from the read API.
 *
 * - Always returns a `SiteState`, never throws into the page — if the API
 *   is unreachable or returns a bad payload we log and fall back to seed
 *   data so the UI stays up.
 * - Uses `cache: "no-store"` so stale memorial state can never be shown.
 *   If you want caching, configure CDN caching on the API itself and drop
 *   this line so Next can pick up the CDN TTL.
 */
export async function getState(): Promise<SiteState> {
  if (FORCE_DEAD) return synthesizeDeadState();
  if (FORCE_WAITING) return { dead: false, deathDay: null, draws: [] };
  if (!API_BASE) return seedFallback();

  try {
    const res = await fetch(`${API_BASE}/state`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`GET /state → ${res.status} ${res.statusText}`);
    }
    const body = await res.json();
    return normalizeState(body);
  } catch (err) {
    console.error("[cursed-number] getState failed, using seed fallback:", err);
    return seedFallback();
  }
}

/** Convenience helper for pages that only need the newest draw. */
export async function getLatestDraw(): Promise<Draw | null> {
  const state = await getState();
  return state.draws[0] ?? null;
}
