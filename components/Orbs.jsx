// Gotas/esferas de vidro desfocadas em CSS, com parallax em sentidos opostos ao scroll.
const ORBS = [
  { top: "6%", left: "-8%", size: 460, speed: 0.18, tone: "from-nude-200/70 to-rose-gold/30" },
  { top: "22%", right: "-10%", size: 380, speed: -0.12, tone: "from-pearl-50/90 to-nude-300/40" },
  { top: "48%", left: "62%", size: 280, speed: 0.22, tone: "from-rose-gold/35 to-pearl-100/60" },
  { top: "68%", left: "-6%", size: 420, speed: -0.16, tone: "from-nude-100/80 to-rose-gold/25" },
  { top: "88%", right: "4%", size: 320, speed: 0.1, tone: "from-pearl-50/80 to-nude-200/50" },
];

export default function Orbs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden" aria-hidden="true">
      {ORBS.map(({ size, speed, tone, ...pos }, i) => (
        <div
          key={i}
          data-parallax={speed}
          className={`absolute rounded-full bg-gradient-to-br ${tone} blur-2xl`}
          style={{ width: size, height: size, ...pos }}
        />
      ))}
    </div>
  );
}
