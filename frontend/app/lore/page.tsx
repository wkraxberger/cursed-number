import type { Metadata } from "next";
import { Background } from "@/components/background";
import { DeadBanner } from "@/components/dead-banner";
import { BackLink, FooterNav } from "@/components/nav";
import { getState } from "@/lib/state";

export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: "Cursed Numbers Through History · Cursed Number" },
  description:
    "A brief history of cursed numbers across cultures. 666, 13, 4, 17, 23, 27, Sadako's number, 0. The numbers humans have feared for centuries, and why.",
  keywords: [
    "cursed numbers",
    "cursed number",
    "666",
    "unlucky 13",
    "tetraphobia",
    "triskaidekaphobia",
    "number of the beast",
    "sadako's number",
    "number superstitions",
    "history of cursed numbers",
  ],
  alternates: { canonical: "/lore" },
};

type Entry = {
  number: string;
  title: string;
  source: string;
  body: string;
  accent?: "red" | "violet";
};

const entries: Entry[] = [
  {
    number: "666",
    title: "THE BEAST",
    source: "MEDITERRANEAN · 1ST CENTURY",
    accent: "red",
    body:
      "The number appears once, in a single verse of the Book of Revelation, in a passage that tells the reader to calculate the name of a beast. For two thousand years people have tried. Scholars have matched it to Nero, to Caligula, to popes, to kings, to computer systems. None of the answers have held. The number itself has outlived every name assigned to it. Written on walls, tattooed on enemies, carved into the margins of medieval manuscripts as a warning. Three hundred generations have feared the same three digits, and still no one knows who they name.",
  },
  {
    number: "13",
    title: "THE THIRTEENTH GUEST",
    source: "EUROPE · 1ST CENTURY ONWARDS",
    body:
      "In an old Norse story, the god Loki arrives uninvited at a feast of twelve. Before morning, the brightest of the twelve is dead. At the Last Supper, thirteen sat at the table. One of them was Judas. Most tall buildings still do not number a thirteenth floor. Most airlines skip row 13. The practice is older than the buildings and older than the airlines. It is older than the people who still follow it, and nobody remembers exactly why they do.",
  },
  {
    number: "04",
    title: "DEATH",
    source: "EAST ASIA · ANCIENT TO PRESENT",
    body:
      "In Mandarin, Cantonese, Japanese, and Korean, the word for four and the word for death sound nearly identical. Elevators skip from three to five. Hospital wards leave rooms unnumbered where four would fall. A house with a four in the address sells for less. The avoidance has a name, tetraphobia, and in much of East Asia it is not treated as superstition but as ordinary prudence. There are apartment towers in Hong Kong with no fourth floor, no fourteenth, no twenty-fourth, no thirty-fourth. A thirty-seven story building that claims only twenty-one floors.",
  },
  {
    number: "17",
    title: "VIXI",
    source: "ITALY · 1ST CENTURY ONWARDS",
    body:
      "In Roman numerals, seventeen writes as XVII. The same four letters, rearranged, spell VIXI, a Latin verb carved on Roman tombs. It means I have lived. It means I am dead. Italian hotels omit room 17. Alitalia planes have no row 17. Renault sold the same car model everywhere else as R17, but in Italy it was rebadged to avoid the number. The dead have been speaking through those four letters for two thousand years, and people are still listening.",
  },
  {
    number: "23",
    title: "THE ENIGMA",
    source: "ANGLO-AMERICAN · 20TH CENTURY",
    body:
      "The number William S. Burroughs claimed to see everywhere after a sea captain named Clark died on a day it kept appearing. The number Robert Anton Wilson built a fiction around. The Discordians hold it sacred. If you start looking for 23 in your life you will find it, and then you will find more of it, and then you will find it impossible to stop looking. Several people have gone quietly mad this way. The pattern is not in the world. It is in the act of looking.",
  },
  {
    number: "27",
    title: "THE CLUB",
    source: "ANGLO-AMERICAN · 20TH CENTURY",
    body:
      "A list of musicians who died at the age of twenty-seven. Brian Jones. Jimi Hendrix. Janis Joplin. Jim Morrison. Kurt Cobain. Amy Winehouse. The list is longer than those names and it continues to grow. Statisticians have shown that the number is not unusual, that musicians die at other ages too, that the pattern is an illusion built from selection. The list keeps growing anyway.",
  },
  {
    number: "090-4444-4444",
    title: "SADAKO'S NUMBER",
    source: "JAPAN · 2000s",
    body:
      "A Japanese mobile number said to carry the voice of a drowned girl. Those who answered, according to the legend, heard her speak, and those who heard her speak were said to follow within a week. The number has appeared in films, in message-board threads, in late-night phone-ins. The line has been disconnected for many years. People still call it. Some of them call it more than once.",
  },
  {
    number: "000",
    title: "THE VOID",
    source: "EUROPE · 12TH CENTURY",
    accent: "violet",
    body:
      "The number that represented nothing. When Arab mathematicians brought it to Europe in the twelfth century, it was received as heresy. A symbol for absence was taken to mean the absence of God. The city of Florence banned its use in 1299. The ban was ignored by merchants, enforced against philosophers, and quietly outlived the century. The void was kept out of daylight for another hundred years. It has since swallowed every equation we have.",
  },
];

