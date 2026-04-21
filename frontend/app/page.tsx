import { Background } from "@/components/background";
import { Countdown } from "@/components/countdown";
import { DrawSimulator } from "@/components/draw-simulator";
import { Nav } from "@/components/nav";
import { Panel, TombstonePanel } from "@/components/panels";
import { getState } from "@/lib/state";
import { CURSED_PLACEHOLDER } from "@/lib/types";

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

  const SITE_URL = "https://www.cursednumber.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Cursed Number",
        url: SITE_URL,
        description:
          "An experimental internet project. One number is drawn every day via drand. If the draw ever lands on the cursed number, the signal dies forever.",
        publisher: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
      },
      {
        "@type": "CreativeWork",
        "@id": `${SITE_URL}/#creativework`,
        name: "Cursed Number",
        url: SITE_URL,
        description:
          "A daily internet experiment. One number is drawn daily from drand, a public verifiable randomness beacon. If it ever matches the cursed number, the signal dies forever and the site becomes a tombstone. A verifiable memento mori.",
        genre: ["internet art", "memento mori", "generative project"],
        keywords:
          "cursed number, cursed numbers, drand, randomness beacon, memento mori, art project",
        author: { "@id": `${SITE_URL}/#person` },
        creator: { "@id": `${SITE_URL}/#person` },
        isAccessibleForFree: true,
        license: "https://opensource.org/licenses/MIT",
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Walter Kraxberger",
        url: "https://github.com/wkraxberger",
      },
    ],
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
        <p
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          Cursed Number is a daily internet experiment. Every day, a single number between 000 and 999 is drawn from the drand randomness beacon. One of those numbers is cursed. If the daily draw ever matches the cursed number, the signal dies forever and the site becomes a tombstone. A slow, verifiable memento mori.
        </p>
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
                : "One draw per day. One chance to die."}
            </div>
          </div>

          {dead ? (
            <TombstonePanel
              deathDayLabel={deathDayLabel}
              finalNumber={latest ? String(latest.drawn).padStart(3, "0") : undefined}
            />
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
                number={CURSED_PLACEHOLDER}
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
                number={CURSED_PLACEHOLDER}
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
