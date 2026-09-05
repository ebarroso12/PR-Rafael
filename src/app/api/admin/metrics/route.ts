import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/adminSession";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { data, error } = await supabase.rpc("rpc_admin_metrics", { p_token: session.token });
  if (error) return NextResponse.json({ error: "server_error" }, { status: 500 });
  return NextResponse.json(data);
}
