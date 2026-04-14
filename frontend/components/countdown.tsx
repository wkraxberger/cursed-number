"use client";

import { useEffect, useState } from "react";
import { formatCountdown, msUntilNextMidnightUTC } from "@/lib/time";

/**
 * Live countdown to midnight UTC. Rendered client-side so it ticks every
 * second without forcing the parent page to be a client component.
 */
export function Countdown() {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setMs(msUntilNextMidnightUTC());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      suppressHydrationWarning
      style={{
        color: "#6878B0",
        fontSize: "var(--fs-count)",
        letterSpacing: "clamp(1px, 0.3vw, 3px)",
      }}
    >
      {ms == null ? "--:--:--" : formatCountdown(ms)}
    </span>
  );
}
