import { NextResponse } from "next/server";
import { slotsFor } from "@/lib/mockSchedule";

export const dynamic = "force-dynamic";

export function GET(request) {
  const date = new URL(request.url).searchParams.get("date");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) {
    return NextResponse.json({ error: "Data inválida." }, { status: 400 });
  }
  return NextResponse.json({ slots: slotsFor(date) });
}
