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

export const metadata: Metadata = {
  title: "Cursed Number",
  description:
    "One number is drawn daily via drand. If it ever matches the cursed number, the signal dies forever.",
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
