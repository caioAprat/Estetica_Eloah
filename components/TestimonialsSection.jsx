import LiquidCard from "./LiquidCard";
import { testimonials } from "@/data/landingData";

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <div data-reveal-group className="mb-14 max-w-2xl">
          <p data-reveal className="eyebrow mb-5">Depoimentos</p>
          <h2 data-reveal className="font-serif text-4xl leading-tight sm:text-5xl">
            Quem viveu, <em className="text-gradient-rose">recomenda</em>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3" data-reveal-group>
          {testimonials.map((t, i) => (
            <LiquidCard
              key={t.name}
              data-reveal
              strong={i === 1}
              refract
              radius="30px"
              className={i === 1 ? "md:-translate-y-6" : ""}
            >
              <figure className="flex h-full flex-col p-8">
                <span className="font-serif text-6xl leading-none text-rose-gold">“</span>
                <blockquote className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                  {t.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between border-t border-white/40 pt-4">
                  <span className="text-[0.7rem] uppercase tracking-wider2 text-ink">{t.name}</span>
                  <span className="text-rose-deep" aria-label="5 estrelas">★★★★★</span>
                </figcaption>
              </figure>
            </LiquidCard>
          ))}
        </div>
      </div>
    </section>
  );
}
