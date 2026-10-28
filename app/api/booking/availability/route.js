import { NextResponse } from "next/server";
import { daysFor } from "@/lib/mockSchedule";

export const dynamic = "force-dynamic";

export function GET(request) {
  const month = new URL(request.url).searchParams.get("month");
  if (!/^\d{4}-\d{2}$/.test(month || "")) {
    return NextResponse.json({ error: "Mês inválido." }, { status: 400 });
  }
  return NextResponse.json({ days: daysFor(month) });
}
