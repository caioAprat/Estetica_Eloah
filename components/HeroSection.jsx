"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import LiquidCard from "./LiquidCard";
import { scrollToId } from "./SmoothScroll";
import { PRELOAD_SECONDS } from "./Preloader";
import { SITE, SITE_NAME } from "@/lib/config";

const LINES = ["A beleza que", "revela a sua", "essência"];

export default function HeroSection() {
  const root = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-hero]", { opacity: 1 });
        return;
      }
      const tl = gsap.timeline({ delay: PRELOAD_SECONDS, defaults: { ease: "power4.out" } });
      tl.from(".split-line > span", { yPercent: 115, duration: 1.5, stagger: 0.12 })
        .fromTo("[data-hero]", { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3, stagger: 0.12 }, 0.35)
        .from(".hero-photo", { scale: 0.82, opacity: 0, duration: 1.8, ease: "expo.out" }, 0.1)
        .from(".hero-chip", { scale: 0.6, opacity: 0, duration: 1.2, stagger: 0.18, ease: "back.out(1.6)" }, 0.9);

      // Parallax de profundidade com o mouse
      const depth = gsap.utils.toArray("[data-depth]").map((n) => ({
        x: gsap.quickTo(n, "x", { duration: 1.1, ease: "power3.out" }),
        y: gsap.quickTo(n, "y", { duration: 1.1, ease: "power3.out" }),
        d: parseFloat(n.dataset.depth),
      }));
      const move = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        depth.forEach(({ x, y, d }) => {
          x(nx * d);
          y(ny * d);
        });
      };
      el.addEventListener("pointermove", move);
      return () => el.removeEventListener("pointermove", move);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="inicio"
      className="relative flex min-h-[100svh] items-center px-4 pb-24 pt-32"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p data-hero className="eyebrow mb-6">
            {SITE_NAME} · {SITE.tagline}
          </p>

          <h1 className="font-serif text-[2.9rem] leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl xl:text-8xl">
            {LINES.map((l, i) => (
              <span key={l} className="split-line">
                <span className={i === 1 ? "text-gradient-rose italic" : ""}>{l}</span>
              </span>
            ))}
          </h1>

          <p data-hero className="mt-8 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            Ciência, sensibilidade e atenção a cada detalhe — para resultados naturais que respeitam
            quem você é.
          </p>

          <div data-hero className="mt-10 flex flex-wrap gap-4">
            <button className="btn-solid sheen relative overflow-hidden" onClick={() => scrollToId("agendar")}>
              Marque sua consulta
            </button>
            <button className="btn-glass liquid-refract" onClick={() => scrollToId("servicos")}>
              Conhecer serviços
            </button>
          </div>

          <p data-hero className="mt-8 flex items-center gap-3 text-[0.7rem] uppercase tracking-wider2 text-ink-mute">
            <span className="h-px w-10 bg-rose-gold" /> Atendimento exclusivo com hora marcada
          </p>
        </div>

        {/* Foto em moldura de vidro + chips flutuantes */}
        <div className="relative mx-auto w-full max-w-[26rem]">
          <div data-depth="-18" className="hero-photo">
            <LiquidCard strong refract magnetic={0} radius="999px" className="aspect-square w-full p-3 sm:p-4">
              <img
                src="/eloah-circle.png"
                alt={`${SITE_NAME}`}
                className="h-full w-full rounded-full object-cover"
                width={992}
                height={992}
                fetchPriority="high"
              />
            </LiquidCard>
          </div>

          <div data-depth="34" className="hero-chip absolute -left-4 top-10 sm:-left-12">
            <LiquidCard refract magnetic={0} radius="22px" className="animate-drift">
              <div className="px-5 py-3">
                <p className="font-serif text-2xl">+2 mil</p>
                <p className="text-[0.6rem] uppercase tracking-wider2 text-ink-mute">pacientes</p>
              </div>
            </LiquidCard>
          </div>

          <div data-depth="46" className="hero-chip absolute -right-2 bottom-14 sm:-right-10">
            <LiquidCard refract magnetic={0} radius="22px" className="animate-drift [animation-delay:-3s]">
              <div className="px-5 py-3">
                <p className="font-serif text-2xl">Natural</p>
                <p className="text-[0.6rem] uppercase tracking-wider2 text-ink-mute">sempre o foco</p>
              </div>
            </LiquidCard>
          </div>
        </div>
      </div>
    </section>
  );
}
