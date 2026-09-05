import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const ALLOWED_TYPES = new Set(["pageview", "whatsapp_click", "cta_click"]);

export async function POST(req: NextRequest) {
  const { type, target, path } = await req.json();
  if (!ALLOWED_TYPES.has(type)) {
    return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  }

  await supabase.from("site_events").insert({
    type,
    target: target ?? null,
    path: path ?? null,
    referrer: req.headers.get("referer") ?? null,
  });

  return NextResponse.json({ ok: true });
}
