import type { Metadata } from "next";
import { Background } from "@/components/background";
import { DeadBanner } from "@/components/dead-banner";
import { BackLink, FooterNav } from "@/components/nav";
import { getState } from "@/lib/state";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Cursed Number: how the number is drawn, the odds, what happens when the cursed number is drawn, and how the secret ending works.",
  alternates: { canonical: "/faq" },
};

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is Cursed Number?",
    a: "An experimental internet project. One number is drawn every day. If the draw ever lands on the cursed number, the signal dies forever. A daily reminder of life's inevitable fragility.",
  },
  {
    q: "How is the number drawn?",
    a: (
      <>
        Powered by{" "}
        <a href="https://drand.love" target="_blank" rel="noreferrer" style={{ color: "#6878B0", textDecoration: "underline" }}>
          drand
        </a>
        , a public verifiable randomness beacon supported by the League of Entropy. Each draw uses a cryptographic randomness round that no one can predict or manipulate.
      </>
    ),
  },
  {
    q: "Can anyone control the outcome?",
    a: "No. The randomness is publicly verifiable and cryptographically secure. Every draw is logged with its hash. Anyone can audit any past result.",
  },
  {
    q: "What are the odds?",
    a: "Each day a number between 0 and 999 is drawn. One of those numbers is the cursed number. That gives a 1 in 1,000 chance every day. Draws happen at midnight UTC.",
  },
  {
    q: "What happens if the cursed number is drawn?",
    a: "The draws stop forever. No restart, no sequel, no second chance. The site stays up as a memorial: you can still browse the archive and verify every past draw, but the signal is dead.",
  },
  {
    q: "Is the ending fixed?",
    a: "No. If the cursed number is drawn, there is a 95% chance of getting the regular ending, but a 5% chance of triggering a much stranger one. The ending is selected by verifiable random criteria. Once chosen, the bucket containing the ending that didn't happen is permanently deleted. There is no backup, no one will ever know what it looked like.",
  },
  {
    q: "Is this open source?",
    a: (
      <>
        Yes. The full source code is available on{" "}
        <a href="https://github.com/wkraxberger/cursed-number" target="_blank" rel="noreferrer" style={{ color: "#6878B0", textDecoration: "underline" }}>
          GitHub
        </a>
        . You can verify the draw logic, audit the randomness, and inspect every line.
      </>
    ),
  },
  {
    q: "How are the death visuals kept secret?",
    a: "The images and assets for the death state are stored in a separate, sealed bucket. They are not part of the build, not in the GitHub repo, and no one can access them until the cursed number is drawn.",
  },
];

export default async function FaqPage() {
  const state = await getState();

  return (
    <>
      <Background scene="faq" />
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
          FAQ
        </h1>

        <div
          style={{
            width: "100%",
            maxWidth: "760px",
            marginTop: "clamp(4px, 1vw, 16px)",
            border: "1px solid #1A1A3A",
            borderRadius: "4px",
            backgroundColor: "#0A0A0FCC",
          }}
        >
          <div
            className="pixel-scroll"
            style={{ maxHeight: "340px", overflowY: "auto" }}
          >
            {faqs.map((item, i) => (
              <div
                key={item.q}
                style={{
                  padding: "clamp(14px, 2vw, 22px) clamp(14px, 2vw, 24px)",
                  borderBottom:
                    i < faqs.length - 1 ? "1px solid #1A1A3A" : "none",
                }}
              >
                <div
                  style={{
                    color: "#E8E0D0",
                    fontSize: "clamp(9px, 1vw, 12px)",
                    letterSpacing: "1px",
                    marginBottom: "clamp(8px, 1.2vw, 14px)",
                  }}
                >
                  {item.q}
                </div>
                <p
                  style={{
                    color: "#8A8A9E",
                    fontSize: "var(--fs-tiny)",
                    lineHeight: 1.9,
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "auto" }}>
          <FooterNav current="/faq" />
        </div>
      </main>
    </>
  );
}
