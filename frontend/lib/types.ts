// What we show instead of the actual cursed number. Only the backend knows
// the real one: if a draw matches, it flips "dead" and we find out then.
export const CURSED_PLACEHOLDER = "???";

export type Draw = {
  day: number;
  round: number;
  drawn: number;
  hash: string;
  timestamp: string; // ISO date
};

export type SiteState = {
  dead: boolean;
  deathDay: number | null;
  draws: Draw[];
};
