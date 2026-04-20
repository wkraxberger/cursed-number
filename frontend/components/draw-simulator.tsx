"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CURSED_PLACEHOLDER } from "@/lib/types";
import { Panel, TombstonePanel } from "@/components/panels";

type Phase =
  | "idle"
  | "rolling"
  | "landed"
  | "matched"       // cursed number landed: freeze moment
  | "flash"         // bright red flash
  | "glitching"     // heavy glitch distortion
  | "shaking"       // violent screen shake
  | "blackout"      // screen goes black
  | "dead";         // tombstone fades in

const SIGNAL_DURATION = 2400;

// The cursed number the simulator uses when [K] is pressed. Dev-only: this
// component is gated behind NODE_ENV and never reaches production, so the
// value here doesn't reveal anything about the real cursed number.
const SIM_CURSED_NUMBER = 666;

export function DrawSimulator({
  initialNumber,
  initialDay,
}: {
  initialNumber: string;
  initialDay: string;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [drawnNumber, setDrawnNumber] = useState(initialNumber);
  const [displayNumber, setDisplayNumber] = useState(initialNumber);
  const [day, setDay] = useState(initialDay);
  const [dayCount, setDayCount] = useState(() => {
    const m = initialDay.match(/\d+/);
    return m ? parseInt(m[0], 10) : 1;
  });
  const [flashCount, setFlashCount] = useState(0);
  const rollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const glitchRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const randomNum = () =>
    String(Math.floor(Math.random() * 1000)).padStart(3, "0");

  // "waiting" = dimmed out, "arriving" = number fading in with flicker
  const [signalStep, setSignalStep] = useState<"off" | "waiting" | "arriving">("off");

  const deathSequence = useCallback(() => {
    // Phase 1: matched — freeze, both panels turn red (1.2s)
    setPhase("matched");

    // Phase 2: flash — bright red strobe (0.8s)
    setTimeout(() => {
      setPhase("flash");
      let count = 0;
      const flashInterval = setInterval(() => {
        count++;
        setFlashCount(count);
        if (count >= 6) clearInterval(flashInterval);
      }, 130);
    }, 1200);

    // Phase 3: glitching — numbers go haywire, text distorts (1.5s)
    setTimeout(() => {
      setPhase("glitching");
      glitchRef.current = setInterval(() => {
        setDisplayNumber(
          Math.random() > 0.3 ? String(SIM_CURSED_NUMBER) : randomNum()
        );
      }, 60);
    }, 2000);

    // Phase 4: shaking — violent shake, both panels pulsing (1.5s)
    setTimeout(() => {
      setPhase("shaking");
      if (glitchRef.current) clearInterval(glitchRef.current);
      setDisplayNumber(String(SIM_CURSED_NUMBER));
    }, 3500);

    // Phase 5: blackout — everything goes dark (1s)
    setTimeout(() => {
      setPhase("blackout");
    }, 5000);

    // Phase 6: dead — tombstone fades in from black
    setTimeout(() => {
      setPhase("dead");
    }, 6200);
  }, []);

  const startDraw = useCallback(
    (cursed: boolean) => {
      if (
        phase === "rolling" ||
        phase === "matched" ||
        phase === "flash" ||
        phase === "glitching" ||
        phase === "shaking" ||
        phase === "blackout"
      )
        return;

      setPhase("rolling");
      setSignalStep("waiting");
      setDisplayNumber("---");

      const drawn = cursed ? String(SIM_CURSED_NUMBER) : randomNum();

      // Step 1: wait (signal traveling) — 3s
      rollRef.current = setTimeout(() => {
        // Step 2: number arrives with flicker
        setSignalStep("arriving");
        setDisplayNumber(drawn);

        // Brief flicker effect
        let flicks = 0;
        const flickerInterval = setInterval(() => {
          flicks++;
          setDisplayNumber(flicks % 2 === 0 ? drawn : "---");
          if (flicks >= 4) {
            clearInterval(flickerInterval);
            setDisplayNumber(drawn);
            setDrawnNumber(drawn);
            setSignalStep("off");
            const newDay = dayCount + 1;
            setDayCount(newDay);
            setDay(`DAY ${String(newDay).padStart(3, "0")}`);

            if (drawn === String(SIM_CURSED_NUMBER)) {
              // Let the number sit for a beat before death kicks in
              setPhase("landed");
              setTimeout(() => deathSequence(), 1500);
            } else {
              setPhase("landed");
              setTimeout(() => setPhase("idle"), 1200);
            }
          }
        }, 120);
      }, 3000);
    },
    [phase, dayCount, deathSequence],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "d" || e.key === "D") startDraw(false);
      if (e.key === "k" || e.key === "K") startDraw(true);
      if (e.key === "r" || e.key === "R") {
        if (glitchRef.current) clearInterval(glitchRef.current);
        setPhase("idle");
        setDrawnNumber(initialNumber);
        setDisplayNumber(initialNumber);
        setDay(initialDay);
        setFlashCount(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [startDraw, initialNumber, initialDay]);

  useEffect(() => {
    return () => {
      if (rollRef.current) clearTimeout(rollRef.current);
      if (glitchRef.current) clearInterval(glitchRef.current);
    };
  }, []);

  const isDead = phase === "dead";
  const isBlackout = phase === "blackout";
  const isShaking = phase === "shaking";
  const isMatched = phase === "matched";
  const isFlash = phase === "flash";
  const isGlitching = phase === "glitching";
  const isRolling = phase === "rolling";
  const isDying = isMatched || isFlash || isGlitching || isShaking;
  const hideFooter = isDying || isBlackout || isDead;

  // overlay opacity varies by phase
  const overlayOpacity = isFlash
    ? flashCount % 2 === 0
      ? 0.6
      : 0.1
    : isGlitching
      ? 0.25
      : isShaking
        ? 0.35
        : isMatched
          ? 0.2
          : isBlackout || isDead
            ? 0
            : 0;

  // blackout overlay
  const blackoutOpacity = isBlackout ? 1 : isDead ? 0 : 0;

  return (
    <>
      {/* Red flash overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          backgroundColor: "#C44030",
          opacity: overlayOpacity,
          transition: isFlash ? "opacity 0.08s" : "opacity 0.4s",
          pointerEvents: "none",
        }}
      />

      {/* Blackout overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: isBlackout || isDead ? 60 : -1,
          backgroundColor: "#000",
          opacity: blackoutOpacity,
          transition: isBlackout
            ? "opacity 0.6s ease-in"
            : "opacity 1.5s ease-out",
          pointerEvents: "none",
        }}
      />

      {/* Scanlines during death */}
      {isDying && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 55,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
            pointerEvents: "none",
            animation: "scanlineScroll 0.3s linear infinite",
          }}
        />
      )}

      {/* Screen shake wrapper */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          animation: isShaking
            ? "violentShake 0.08s infinite"
            : isGlitching
              ? "gentleShake 0.12s infinite"
              : "none",
        }}
      >
        {isDead ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "clamp(10px, 1.6vw, 18px)",
              animation: "tombstoneReveal 2s ease-out",
            }}
          >
            <TombstonePanel deathDayLabel={day} finalNumber={SIM_CURSED_NUMBER} />
          </div>
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
              opacity: isBlackout ? 0 : 1,
              transition: "opacity 0.5s",
            }}
          >
            <Panel
              variant="draw"
              label={isRolling ? "INCOMING SIGNAL" : "TODAY'S DRAW"}
              number={displayNumber}
              caption={isRolling ? "···" : day}
              borderColor={isDying ? "#C44030" : isRolling ? "#3A4A7A" : undefined}
              labelColor={isDying ? "#C44030" : isRolling ? "#6878B0" : undefined}
              numberColor={isDying ? "#C44030" : isRolling ? "#5A6A9E" : undefined}
              style={{
                animation: isDying ? "pulseRedHard 0.4s infinite" : "none",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
            />
            <Panel
              variant="cursed"
              label="CURSED NUMBER"
              number={isDying ? String(SIM_CURSED_NUMBER) : CURSED_PLACEHOLDER}
              caption={
                isDying
                  ? isShaking
                    ? "SIGNAL LOST"
                    : "MATCHED"
                  : "NOT YET"
              }
              borderColor={isDying ? "#C44030" : undefined}
              labelColor={isDying ? "#C44030" : undefined}
              captionColor={isDying ? "#C44030" : undefined}
              style={{
                animation: isDying ? "pulseRedHard 0.4s infinite" : "none",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
            />
          </div>
        )}
      </div>

      {/* Hide countdown during death, keep nav visible */}
      {hideFooter && (
        <style>{`
          [data-countdown] {
            opacity: 0 !important;
            pointer-events: none;
            transition: opacity 0.5s;
          }
        `}</style>
      )}

      {/* Override signal text during death */}
      {(isDying || isBlackout || isDead) && (
        <style>{`
          [data-signal] {
            visibility: hidden;
            position: relative;
          }
          [data-signal]::after {
            content: "SIGNAL LOST";
            visibility: visible;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: var(--fs-label);
            letter-spacing: clamp(1px, 0.4vw, 3px);
            color: #C44030;
            white-space: nowrap;
            ${isGlitching ? "animation: hardGlitch 0.2s infinite;" : ""}
          }
        `}</style>
      )}

      <style>{`
        @keyframes violentShake {
          0%   { transform: translate(0, 0) rotate(0deg); }
          20%  { transform: translate(-6px, 3px) rotate(-0.5deg); }
          40%  { transform: translate(5px, -4px) rotate(0.5deg); }
          60%  { transform: translate(-4px, -2px) rotate(-0.3deg); }
          80%  { transform: translate(6px, 2px) rotate(0.4deg); }
          100% { transform: translate(-2px, -3px) rotate(0deg); }
        }
        @keyframes gentleShake {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(-2px, 1px); }
          50%  { transform: translate(2px, -1px); }
          75%  { transform: translate(-1px, -1px); }
          100% { transform: translate(1px, 1px); }
        }
        @keyframes tombstoneReveal {
          0%   { opacity: 0; transform: scale(0.9); filter: blur(4px); }
          40%  { opacity: 0; transform: scale(0.9); filter: blur(4px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0px); }
        }
        @keyframes hardGlitch {
          0%   { transform: translateX(0) skewX(0deg); opacity: 1; }
          10%  { transform: translateX(-8px) skewX(-3deg); opacity: 0.8; }
          15%  { transform: translateX(6px) skewX(2deg); opacity: 1; }
          20%  { transform: translateX(-3px) skewX(0deg); opacity: 0.6; }
          30%  { transform: translateX(10px) skewX(-4deg); opacity: 0.9; clip-path: inset(20% 0 30% 0); }
          40%  { transform: translateX(-5px) skewX(1deg); opacity: 1; clip-path: none; }
          50%  { transform: translateX(0) skewX(0deg); opacity: 0.7; }
          60%  { transform: translateX(7px) skewX(-2deg); opacity: 1; clip-path: inset(40% 0 10% 0); }
          70%  { transform: translateX(-4px) skewX(3deg); opacity: 0.5; clip-path: none; }
          80%  { transform: translateX(2px) skewX(0deg); opacity: 1; }
          90%  { transform: translateX(-6px) skewX(-1deg); opacity: 0.8; }
          100% { transform: translateX(0) skewX(0deg); opacity: 1; }
        }
        @keyframes pulseRedHard {
          0%, 100% { border-color: #C44030; box-shadow: 0 0 10px #C4403033; }
          50% { border-color: #FF4030; box-shadow: 0 0 40px #C4403066, 0 0 80px #C4403022; }
        }
        @keyframes scanlineScroll {
          from { background-position: 0 0; }
          to   { background-position: 0 4px; }
        }
        @keyframes numberPulse {
          0%, 100% { text-shadow: 0 0 10px #C44030; }
          50% { text-shadow: 0 0 30px #C44030, 0 0 60px #C4403066; }
        }
      `}</style>
    </>
  );
}

