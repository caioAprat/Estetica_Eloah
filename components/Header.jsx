"use client";

import LiquidCard from "./LiquidCard";
import { scrollToId } from "./SmoothScroll";
import { SITE_NAME, NAV } from "@/lib/config";

export default function Header() {
  const go = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <LiquidCard
        as="nav"
        magnetic={0}
        refract
        radius="999px"
        className="mx-auto max-w-5xl"
        aria-label="Principal"
      >
        <div className="flex items-center justify-between gap-4 py-3 pl-7 pr-3">
          <a
            href="#inicio"
            onClick={go("inicio")}
            className="whitespace-nowrap font-serif text-lg tracking-wide text-ink sm:text-xl"
          >
            {SITE_NAME}
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV.filter((n) => n.id !== "inicio" && n.id !== "agendar").map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  className="text-[0.7rem] uppercase tracking-wider2 text-ink-soft transition-colors hover:text-rose-deep"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#agendar" onClick={go("agendar")} className="btn-solid !px-5 !py-2.5">
            Agendar
          </a>
        </div>
      </LiquidCard>
    </header>
  );
}
