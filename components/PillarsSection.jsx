import LiquidCard from "./LiquidCard";
import { pillars } from "@/data/landingData";

export default function PillarsSection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3" data-reveal-group>
        {pillars.map((p) => (
          <LiquidCard key={p.n} data-reveal refract radius="30px">
            <div className="p-8 sm:p-10">
              <p className="font-serif text-5xl text-gradient-rose">{p.n}</p>
              <h3 className="mt-6 font-serif text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.text}</p>
            </div>
          </LiquidCard>
        ))}
      </div>
    </section>
  );
}
