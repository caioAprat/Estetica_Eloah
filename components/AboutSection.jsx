"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidCard from "./LiquidCard";
import { SITE_NAME } from "@/lib/config";
import { stats } from "@/data/landingData";

gsap.registerPlugin(ScrollTrigger);

function Counter({ value, prefix, suffix, label }) {
  const ref = useRef(null);
  useEffect(() => {
    const obj = { v: 0 };
    const t = gsap.to(obj, {
      v: value,
      duration: 2.2,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.v).toLocaleString("pt-BR");
      },
    });
    return () => {
      t.scrollTrigger?.kill();
      t.kill();
    };
  }, [value]);

  return (
    <div data-reveal>
      <p className="font-serif text-4xl text-ink sm:text-5xl">
        {prefix}
        <span ref={ref}>0</span>
        {suffix}
      </p>
      <p className="mt-1 text-[0.65rem] uppercase tracking-wider2 text-ink-mute">{label}</p>
    </div>
  );
}

export default function AboutSection() {
  const photo = useRef(null);

  // Foto "abre" com clip-path circular ao entrar na viewport
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = gsap.fromTo(
      photo.current,
      { clipPath: "circle(18% at 50% 50%)", scale: 1.25 },
      {
        clipPath: "circle(72% at 50% 50%)",
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: photo.current, start: "top 90%", end: "center 55%", scrub: 0.8 },
      }
    );
    return () => {
      t.scrollTrigger?.kill();
      t.kill();
    };
  }, []);

  return (
    <section id="sobre" className="px-4 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative mx-auto w-full max-w-md">
          <LiquidCard strong refract magnetic={0} radius="999px" className="aspect-square w-full p-3" data-parallax="-0.03">
            <img
              ref={photo}
              src="/eloah-circle.png"
              alt={SITE_NAME}
              loading="lazy"
              className="h-full w-full rounded-full object-cover"
            />
          </LiquidCard>
          <LiquidCard
            data-reveal
            refract
            radius="22px"
            magnetic={0}
            className="absolute -bottom-4 right-0 sm:-right-8"
          >
            <div className="px-6 py-4">
              <p className="font-serif text-xl">{SITE_NAME}</p>
              <p className="text-[0.6rem] uppercase tracking-wider2 text-ink-mute">Estética avançada</p>
            </div>
          </LiquidCard>
        </div>

        <div data-reveal-group>
          <p data-reveal className="eyebrow mb-5">Sobre</p>
          <h2 data-reveal className="font-serif text-4xl leading-tight sm:text-5xl">
            Cuidado que começa por <em className="text-gradient-rose">ouvir você</em>
          </h2>
          <p data-reveal className="mt-6 max-w-lg leading-relaxed text-ink-soft">
            Texto de apresentação de {SITE_NAME}: formação, filosofia de trabalho e o que torna o
            atendimento único. Substitua por conteúdo definitivo.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/50 pt-8">
            {stats.map((s) => (
              <Counter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
