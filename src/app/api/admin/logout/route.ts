import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getSessionToken, clearSessionCookie } from "@/lib/adminSession";

export async function POST() {
  const token = await getSessionToken();
  if (token) {
    await supabase.rpc("rpc_admin_logout", { p_token: token });
  }
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
