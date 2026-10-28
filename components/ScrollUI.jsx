"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

/** Barra de progresso de leitura + botão flutuante de WhatsApp (aparece após o hero). */
export default function ScrollUI() {
  const bar = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const tween = gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: 0, end: "max", scrub: 0.3 },
    });
    const st = ScrollTrigger.create({
      start: 600,
      onToggle: (self) => setShow(self.isActive),
      end: "max",
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      st.kill();
    };
  }, []);

  const phone = SITE.whatsapp.replace(/\D/g, "");

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px]">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-rose-gold to-rose-deep" />
      </div>

      <a
        href={`https://wa.me/${phone}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className={`liquid-glass liquid-refract fixed bottom-6 right-6 z-50 flex h-14 items-center gap-2 !rounded-full px-5 text-[0.7rem] uppercase tracking-wider2 text-ink transition duration-500 ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
        style={{ "--r": "999px" }}
      >
        <span className="relative z-[3] flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-rose-deep" />
          WhatsApp
        </span>
      </a>
    </>
  );
}
