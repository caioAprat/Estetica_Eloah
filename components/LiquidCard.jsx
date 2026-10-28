"use client";

import { useRef } from "react";
import gsap from "gsap";

/**
 * Cartão Liquid Glass base. Hover: brilho especular segue o cursor
 * e o cartão é levemente atraído (magnetismo) na direção do mouse.
 */
export default function LiquidCard({
  as: Tag = "div",
  strong = false,
  refract = false,
  magnetic = 6,
  radius,
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const quick = useRef(null);

  const getQuick = () => {
    if (!quick.current) {
      quick.current = {
        x: gsap.quickTo(ref.current, "x", { duration: 0.6, ease: "power3.out" }),
        y: gsap.quickTo(ref.current, "y", { duration: 0.6, ease: "power3.out" }),
      };
    }
    return quick.current;
  };

  const onMove = (e) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    el.style.setProperty("--mx", `${px}px`);
    el.style.setProperty("--my", `${py}px`);
    el.style.setProperty("--glow", "1");
    if (magnetic) {
      const q = getQuick();
      q.x(((px / r.width) - 0.5) * magnetic * 2);
      q.y(((py / r.height) - 0.5) * magnetic * 2);
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--glow", "0");
    if (magnetic) {
      const q = getQuick();
      q.x(0);
      q.y(0);
    }
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`liquid-glass ${strong ? "liquid-glass--strong" : ""} ${refract ? "liquid-refract" : ""} ${className}`}
      style={radius ? { "--r": radius, ...style } : style}
      {...rest}
    >
      <div className="liquid-glass__content h-full">{children}</div>
    </Tag>
  );
}
