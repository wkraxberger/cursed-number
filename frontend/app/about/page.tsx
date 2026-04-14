import { Background } from "@/components/background";
import { DeadBanner } from "@/components/dead-banner";
import { BackLink, FooterNav } from "@/components/nav";
import {
  BinaryIcon,
  SignalIcon,
  SkullIcon,
} from "@/components/pixel-icons";
import { getState } from "@/lib/state";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const state = await getState();

  return (
    <>
      <Background scene="about" />
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

        {state.dead ? <DeadBanner deathDay={state.deathDay} /> : null}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(10px, 1.6vw, 20px)",
            textAlign: "center",
            width: "100%",
            maxWidth: "760px",
          }}
        >
          <h1
            style={{
              color: "#E8E0D0",
              fontSize: "var(--fs-title)",
              letterSpacing: "var(--ls-hero)",
              lineHeight: 1.15,
              overflowWrap: "break-word",
            }}
          >
            ABOUT
          </h1>
          <div
            style={{
              color: "#E8E0D0",
              fontSize: "var(--fs-label)",
              letterSpacing: "clamp(2px, 0.4vw, 4px)",
              marginTop: "clamp(8px, 1.5vw, 16px)",
            }}
          >
            HOW IT WORKS
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "clamp(12px, 2.2vw, 28px)",
            width: "100%",
            maxWidth: "920px",
          }}
        >
          <StepCard
            number="01"
            Icon={SignalIcon}
            title="THE SIGNAL"
            body="Every day at midnight UTC, a raw signal is captured from atmospheric noise. No human triggers it. No one controls it."
          />
          <StepCard
            number="02"
            Icon={BinaryIcon}
            title="THE DECODE"
            body="The raw signal is decoded and converted into a number between 0 and 999. This is the drawn number for the day. Irreversible."
          />
          <StepCard
            number="03"
            Icon={SkullIcon}
            title="THE END"
            body="The decoded number is compared against the cursed number. If they match, the signal dies. The draws stop forever. No restart. No sequel."
            cursed
          />
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: "clamp(12px, 2vw, 24px)",
            color: "#5A5A7E",
            fontSize: "var(--fs-label)",
            letterSpacing: "var(--ls-label)",
          }}
        >
          Provably fair · Publicly verifiable
        </div>

        <div style={{ marginTop: "auto" }}>
          <FooterNav current="/about" />
        </div>
      </main>
    </>
  );
}

function StepCard({
  number,
  Icon,
  title,
  body,
  cursed,
}: {
  number: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  title: string;
  body: string;
  cursed?: boolean;
}) {
  const borderColor = cursed ? "#A03030" : "#1A1A3A";
  const numberColor = cursed ? "#C44030" : "#2A3060";
  const iconColor = cursed ? "#C44030" : "#6878B0";
  return (
    <div
      style={{
        flex: "1 1 220px",
        minWidth: 0,
        maxWidth: "320px",
        padding: "clamp(16px, 2.2vw, 26px) clamp(14px, 2vw, 22px)",
        borderRadius: "4px",
        border: `1px solid ${borderColor}`,
        backgroundColor: "#0A0A0FCC",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(8px, 1.4vw, 16px)",
      }}
    >
      <div
        style={{
          fontSize: "clamp(18px, 2.5vw, 24px)",
          color: numberColor,
          letterSpacing: "1px",
        }}
      >
        {number}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Icon size={28} color={iconColor} />
      </div>
      <div
        style={{
          color: "#E8E0D0",
          fontSize: "clamp(9px, 1vw, 11px)",
          letterSpacing: "1px",
          textAlign: "center",
        }}
      >
        {title}
      </div>
      <p
        style={{
          color: "#8A8A9E",
          fontSize: "var(--fs-tiny)",
          lineHeight: 1.9,
        }}
      >
        {body}
      </p>
    </div>
  );
}
