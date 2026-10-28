"use client";

import { useEffect, useMemo, useState } from "react";
import LiquidCard from "./LiquidCard";
import { booking } from "@/lib/booking";
import { services } from "@/data/servicesData";

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];
const pad = (n) => String(n).padStart(2, "0");
const toISO = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const monthKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;

const monthLabel = (d) =>
  d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

const longDate = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};

export default function BookingCalendar() {
  const [cursor, setCursor] = useState(() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), 1);
  });
  const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
  const [availableDays, setAvailableDays] = useState(new Set());
  const [loadingDays, setLoadingDays] = useState(false);
  const [date, setDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [time, setTime] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  // Seleção vinda dos cards de serviço
  useEffect(() => {
    const onSelect = (e) => setServiceId(e.detail);
    window.addEventListener("eloah:select-service", onSelect);
    return () => window.removeEventListener("eloah:select-service", onSelect);
  }, []);

  // Dias disponíveis do mês
  const key = monthKey(cursor);
  useEffect(() => {
    let alive = true;
    setLoadingDays(true);
    booking
      .getAvailability(key)
      .then((r) => alive && setAvailableDays(new Set(r.days)))
      .catch(() => alive && setAvailableDays(new Set()))
      .finally(() => alive && setLoadingDays(false));
    return () => {
      alive = false;
    };
  }, [key]);

  // Horários do dia
  useEffect(() => {
    if (!date) return;
    let alive = true;
    setLoadingSlots(true);
    setTime(null);
    booking
      .getSlots(date, serviceId)
      .then((r) => alive && setSlots(r.slots))
      .catch(() => alive && setSlots([]))
      .finally(() => alive && setLoadingSlots(false));
    return () => {
      alive = false;
    };
  }, [date, serviceId]);

  const cells = useMemo(() => {
    const y = cursor.getFullYear();
    const m = cursor.getMonth();
    const lead = new Date(y, m, 1).getDay();
    const total = new Date(y, m + 1, 0).getDate();
    return [
      ...Array.from({ length: lead }, () => null),
      ...Array.from({ length: total }, (_, i) => toISO(y, m, i + 1)),
    ];
  }, [cursor]);

  const now = new Date();
  const canGoBack =
    cursor.getFullYear() > now.getFullYear() ||
    (cursor.getFullYear() === now.getFullYear() && cursor.getMonth() > now.getMonth());

  const move = (delta) => {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));
    setDate(null);
    setSlots([]);
    setTime(null);
  };

  const service = services.find((s) => s.id === serviceId);
  const ready = date && time && form.name.trim() && (form.email.trim() || form.phone.trim());

  const submit = async (e) => {
    e.preventDefault();
    if (!ready) return;
    setStatus("sending");
    setError("");
    try {
      await booking.createBooking({ serviceId, date, time, ...form });
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("error");
      // horário pode ter sido tomado: recarrega os slots
      booking.getSlots(date, serviceId).then((r) => setSlots(r.slots)).catch(() => {});
      setTime(null);
    }
  };

  const reset = () => {
    setStatus("idle");
    setDate(null);
    setTime(null);
    setSlots([]);
    setForm({ name: "", email: "", phone: "" });
    booking.getAvailability(key).then((r) => setAvailableDays(new Set(r.days))).catch(() => {});
  };

  const input =
    "w-full rounded-2xl border border-white/50 bg-white/25 px-4 py-3 text-sm text-ink placeholder:text-ink-mute outline-none backdrop-blur-md transition focus:border-rose-gold focus:bg-white/40";

  return (
    <section id="agendar" className="px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <div data-reveal-group className="mb-14 max-w-2xl">
          <p data-reveal className="eyebrow mb-5">Agendamento</p>
          <h2 data-reveal className="font-serif text-4xl leading-tight sm:text-5xl">
            Marque sua consulta
          </h2>
          <p data-reveal className="mt-5 text-ink-soft">
            Escolha o tratamento, o dia e o horário que preferir.
          </p>
        </div>

        <LiquidCard data-reveal strong magnetic={0} radius="36px">
          {status === "done" ? (
            <div className="px-8 py-20 text-center">
              <p className="eyebrow mb-4">Solicitação enviada</p>
              <h3 className="font-serif text-4xl">Tudo certo, {form.name.split(" ")[0]}.</h3>
              <p className="mx-auto mt-4 max-w-md text-ink-soft">
                {service?.title} em {longDate(date)}, às {time}. Você receberá a confirmação em
                breve.
              </p>
              <button className="btn-glass mt-8" onClick={reset}>
                Novo agendamento
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.15fr_1fr]">
              {/* Calendário */}
              <div>
                <div className="mb-6 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setServiceId(s.id)}
                      aria-pressed={s.id === serviceId}
                      className={`rounded-full border px-4 py-2 text-[0.68rem] uppercase tracking-wider2 transition ${
                        s.id === serviceId
                          ? "border-rose-gold bg-white/55 text-ink shadow-glass"
                          : "border-white/40 bg-white/15 text-ink-soft hover:bg-white/30"
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>

                <div className="mb-5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => move(-1)}
                    disabled={!canGoBack}
                    aria-label="Mês anterior"
                    className="h-10 w-10 rounded-full border border-white/50 bg-white/20 text-ink transition hover:bg-white/45 disabled:opacity-30"
                  >
                    ←
                  </button>
                  <p className="font-serif text-2xl first-letter:uppercase">{monthLabel(cursor)}</p>
                  <button
                    type="button"
                    onClick={() => move(1)}
                    aria-label="Próximo mês"
                    className="h-10 w-10 rounded-full border border-white/50 bg-white/20 text-ink transition hover:bg-white/45"
                  >
                    →
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center">
                  {WEEKDAYS.map((w, i) => (
                    <span key={i} className="pb-1 text-[0.65rem] uppercase tracking-wider2 text-ink-mute">
                      {w}
                    </span>
                  ))}
                  {cells.map((iso, i) => {
                    if (!iso) return <span key={`e${i}`} />;
                    const free = availableDays.has(iso);
                    const selected = iso === date;
                    return (
                      <button
                        type="button"
                        key={iso}
                        disabled={!free}
                        onClick={() => setDate(iso)}
                        aria-pressed={selected}
                        aria-label={longDate(iso)}
                        style={free ? { animationDelay: `${(i % 7) * 0.35}s` } : undefined}
                        className={`aspect-square rounded-2xl border text-sm transition duration-300 ${
                          selected
                            ? "border-rose-gold bg-gradient-to-br from-rose-gold to-rose-deep text-pearl-50 shadow-glass"
                            : free
                              ? "animate-float border-white/60 bg-white/35 text-ink shadow-glass backdrop-blur-md hover:-translate-y-1 hover:bg-white/60"
                              : "border-transparent text-ink-mute/50"
                        } ${loadingDays ? "opacity-60" : ""}`}
                      >
                        {Number(iso.slice(8))}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Horários + dados */}
              <div className="flex flex-col gap-6">
                <div>
                  <p className="eyebrow mb-3">
                    {date ? longDate(date) : "Selecione um dia"}
                  </p>
                  <div className="grid min-h-[3rem] grid-cols-3 gap-2">
                    {loadingSlots && <p className="col-span-3 text-sm text-ink-mute">Carregando horários…</p>}
                    {!loadingSlots && date && slots.length === 0 && (
                      <p className="col-span-3 text-sm text-ink-mute">Sem horários neste dia.</p>
                    )}
                    {slots.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTime(t)}
                        aria-pressed={t === time}
                        className={`rounded-xl border py-2.5 text-sm transition ${
                          t === time
                            ? "border-rose-gold bg-gradient-to-br from-rose-gold to-rose-deep text-pearl-50"
                            : "border-white/60 bg-white/30 backdrop-blur-md hover:bg-white/55"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    className={input}
                    placeholder="Nome completo"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    className={input}
                    type="email"
                    placeholder="E-mail"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <input
                    className={input}
                    type="tel"
                    placeholder="WhatsApp"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                {status === "error" && (
                  <p role="alert" className="text-sm text-rose-deep">{error}</p>
                )}

                <button className="btn-solid disabled:opacity-40" disabled={!ready || status === "sending"}>
                  {status === "sending" ? "Enviando…" : "Confirmar agendamento"}
                </button>
              </div>
            </form>
          )}
        </LiquidCard>
      </div>
    </section>
  );
}
