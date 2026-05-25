import Link from "next/link";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/beans", label: "Çekirdekler" },
  { href: "/brews", label: "Demlemeler" },
  { href: "/beans/new", label: "Yeni Çekirdek" },
  { href: "/brews/new", label: "Yeni Demleme" }
];

export function Navbar() {
  return (
    <header className="border-b border-[rgba(75,45,23,0.12)] bg-[rgba(255,249,235,0.9)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(209,161,42,0.2)] text-lg font-semibold text-[var(--accent-2)]">
            ☕️
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">BrewStack</p>
            <p className="text-sm text-[var(--ink-muted)]">Günlük demleme günlüğün</p>
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-3 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-transparent px-4 py-2 transition hover:border-[rgba(209,161,42,0.4)] hover:bg-[rgba(209,161,42,0.16)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
