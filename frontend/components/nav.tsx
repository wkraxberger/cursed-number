import Link from "next/link";

const links = [
  { href: "/about", label: "ABOUT" },
  { href: "/faq", label: "FAQ" },
  { href: "/log", label: "LOG" },
  {
    href: "https://github.com/wkraxberger/cursed-number",
    label: "GITHUB",
    external: true,
  },
];

export function Nav() {
  return (
    <nav
      aria-label="Site navigation"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "clamp(10px, 2.2vw, 28px)",
        color: "#8A8A9E",
        fontSize: "var(--fs-label)",
        letterSpacing: "var(--ls-label)",
      }}
    >
      {links.map((link, i) => (
        <span
          key={link.href}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(10px, 2.2vw, 28px)",
          }}
        >
          {link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              style={{ color: "inherit" }}
            >
              {link.label}
            </a>
          ) : (
            <Link href={link.href} style={{ color: "inherit" }}>
              {link.label}
            </Link>
          )}
          {i < links.length - 1 ? (
            <span style={{ color: "#5A5A7E" }}>·</span>
          ) : null}
        </span>
      ))}
    </nav>
  );
}

export function BackLink() {
  return (
    <Link
      href="/"
      style={{
        color: "#8A8A9E",
        fontSize: "var(--fs-label)",
        letterSpacing: "var(--ls-label)",
      }}
    >
      {"< BACK"}
    </Link>
  );
}

const allLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/faq", label: "FAQ" },
  { href: "/log", label: "LOG" },
  {
    href: "https://github.com/wkraxberger/cursed-number",
    label: "GITHUB",
    external: true,
  },
];

export function FooterNav({ current }: { current: string }) {
  const filtered = allLinks.filter((l) => l.href !== current);
  return (
    <nav
      aria-label="Site navigation"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "clamp(10px, 2.2vw, 28px)",
        color: "#8A8A9E",
        fontSize: "var(--fs-label)",
        letterSpacing: "var(--ls-label)",
      }}
    >
      {filtered.map((link, i) => (
        <span
          key={link.href}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(10px, 2.2vw, 28px)",
          }}
        >
          {"external" in link && link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              style={{ color: "inherit" }}
            >
              {link.label}
            </a>
          ) : (
            <Link href={link.href} style={{ color: "inherit" }}>
              {link.label}
            </Link>
          )}
          {i < filtered.length - 1 ? (
            <span style={{ color: "#5A5A7E" }}>·</span>
          ) : null}
        </span>
      ))}
    </nav>
  );
}
