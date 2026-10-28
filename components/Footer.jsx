import LiquidCard from "./LiquidCard";
import { SITE, SITE_NAME } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="px-4 pb-10 pt-6">
      <LiquidCard magnetic={0} className="mx-auto max-w-6xl" data-reveal>
        <div className="grid gap-10 px-8 py-12 md:grid-cols-3 md:px-14">
          <div>
            <p className="font-serif text-3xl">{SITE_NAME}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{SITE.tagline}</p>
          </div>
          <div className="space-y-2 text-sm text-ink-soft">
            <p className="eyebrow mb-3">Contato</p>
            <p>{SITE.whatsapp}</p>
            <p>{SITE.email}</p>
            <p>{SITE.instagram}</p>
          </div>
          <div className="space-y-2 text-sm text-ink-soft">
            <p className="eyebrow mb-3">Clínica</p>
            <p>{SITE.address}</p>
            <p>Seg a Sáb · 09h às 18h</p>
          </div>
        </div>
        <div className="border-t border-white/30 px-8 py-5 text-center text-[0.7rem] uppercase tracking-wider2 text-ink-mute">
          © {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.
        </div>
      </LiquidCard>
    </footer>
  );
}
