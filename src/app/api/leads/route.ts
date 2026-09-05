import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { name, whatsapp, message, sourcePath } = await req.json();
  if (!name || !whatsapp) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const { error } = await supabase.from("leads").insert({
    name: String(name).slice(0, 200),
    whatsapp: String(whatsapp).slice(0, 40),
    message: message ? String(message).slice(0, 2000) : null,
    source_path: sourcePath ?? null,
  });

  if (error) {
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }

  await supabase.from("site_events").insert({
    type: "form_submit",
    target: "lead_form",
    path: sourcePath ?? null,
  });

  return NextResponse.json({ ok: true });
}
