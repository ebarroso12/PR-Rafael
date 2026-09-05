import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminSession";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ user: session.user });
}
