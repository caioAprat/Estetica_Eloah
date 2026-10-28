// Agenda simulada (somente desenvolvimento). Substitua por consulta real ao seu backend.
const HOURS = ["09:00", "10:00", "11:00", "13:30", "14:30", "15:30", "16:30", "17:30"];

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export const bookedStore = new Set(); // "YYYY-MM-DD|HH:mm"

export function slotsFor(date) {
  const [y, m, d] = date.split("-").map(Number);
  const weekday = new Date(y, m - 1, d).getDay();
  if (weekday === 0 || date < todayISO()) return [];
  return HOURS.filter(
    (t) => hash(`${date}${t}`) % 4 !== 0 && !bookedStore.has(`${date}|${t}`)
  );
}

export function daysFor(month) {
  const [y, m] = month.split("-").map(Number);
  const total = new Date(y, m, 0).getDate();
  const days = [];
  for (let d = 1; d <= total; d++) {
    const iso = `${month}-${String(d).padStart(2, "0")}`;
    if (slotsFor(iso).length) days.push(iso);
  }
  return days;
}
