import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/adminSession";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { data, error } = await supabase.rpc("rpc_admin_list_invites", { p_token: session.token });
  if (error) return NextResponse.json({ error: "server_error" }, { status: 500 });
  return NextResponse.json({ invites: data });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (session.user.role === "viewer") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { email, role } = await req.json();
  const { data, error } = await supabase.rpc("rpc_admin_create_invite", {
    p_token: session.token,
    p_email: email,
    p_role: role ?? "admin",
  });
  if (error || !data || data.error) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  const origin = req.nextUrl.origin;
  const inviteUrl = `${origin}/admin/accept-invite/${data.invite_token}`;
  return NextResponse.json({ inviteUrl, expiresInDays: data.expires_in_days });
}
