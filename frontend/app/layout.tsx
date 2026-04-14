import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Self-host the pixel font so it ships with the first response. Without
// this, the browser lays out titles using a fallback monospace font (which
// is narrower than Press Start 2P); once the webfont arrives it gets
// swapped in and the text overflows the container. next/font makes the
// font available synchronously at SSR time, so the first layout is correct.
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pixel",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cursednumber.com";
const SITE_NAME = "Cursed Number";
const SITE_DESCRIPTION =
  "One number is drawn daily via drand. If it ever matches the cursed number, the signal dies forever. A daily reminder of life's inevitable fragility.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "cursed number",
    "drand",
    "randomness beacon",
    "internet experiment",
    "art project",
    "daily draw",
    "memento mori",
  ],
  authors: [{ name: "Walter Kraxberger" }],
  creator: "Walter Kraxberger",
  icons: {
    icon: [
      { url: "/icons/skull.png", type: "image/png" },
    ],
    shortcut: "/icons/skull.png",
    apple: "/icons/skull.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const CF_ANALYTICS_TOKEN = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={pressStart.variable}>
      <body>
        {children}
        {CF_ANALYTICS_TOKEN ? (
          <Script
            strategy="afterInteractive"
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${CF_ANALYTICS_TOKEN}"}`}
          />
        ) : null}
      </body>
    </html>
  );
}
