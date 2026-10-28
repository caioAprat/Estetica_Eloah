"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidCard from "./LiquidCard";
import { steps } from "@/data/landingData";

gsap.registerPlugin(ScrollTrigger);

/** Desktop: seção fixa (pin) e etapas acendem conforme o scroll. Mobile: lista normal. */
export default function ProcessSection() {
  const root = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray(".process-step", root.current);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${steps.length * 450}`,
          pin: true,
          scrub: 0.6,
          refreshPriority: 1,
          anticipatePin: 1,
        },
      });
      tl.fromTo(".process-line", { scaleX: 0 }, { scaleX: 1, duration: steps.length }, 0);
      items.forEach((el, i) => {
        tl.fromTo(el, { opacity: 0.2, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, i);
      });
    }, root);
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="processo" className="flex flex-col justify-center px-4 py-24 lg:min-h-screen lg:py-0">
      <div className="mx-auto w-full max-w-6xl">
        <div data-reveal-group className="mb-14 max-w-2xl">
          <p data-reveal className="eyebrow mb-5">Como funciona</p>
          <h2 data-reveal className="font-serif text-4xl leading-tight sm:text-5xl">
            Uma jornada pensada em <em className="text-gradient-rose">cada etapa</em>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-rose-gold/25 lg:block">
            <div className="process-line h-full origin-left bg-gradient-to-r from-rose-gold to-rose-deep" />
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="process-step relative pt-0 lg:pt-14">
                <span className="absolute left-6 top-[1.1rem] z-10 hidden h-3 w-3 rounded-full bg-rose-deep shadow-[0_0_0_6px_rgba(224,145,159,0.25)] lg:block" />
                <LiquidCard refract radius="28px" magnetic={4}>
                  <div className="p-7">
                    <p className="font-serif text-4xl text-gradient-rose">0{i + 1}</p>
                    <h3 className="mt-4 font-serif text-xl">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
                  </div>
                </LiquidCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
