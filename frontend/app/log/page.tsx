import type { Metadata } from "next";
import { Background } from "@/components/background";
import { DeadBanner } from "@/components/dead-banner";
import { BackLink, FooterNav } from "@/components/nav";
import { getState } from "@/lib/state";
import type { Draw } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Log",
  description:
    "Complete draw history. Every number drawn, every day, cryptographically verifiable via its drand round and hash.",
  alternates: { canonical: "/log" },
};

// Fixed-pixel grid for the row layout. On narrow viewports the wrapping
// container scrolls horizontally so the pixel font never squashes.
const GRID_COLS = "56px 96px 64px 96px 140px 1fr";
const MIN_TABLE_WIDTH = "720px";

export default async function LogPage() {
  const state = await getState();
  const draws = state.draws;
  const dead = state.dead;
  const deathDay = state.deathDay;

  return (
    <>
      <Background scene="log" />
      <main
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "var(--pad-page-y) var(--pad-page-x)",
          gap: "clamp(6px, 1.2vw, 16px)",
        }}
      >
        <div style={{ alignSelf: "flex-start" }}>
          <BackLink />
        </div>

        {dead ? <DeadBanner deathDay={state.deathDay} /> : null}

        <h1
          style={{
            color: "#E8E0D0",
            fontSize: "var(--fs-title)",
            letterSpacing: "var(--ls-hero)",
            lineHeight: 1.15,
            textAlign: "center",
            overflowWrap: "break-word",
            marginTop: dead ? undefined : "clamp(-10px, -1.5vw, -4px)",
          }}
        >
          LOG
        </h1>
        <p
          style={{
            color: "#8A8A9E",
            fontSize: "var(--fs-label)",
            letterSpacing: "1px",
            marginTop: "-10px",
          }}
        >
          {dead
            ? "Final broadcast logged. Every draw recorded."
            : "Broadcast history. Every draw recorded."}
        </p>

        <div
          className="pixel-scroll"
          style={{
            width: "100%",
            maxWidth: "960px",
            overflowX: "auto",
            border: "1px solid #1A1A3A",
            borderRadius: "4px",
            backgroundColor: "#0A0A0FCC",
          }}
        >
          <div style={{ minWidth: MIN_TABLE_WIDTH }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: GRID_COLS,
                padding: "10px 14px",
                backgroundColor: "#0E1029",
                borderBottom: "1px solid #1A1A3A",
                color: "#5A5A7E",
                fontSize: "var(--fs-nano)",
                letterSpacing: "1.5px",
              }}
            >
              <span>DAY</span>
              <span>ROUND</span>
              <span>DRAWN</span>
              <span>STATUS</span>
              <span>OBS</span>
              <span>HASH</span>
            </div>
            <div
              className="pixel-scroll"
              style={{ maxHeight: "340px", overflowY: "auto" }}
            >
              {draws.map((d, i) => (
                <LogRow
                  key={d.day}
                  draw={d}
                  isLast={i === draws.length - 1}
                  cursed={dead && deathDay === d.day}
                />
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: "auto" }}>
          <FooterNav current="/log" />
        </div>
      </main>
    </>
  );
}

function LogRow({
  draw,
  isLast,
  cursed,
}: {
  draw: Draw;
  isLast: boolean;
  cursed: boolean;
}) {
  const drawnColor = cursed ? "#C44030" : "#E8E0D0";
  const statusColor = cursed ? "#C44030" : "#6878B0";
  const statusText = cursed ? "CURSED" : "SURVIVED";
  const obsColor = cursed ? "#C44030" : "#5A5A7E";
  const obsText = cursed ? "▲ SIGNAL LOST" : "—";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: GRID_COLS,
        padding: "12px 14px",
        borderBottom: isLast ? "none" : "1px solid #1A1A3A",
        backgroundColor: cursed ? "#1A0A0F" : "transparent",
        color: "#E8E0D0",
        fontSize: "var(--fs-nano)",
        letterSpacing: "1px",
        alignItems: "center",
      }}
    >
      <span>{String(draw.day).padStart(3, "0")}</span>
      <span>{draw.round.toLocaleString()}</span>
      <span style={{ color: drawnColor }}>
        {String(draw.drawn).padStart(3, "0")}
      </span>
      <span style={{ color: statusColor }}>{statusText}</span>
      <span style={{ color: obsColor }}>{obsText}</span>
      <span
        style={{
          color: cursed ? "#A03030" : "#5A5A7E",
          fontSize: "calc(var(--fs-nano) - 1px)",
        }}
      >
        {draw.hash}
      </span>
    </div>
  );
}
