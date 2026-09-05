"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MetricsPanel from "@/components/admin/MetricsPanel";
import LeadsPanel from "@/components/admin/LeadsPanel";
import ImagesPanel from "@/components/admin/ImagesPanel";
import InvitesPanel from "@/components/admin/InvitesPanel";

type User = { id: number; email: string; name: string | null; role: string };
type Tab = "metrics" | "leads" | "images" | "invites";

const TABS: { key: Tab; label: string }[] = [
  { key: "metrics", label: "Métricas" },
  { key: "leads", label: "Leads" },
  { key: "images", label: "Imagens" },
  { key: "invites", label: "Administradores" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tab, setTab] = useState<Tab>("metrics");

  useEffect(() => {
    fetch("/api/admin/me").then(async (res) => {
      if (!res.ok) {
        router.replace("/admin/login");
        return;
      }
      const data = await res.json();
      if (data.user.must_change_password) {
        router.replace("/admin/change-password");
        return;
      }
      setUser(data.user);
    });
  }, [router]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  if (!user) {
    return <div className="flex min-h-screen items-center justify-center text-muted-dark">Carregando…</div>;
  }

  return (
    <div>
      <header className="border-b border-ink-line/60 bg-ink-soft">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div>
            <p className="text-xs font-semibold tracking-label text-gold">CENTRAL RENOVAH</p>
            <p className="text-sm text-muted-dark">
              {user.name || user.email} · {user.role}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-xs tracking-label text-muted-dark hover:text-gold">
              VER SITE
            </a>
            <button
              onClick={handleLogout}
              className="border border-ink-line px-4 py-2 text-xs tracking-label text-muted-dark hover:border-gold hover:text-gold"
            >
              SAIR
            </button>
          </div>
        </div>
      </header>

      <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5 pt-6 sm:px-8">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition ${
              tab === t.key
                ? "border-gold text-gold"
                : "border-transparent text-muted-dark hover:text-parchment-soft"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        {tab === "metrics" && <MetricsPanel />}
        {tab === "leads" && <LeadsPanel />}
        {tab === "images" && <ImagesPanel />}
        {tab === "invites" && <InvitesPanel canInvite={user.role !== "viewer"} />}
      </main>
    </div>
  );
}
