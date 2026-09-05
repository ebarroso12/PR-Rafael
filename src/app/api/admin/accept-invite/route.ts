import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { setSessionCookie } from "@/lib/adminSession";

export async function POST(req: NextRequest) {
  const { inviteToken, name, password } = await req.json();
  if (!inviteToken || !password || password.length < 8) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const { data, error } = await supabase.rpc("rpc_accept_invite", {
    p_invite_token: inviteToken,
    p_name: name ?? null,
    p_new_password: password,
  });
  if (error || !data || data.error) {
    return NextResponse.json({ error: data?.error ?? "server_error" }, { status: 400 });
  }

  await setSessionCookie(data.token);
  return NextResponse.json({ ok: true });
}
