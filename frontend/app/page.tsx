import { Background } from "@/components/background";
import { Countdown } from "@/components/countdown";
import { DrawSimulator } from "@/components/draw-simulator";
import { Nav } from "@/components/nav";
import { Panel, TombstonePanel } from "@/components/panels";
import { getState } from "@/lib/state";
import { CURSED_NUMBER } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const state = await getState();
  const dead = state.dead;
  const waiting = !dead && state.draws.length === 0;
  const latest = state.draws[0] ?? null;
  const drawnLabel = latest ? String(latest.drawn).padStart(3, "0") : "—";
  const dayLabel = latest ? `DAY ${String(latest.day).padStart(3, "0")}` : "";
  const deathDayLabel =
    state.deathDay != null ? `DAY ${String(state.deathDay).padStart(3, "0")}` : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cursed Number",
    url: "https://www.cursednumber.com",
    description:
      "An experimental internet project. One number is drawn every day via drand. If the draw ever lands on the cursed number, the signal dies forever.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Background scene="home" />
      <main
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "safe center",
          padding: "var(--pad-page-y) var(--pad-page-x)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "840px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--gap-section)",
            flex: 1,
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(4px, 0.8vw, 10px)",
              width: "100%",
              textAlign: "center",
            }}
          >
            <div
              data-signal
              style={{
                color: dead ? "#C44030" : waiting ? "#5A5A7E" : "#4A3A8A",
                fontSize: "var(--fs-label)",
                letterSpacing: "clamp(1px, 0.4vw, 3px)",
                paddingLeft: "clamp(1px, 0.4vw, 3px)",
                transition: "color 0.5s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(4px, 0.6vw, 8px)",
              }}
            >
              {!dead && !waiting && (
                <span
                  style={{
                    width: "clamp(4px, 0.5vw, 6px)",
                    height: "clamp(4px, 0.5vw, 6px)",
                    borderRadius: "50%",
                    backgroundColor: "#3A6A3A",
                    animation: "signalBlink 2s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                />
              )}
              {dead ? "SIGNAL LOST" : waiting ? "AWAITING FIRST SIGNAL" : "SIGNAL ACTIVE"}
            </div>
            <h1
              style={{
                color: "#E8E0D0",
                fontSize: "var(--fs-hero)",
                letterSpacing: "var(--ls-hero)",
                lineHeight: 1.15,
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              CURSED NUMBER
            </h1>
            <div
              style={{
                color: "#5A5A7E",
                fontSize: "var(--fs-label)",
                letterSpacing: "var(--ls-label)",
              }}
            >
              {dead
                ? "The signal has ended. The archive is locked."
                : "A daily reminder of life's inevitable fragility"}
            </div>
          </div>

          {dead ? (
            <TombstonePanel deathDayLabel={deathDayLabel} />
          ) : waiting ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "stretch",
                gap: "var(--gap-panels)",
                width: "100%",
                maxWidth: "820px",
                marginTop: "clamp(18px, 3vw, 36px)",
              }}
            >
              <Panel
                variant="draw"
                label="FIRST DRAW"
                number="---"
                caption="WAITING FOR SIGNAL"
              />
              <Panel
                variant="cursed"
                label="CURSED NUMBER"
                number={String(CURSED_NUMBER)}
                caption="NOT YET"
              />
            </div>
          ) : process.env.NODE_ENV === "development" ? (
            <DrawSimulator
              initialNumber={drawnLabel}
              initialDay={dayLabel}
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "stretch",
                gap: "var(--gap-panels)",
                width: "100%",
                maxWidth: "820px",
                marginTop: "clamp(18px, 3vw, 36px)",
              }}
            >
              <Panel
                variant="draw"
                label="TODAY'S DRAW"
                number={drawnLabel}
                caption={dayLabel}
              />
              <Panel
                variant="cursed"
                label="CURSED NUMBER"
                number={String(CURSED_NUMBER)}
                caption="NOT YET"
              />
            </div>
          )}

          <div
            style={{
              marginTop: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--gap-section)",
              transition: "opacity 0.5s",
            }}
          >
            {dead ? (
              <div
                style={{
                  color: "#5A5A7E",
                  fontSize: "var(--fs-label)",
                  letterSpacing: "clamp(1px, 0.4vw, 3px)",
                }}
              >
                BROADCAST ENDED
              </div>
            ) : waiting ? null : (
              <div
                data-countdown
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "clamp(6px, 1vw, 10px)",
                  transition: "opacity 0.5s",
                }}
              >
                <div
                  style={{
                    color: "#5A5A7E",
                    fontSize: "var(--fs-label)",
                    letterSpacing: "var(--ls-label)",
                  }}
                >
                  NEXT DRAW
                </div>
                <Countdown />
              </div>
            )}

            <Nav />
          </div>
        </div>
      </main>
    </>
  );
}
