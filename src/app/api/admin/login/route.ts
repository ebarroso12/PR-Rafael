import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { setSessionCookie } from "@/lib/adminSession";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const { data, error } = await supabase.rpc("rpc_admin_login", {
    p_email: email,
    p_password: password,
  });

  if (error) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
  if (!data || data.error) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  await setSessionCookie(data.token);
  return NextResponse.json({ user: data.user });
}
