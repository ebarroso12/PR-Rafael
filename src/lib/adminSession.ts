import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export const SESSION_COOKIE = "renovah_admin_session";

export async function getSessionToken(): Promise<string | null> {
    const store = await cookies();
    return store.get(SESSION_COOKIE)?.value ?? null;
}

export async function setSessionCookie(token: string) {
    const store = await cookies();
    store.set(SESSION_COOKIE, token, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days, mirrors the DB session expiry
    });
}

export type AdminUser = {
    id: number;
    email: string;
    name: string | null;
    role: "owner" | "admin" | "viewer";
    must_change_password: boolean;
};

/** Resolves the current admin session, or null if missing/expired. */
export async function requireAdmin(): Promise<{ user: AdminUser; token: string } | null> {
    const token = await getSessionToken();
    if (!token) return null;
    const { data, error } = await supabase.rpc("rpc_admin_me", { p_token: token });
    if (error || !data || data.error) return null;
    return { user: data as AdminUser, token };
}

export async function clearSessionCookie() {
    const store = await cookies();
    store.delete(SESSION_COOKIE);
}
