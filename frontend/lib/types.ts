export const CURSED_NUMBER = 666;

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
