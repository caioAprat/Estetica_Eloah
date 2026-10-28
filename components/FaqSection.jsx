"use client";

import { useState } from "react";
import LiquidCard from "./LiquidCard";
import { faqs } from "@/data/landingData";

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <div data-reveal-group className="mb-12 text-center">
          <p data-reveal className="eyebrow mb-5">Dúvidas</p>
          <h2 data-reveal className="font-serif text-4xl leading-tight sm:text-5xl">
            Perguntas <em className="text-gradient-rose">frequentes</em>
          </h2>
        </div>

        <div className="space-y-4" data-reveal-group>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <LiquidCard key={f.q} data-reveal radius="24px" magnetic={0}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-7 py-5 text-left"
                >
                  <span className="font-serif text-lg">{f.q}</span>
                  <span
                    className={`text-2xl leading-none text-rose-deep transition-transform duration-500 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-7 pb-6 text-sm leading-relaxed text-ink-soft">{f.a}</p>
                  </div>
                </div>
              </LiquidCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
