"use client";

import LiquidCard from "./LiquidCard";
import { scrollToId } from "./SmoothScroll";
import { services as defaultServices, servicesCopy } from "@/data/servicesData";

const TONES = {
  rose: "from-rose-gold/60 via-nude-300/50 to-pearl-100",
  nude: "from-nude-300/70 via-nude-100 to-pearl-50",
  gold: "from-[#e7a3b3]/70 via-nude-200/60 to-pearl-100",
  pearl: "from-pearl-300 via-pearl-100 to-nude-100",
};

function ServiceCard({ service, onSelect }) {
  const { title, category, description, duration, priceFrom, image, tone } = service;

  return (
    <LiquidCard data-reveal radius="30px" className="group flex h-full flex-col" magnetic={5}>
      <div className="flex h-full flex-col">
        {/* Mídia: foto (image) ou gradiente (tone). Altura fixa => troca de conteúdo não quebra o layout. */}
        <div className="relative h-56 shrink-0 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
          ) : (
            <div
              className={`h-full w-full bg-gradient-to-br ${TONES[tone] ?? TONES.pearl} transition-transform duration-[1400ms] ease-out group-hover:scale-105`}
            />
          )}
          <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/25 px-3 py-1 text-[0.62rem] uppercase tracking-wider2 text-ink backdrop-blur-md">
            {category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-7">
          <h3 className="font-serif text-2xl leading-snug">{title}</h3>
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
            {description}
          </p>

          <div className="mt-6 flex items-end justify-between gap-3 border-t border-white/40 pt-5">
            <div className="text-[0.7rem] uppercase tracking-wider2 text-ink-mute">
              <p>{duration}</p>
              {priceFrom && <p className="mt-1 text-ink-soft">a partir de {priceFrom}</p>}
            </div>
            <button
              onClick={() => onSelect(service)}
              className="text-[0.7rem] uppercase tracking-wider2 text-rose-deep transition-colors hover:text-ink"
            >
              Agendar →
            </button>
          </div>
        </div>
      </div>
    </LiquidCard>
  );
}

export default function ServicesShowcase({ services = defaultServices }) {
  const select = (service) => {
    window.dispatchEvent(new CustomEvent("eloah:select-service", { detail: service.id }));
    scrollToId("agendar");
  };

  return (
    <section id="servicos" className="px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <div data-reveal-group className="mb-16 max-w-2xl">
          <p data-reveal className="eyebrow mb-5">{servicesCopy.eyebrow}</p>
          <h2 data-reveal className="font-serif text-4xl leading-tight sm:text-5xl">
            {servicesCopy.title}
          </h2>
          <p data-reveal className="mt-5 text-ink-soft">{servicesCopy.subtitle}</p>
        </div>

        <div
          data-reveal-group
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} onSelect={select} />
          ))}
        </div>
      </div>
    </section>
  );
}
