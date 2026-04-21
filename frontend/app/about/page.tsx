import type { Metadata } from "next";
import { Background } from "@/components/background";
import { DeadBanner } from "@/components/dead-banner";
import { BackLink, FooterNav } from "@/components/nav";
import {
  BinaryIcon,
  SignalIcon,
  SkullIcon,
} from "@/components/pixel-icons";
import { getState } from "@/lib/state";

export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: "How the Cursed Number Is Drawn · Cursed Number" },
  description:
    "How Cursed Number works: one number drawn daily via drand's public randomness beacon, compared to the cursed number, and if they match the signal dies forever.",
  alternates: { canonical: "/about" },
};

const SITE_URL = "https://www.cursednumber.com";

export default async function AboutPage() {
  const state = await getState();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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

        <h1
          style={{
            color: "#E8E0D0",
            fontSize: "var(--fs-title)",
            letterSpacing: "var(--ls-hero)",
            lineHeight: 1.15,
            textAlign: "center",
            overflowWrap: "break-word",
            marginTop: state.dead ? undefined : "clamp(-10px, -1.5vw, -4px)",
          }}
        >
          ABOUT
        </h1>
        <p
          style={{
            color: "#E8E0D0",
            fontSize: "var(--fs-label)",
            letterSpacing: "clamp(2px, 0.4vw, 4px)",
            marginTop: "clamp(4px, 1vw, 12px)",
            textAlign: "center",
          }}
        >
          HOW THE BEACON SPEAKS
        </p>

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
            body="At midnight UTC, the beacon speaks. A raw signal rises from drand, a rite of unseen machines scattered across the world. No one can predict it. No one can fake it."
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
