import { CURSED_NUMBER } from "@/lib/types";

export function Panel({
  variant,
  label,
  number,
  caption,
  borderColor: borderOverride,
  labelColor: labelOverride,
  numberColor: numberOverride,
  captionColor: captionOverride,
  style,
}: {
  variant: "draw" | "cursed";
  label: string;
  number: string;
  caption: string;
  borderColor?: string;
  labelColor?: string;
  numberColor?: string;
  captionColor?: string;
  style?: React.CSSProperties;
}) {
  const isCursed = variant === "cursed";
  const border = borderOverride ?? (isCursed ? "#A03030" : "#2A3060");
  const labelC = labelOverride ?? (isCursed ? "#C44030" : "#8A8A9E");
  const numberC = numberOverride ?? (isCursed ? "#C44030" : "#E8E0D0");
  const captionC = captionOverride ?? (isCursed ? "#A03030" : "#5A5A7E");
  const divider = isCursed
    ? "linear-gradient(to right, transparent, #A03030, transparent)"
    : "linear-gradient(to right, transparent, #2A3060, transparent)";

  return (
    <div
      style={{
        flex: "1 1 240px",
        maxWidth: "320px",
        minWidth: 0,
        padding: "clamp(14px, 2.2vw, 26px) clamp(16px, 2.8vw, 34px)",
        borderRadius: "4px",
        backgroundColor: "#0A0A0FCC",
        border: `1px solid ${border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(10px, 1.6vw, 18px)",
        ...style,
      }}
    >
      <div
        style={{
          fontSize: "var(--fs-label)",
          letterSpacing: "var(--ls-label)",
          color: labelC,
        }}
      >
        {label}
      </div>
      <div
        style={{
          width: "100%",
          height: "1px",
          background: divider,
        }}
      />
      <div
        style={{
          fontSize: "var(--fs-big-num)",
          color: numberC,
          letterSpacing: "clamp(2px, 0.5vw, 4px)",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontSize: "var(--fs-label)",
          letterSpacing: "var(--ls-label)",
          color: captionC,
        }}
      >
        {caption}
      </div>
    </div>
  );
}

export function TombstonePanel({
  deathDayLabel,
  marginTop,
}: {
  deathDayLabel?: string;
  marginTop?: string;
}) {
  return (
    <div
      style={{
        width: "min(420px, 100%)",
        marginTop: marginTop ?? "clamp(20px, 8vw, 60px)",
        padding: "clamp(18px, 2.6vw, 32px) clamp(20px, 3vw, 40px)",
        borderRadius: "4px",
        backgroundColor: "#0A0A0FCC",
        border: "1px solid #A03030",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(10px, 1.6vw, 18px)",
        boxShadow: "0 0 0 1px #A0303022 inset",
      }}
    >
      <div
        style={{
          fontSize: "var(--fs-label)",
          letterSpacing: "clamp(1px, 0.4vw, 3px)",
          color: "#C44030",
        }}
      >
        FINAL DRAW
      </div>
      <div
        style={{
          width: "100%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, #A03030, transparent)",
        }}
      />
      <div
        style={{
          fontSize: "var(--fs-big-num)",
          color: "#C44030",
          letterSpacing: "clamp(2px, 0.5vw, 4px)",
          lineHeight: 1,
        }}
      >
        {CURSED_NUMBER}
      </div>
      <div
        style={{
          fontSize: "var(--fs-label)",
          letterSpacing: "var(--ls-label)",
          color: "#A03030",
        }}
      >
        {deathDayLabel ? `CURSED ON ${deathDayLabel}` : "ARCHIVE LOCKED"}
      </div>
    </div>
  );
}
