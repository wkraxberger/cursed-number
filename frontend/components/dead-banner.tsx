/**
 * Small, unobtrusive "SIGNAL LOST" banner shown at the top of the About,
 * FAQ, and Log pages once the cursed number has been drawn. The home page
 * renders its own full-width tombstone instead of this banner.
 */
export function DeadBanner({ deathDay }: { deathDay: number | null }) {
  return (
    <div
      role="status"
      style={{
        width: "100%",
        maxWidth: "760px",
        margin: "clamp(-6px, -1vw, -2px) auto 0",
        padding: "clamp(10px, 1.6vw, 16px) clamp(14px, 2vw, 24px)",
        border: "1px solid #A03030",
        borderRadius: "4px",
        backgroundColor: "#14060ACC",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(8px, 1.5vw, 18px)",
        textAlign: "center",
      }}
    >
      <span
        style={{
          color: "#C44030",
          fontSize: "var(--fs-label)",
          letterSpacing: "clamp(1px, 0.4vw, 3px)",
        }}
      >
        SIGNAL LOST
      </span>
      <span style={{ color: "#5A5A7E" }}>·</span>
      <span
        style={{
          color: "#8A8A9E",
          fontSize: "var(--fs-label)",
          letterSpacing: "var(--ls-label)",
        }}
      >
        {deathDay != null
          ? `CURSED ON DAY ${String(deathDay).padStart(3, "0")}`
          : "ARCHIVE LOCKED"}
      </span>
    </div>
  );
}
