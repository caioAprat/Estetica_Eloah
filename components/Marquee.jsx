"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/servicesData";

gsap.registerPlugin(ScrollTrigger);

/** Faixa de vidro com texto em loop; acelera conforme a velocidade do scroll. */
export default function Marquee() {
  const track = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const loop = gsap.to(track.current, { xPercent: -50, ease: "none", duration: 36, repeat: -1 });
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const v = Math.min(Math.abs(self.getVelocity()) / 400, 6);
        gsap.to(loop, { timeScale: 1 + v, duration: 0.2, overwrite: true });
        gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2 });
      },
    });
    return () => {
      st.kill();
      loop.kill();
    };
  }, []);

  const words = [...services.map((s) => s.title), "Cuidado", "Delicadeza", "Naturalidade"];
  const row = [...words, ...words];

  return (
    <div className="relative my-6 overflow-hidden border-y border-white/50 bg-white/20 py-5 backdrop-blur-xl" aria-hidden="true">
      <div ref={track} className="flex w-max whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center font-serif text-3xl italic text-ink/80 sm:text-4xl">
                <span className="px-8">{w}</span>
                <span className="text-rose-gold">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
