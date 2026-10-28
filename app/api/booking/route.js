import { NextResponse } from "next/server";
import { bookedStore, slotsFor } from "@/lib/mockSchedule";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const { serviceId, date, time, name, email, phone } = body || {};

  if (!serviceId || !date || !time || !name || !(email || phone)) {
    return NextResponse.json({ error: "Preencha os dados obrigatórios." }, { status: 400 });
  }
  if (!slotsFor(date).includes(time)) {
    return NextResponse.json({ error: "Este horário acabou de ser reservado." }, { status: 409 });
  }

  bookedStore.add(`${date}|${time}`);
  return NextResponse.json({ id: `bk_${Date.now()}`, serviceId, date, time }, { status: 201 });
}
