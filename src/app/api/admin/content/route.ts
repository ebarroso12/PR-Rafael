import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/adminSession";

export async function GET() {
  const { data, error } = await supabase.rpc("rpc_public_content");
  if (error) return NextResponse.json({ error: "server_error" }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { key, value } = await req.json();
  const { data, error } = await supabase.rpc("rpc_admin_update_content", {
    p_token: session.token,
    p_key: key,
    p_value: value,
  });
  if (error || !data || data.error) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
