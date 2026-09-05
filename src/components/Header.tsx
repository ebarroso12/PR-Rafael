"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "#proposta", label: "A proposta" },
  { href: "#processo", label: "O processo" },
  { href: "#rafael", label: "Pr. Rafael" },
  { href: "#assistente", label: "Assistente" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-line/60 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center border border-gold/50 text-gold">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M12 3v18M6 8h12" strokeLinecap="round" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-wide text-parchment-soft">
              RENOVAH
            </span>
            <span className="block text-[10px] tracking-label text-gold/80">
              PSICANÁLISE · FÉ · MENTORIA
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-dark md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-gold">
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center border border-ink-line text-parchment-soft md:hidden"
          aria-label="Abrir menu"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink-line/60 bg-ink px-5 pb-4 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded px-2 py-3 text-sm text-muted-dark hover:bg-ink-soft hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
