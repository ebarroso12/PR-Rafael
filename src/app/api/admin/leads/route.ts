import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/adminSession";

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const limit = Number(req.nextUrl.searchParams.get("limit") ?? 100);
  const offset = Number(req.nextUrl.searchParams.get("offset") ?? 0);

  const { data, error } = await supabase.rpc("rpc_admin_list_leads", {
    p_token: session.token,
    p_limit: limit,
    p_offset: offset,
  });
  if (error) return NextResponse.json({ error: "server_error" }, { status: 500 });
  return NextResponse.json({ leads: data });
}

export async function PATCH(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id, status } = await req.json();
  const { error } = await supabase.rpc("rpc_admin_update_lead", {
    p_token: session.token,
    p_lead_id: id,
    p_status: status,
  });
  if (error) return NextResponse.json({ error: "server_error" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
