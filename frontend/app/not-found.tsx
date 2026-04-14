import type { Metadata } from "next";
import Link from "next/link";
import { FooterNav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Signal Not Found",
  description: "This frequency has nothing to broadcast.",
};

/**
 * Custom 404 shown for any unknown route. Uses its own pixel-art CRT-style
 * background (/public/404.png) instead of the `Background` component because
 * the 404 imagery already carries all the text and atmosphere.
 */
export default function NotFound() {
  return (
    <>
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url(/404.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          backgroundColor: "#0A0A0F",
          opacity: 0.35,
        }}
      />
      <main
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "var(--pad-page-y) var(--pad-page-x)",
          gap: "clamp(16px, 3vw, 32px)",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#8A8A9E",
            fontSize: "var(--fs-label)",
            letterSpacing: "var(--ls-label)",
          }}
        >
          {"< RETURN TO SIGNAL"}
        </Link>
        <FooterNav current="/404" />
      </main>
    </>
  );
}
