"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis (smooth scroll) acoplado ao ticker do GSAP + animações globais:
 *  - [data-reveal-group] > [data-reveal]  : fade + translateY com stagger
 *  - [data-reveal] solto                  : reveal individual
 *  - [data-parallax="n"]                  : parallax ao longo da página (n negativo = sentido oposto)
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis;
    let tick;
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
      window.__lenis = lenis;
      lenis.stop(); // liberado pelo Preloader
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      if (reduce) return;

      const grouped = new Set();
      gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll("[data-reveal]");
        items.forEach((i) => grouped.add(i));
        gsap.fromTo(
          items,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            stagger: 0.14,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          }
        );
      });

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        if (grouped.has(el)) return;
        gsap.fromTo(
          el,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.2;
        gsap.to(el, {
          y: () => speed * ScrollTrigger.maxScroll(window),
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: 0,
            end: "max",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    return () => {
      ctx.revert();
      if (lenis) {
        gsap.ticker.remove(tick);
        lenis.destroy();
        delete window.__lenis;
      }
    };
  }, []);

  return null;
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
}
