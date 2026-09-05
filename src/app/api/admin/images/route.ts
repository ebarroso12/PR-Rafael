import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/adminSession";

const SLOTS = ["hero", "portrait", "bible"] as const;
type Slot = (typeof SLOTS)[number];

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (session.user.role === "viewer") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const slot = form.get("slot") as Slot | null;

  if (!file || !slot || !SLOTS.includes(slot)) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "not_an_image" }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "file_too_large" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${slot}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("site-assets")
    .upload(path, file, { contentType: file.type, upsert: true });

  if (uploadError) {
    return NextResponse.json({ error: "upload_failed", detail: uploadError.message }, { status: 500 });
  }

  const { data: pub } = supabase.storage.from("site-assets").getPublicUrl(path);
  const publicUrl = pub.publicUrl;

  // Merge into the existing "images" content record.
  const { data: current } = await supabase.rpc("rpc_public_content");
  const images = { ...(current?.images ?? {}), [`${slot}_url`]: publicUrl };

  const { data, error } = await supabase.rpc("rpc_admin_update_content", {
    p_token: session.token,
    p_key: "images",
    p_value: images,
  });
  if (error || !data || data.error) {
    return NextResponse.json({ error: "content_update_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, url: publicUrl, slot });
}
