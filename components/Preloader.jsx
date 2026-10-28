"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SITE_NAME } from "@/lib/config";

// Duração total até o hero começar a animar (HeroSection usa o mesmo valor).
export const PRELOAD_SECONDS = 1.9;

export default function Preloader() {
  const root = useRef(null);
  const count = useRef(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const done = () => {
      window.__lenis?.start();
      setGone(true);
    };
    if (reduce) {
      done();
      return;
    }
    const obj = { v: 0 };
    const tl = gsap.timeline({ onComplete: done });
    tl.from(".pre-name", { yPercent: 110, duration: 0.9, ease: "power4.out" })
      .to(obj, {
        v: 100,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => count.current && (count.current.textContent = Math.round(obj.v)),
      }, 0.2)
      .to(".pre-bar", { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0.2)
      .to(root.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, PRELOAD_SECONDS - 0.5);
    return () => tl.kill();
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-pearl-50 via-nude-100 to-nude-200"
      aria-hidden="true"
    >
      <div className="overflow-hidden">
        <p className="pre-name font-serif text-5xl tracking-wide text-ink sm:text-7xl">{SITE_NAME}</p>
      </div>
      <div className="mt-8 h-px w-48 overflow-hidden bg-rose-gold/25">
        <div className="pre-bar h-full origin-left scale-x-0 bg-rose-deep" />
      </div>
      <p className="mt-4 text-[0.7rem] uppercase tracking-widest2 text-ink-mute">
        <span ref={count}>0</span>%
      </p>
    </div>
  );
}
