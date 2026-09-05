import { createClient } from "@supabase/supabase-js";

// This is Supabase's "anon"/"publishable" key: it is designed to be public
// (shipped to the browser), the same way a Firebase or Stripe publishable
// key is. Every privileged operation (admin login, reading leads, editing
// site content, invites) is locked behind Postgres Row Level Security plus
// SECURITY DEFINER RPC functions that check a hashed session token - see
// supabase/schema.sql. There is no service-role key anywhere in this repo.
// Fallback literals so the site works even if the Vercel project's env vars
// are never configured by hand. This is safe specifically because these are
// Supabase's public "anon" values (see note above) - never do this with a
// real secret.
const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://uggggdykdolslflocshu.supabase.co";
const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZ2dnZHlrZG9sc2xmbG9jc2h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2Mjk2MDcsImV4cCI6MjEwNDIwNTYwN30.dpC_CEi3gGB5ovr1BSEBdDq_kHanaQNopy5-894i0PE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
});