const SITE_URL = "https://www.cursednumber.com";

export default async function LorePage() {
  const state = await getState();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cursed Numbers Through History",
        item: `${SITE_URL}/lore`,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Cursed Numbers Through History",
    description:
      "A brief history of cursed numbers across cultures. 666, 13, 4, 17, 23, 27, Sadako's number, 0.",
    author: { "@type": "Person", name: "Walter Kraxberger" },
    publisher: { "@type": "Organization", name: "Cursed Number" },
    mainEntityOfPage: `${SITE_URL}/lore`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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
          LORE
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
          A BRIEF HISTORY OF CURSED NUMBERS
        </p>

        <div
          style={{
            width: "100%",
            maxWidth: "760px",
            marginTop: "clamp(4px, 1vw, 16px)",
            border: "1px solid #1A1A3A",
            borderRadius: "4px",
            backgroundColor: "#0A0A0F80",
          }}
        >
          <div
            className="pixel-scroll"
            style={{
              maxHeight: state.dead
                ? "clamp(260px, 46vh, 400px)"
                : "clamp(320px, 55vh, 460px)",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                padding: "clamp(14px, 2vw, 22px) clamp(14px, 2vw, 24px)",
                borderBottom: "1px solid #1A1A3A",
              }}
            >
              <p
                style={{
                  color: "#8A8A9E",
                  fontSize: "var(--fs-tiny)",
                  lineHeight: 1.9,
                }}
              >
                Every culture inscribes at least one. A number no one says
                aloud without flinching, passed down in whispers, blamed for
                coincidences. These are the old ones. The ones that have
                frightened people for centuries, and still do.
              </p>
            </div>

            {entries.map((entry, i) => (
              <EntryBlock key={entry.number + i} entry={entry} />
            ))}

            <div
              style={{
                padding: "clamp(14px, 2vw, 22px) clamp(14px, 2vw, 24px)",
                borderTop: "1px solid #1A1A3A",
              }}
            >
              <p
                style={{
                  color: "#8A8A9E",
                  fontSize: "var(--fs-tiny)",
                  lineHeight: 1.9,
                }}
              >
                Every age adds a number. Some are written into scripture, some
                into phone directories, some into the grief of a single
                family. This site inscribes one more. We have not been told
                which one it is. We will find out on the day it is spoken.
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "auto" }}>
          <FooterNav current="/lore" />
        </div>
      </main>
    </>
  );
}

function EntryBlock({ entry }: { entry: Entry }) {
  const numberColor =
    entry.accent === "red"
      ? "#C44030"
      : entry.accent === "violet"
      ? "#6878B0"
      : "#E8E0D0";

  return (
    <article
      style={{
        padding: "clamp(18px, 2.4vw, 28px) clamp(14px, 2vw, 24px)",
        borderBottom: "1px solid #1A1A3A",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(10px, 1.4vw, 16px)",
      }}
    >
      <div
        style={{
          color: numberColor,
          fontSize: "var(--fs-title)",
          letterSpacing: "var(--ls-hero)",
          lineHeight: 1.05,
          overflowWrap: "break-word",
          wordBreak: "break-word",
        }}
      >
        {entry.number}
      </div>
      <h2
        style={{
          color: "#E8E0D0",
          fontSize: "var(--fs-label)",
          letterSpacing: "clamp(2px, 0.4vw, 4px)",
          margin: 0,
          fontWeight: "normal",
        }}
      >
        {entry.title}
      </h2>
      <div
        style={{
          color: "#5A5A7E",
          fontSize: "var(--fs-nano)",
          letterSpacing: "1.2px",
        }}
      >
        {entry.source}
      </div>
      <p
        style={{
          color: "#8A8A9E",
          fontSize: "var(--fs-tiny)",
          lineHeight: 1.9,
          marginTop: "clamp(6px, 1vw, 10px)",
        }}
      >
        {entry.body}
      </p>
    </article>
  );
}
