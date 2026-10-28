// Camada de integração do agendamento. O BookingCalendar só conhece esta interface:
//   getAvailability(month 'YYYY-MM') -> { days: ['YYYY-MM-DD', ...] }
//   getSlots(date 'YYYY-MM-DD', serviceId) -> { slots: ['09:00', ...] }
//   createBooking({ serviceId, date, time, name, email, phone, notes }) -> { id, ... }
//
// Troque o provedor com NEXT_PUBLIC_BOOKING_PROVIDER:
//   "mock"   -> rotas internas em /api/booking (padrão, para desenvolvimento)
//   "custom" -> seu backend REST em NEXT_PUBLIC_BOOKING_API_URL (mesmos 3 endpoints)
// Para Calendly/Acuity, implemente um adaptador com a mesma forma abaixo
// (idealmente via rota server-side para não expor tokens).

async function request(url, options) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Não foi possível concluir a solicitação.");
  }
  return res.json();
}

function restAdapter(base) {
  return {
    getAvailability: (month) =>
      request(`${base}/availability?month=${encodeURIComponent(month)}`),
    getSlots: (date, serviceId) =>
      request(
        `${base}/slots?date=${encodeURIComponent(date)}&service=${encodeURIComponent(serviceId || "")}`
      ),
    createBooking: (payload) =>
      request(`${base}`, { method: "POST", body: JSON.stringify(payload) }),
  };
}

const adapters = {
  mock: restAdapter("/api/booking"),
  custom: restAdapter(process.env.NEXT_PUBLIC_BOOKING_API_URL || "/api/booking"),
};

const provider = process.env.NEXT_PUBLIC_BOOKING_PROVIDER || "mock";

export const booking = adapters[provider] ?? adapters.mock;
