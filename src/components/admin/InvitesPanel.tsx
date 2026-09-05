"use client";

import { useEffect, useState } from "react";

type Invite = {
  id: number;
  email: string;
  role: string;
  expires_at: string;
  accepted_at: string | null;
  created_at: string;
};

export default function InvitesPanel({ canInvite }: { canInvite: boolean }) {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [link, setLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/invites");
    const data = await res.json();
    setInvites(data.invites ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setLink(null);
    const res = await fetch("/api/admin/invites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError("Não foi possível gerar o convite.");
      return;
    }
    setLink(data.inviteUrl);
    setEmail("");
    load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {canInvite && (
        <div>
          <form onSubmit={handleInvite} className="grid gap-3 border border-ink-line bg-ink-soft p-5">
            <p className="text-sm font-medium text-parchment-soft">Convidar novo administrador</p>
            <input
              type="email"
              required
              placeholder="e-mail do convidado"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-ink-line bg-ink px-3 py-2 text-sm text-parchment-soft outline-none focus:border-gold"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-ink-line bg-ink px-3 py-2 text-sm text-parchment-soft"
            >
              <option value="admin">Admin (gerencia leads e conteúdo)</option>
              <option value="viewer">Somente visualização</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="bg-gold px-4 py-2 text-xs font-semibold tracking-label text-ink hover:bg-gold-soft disabled:opacity-60"
            >
              {loading ? "GERANDO…" : "GERAR LINK DE CONVITE"}
            </button>
            {error && <p className="text-xs text-red-400">{error}</p>}
            {link && (
              <div className="mt-2 break-all border border-gold/40 bg-ink p-3 text-xs text-gold">
                {link}
                <p className="mt-1 text-muted-dark">
                  Copie e envie este link diretamente para o convidado (válido por 3 dias). O envio
                  automático por e-mail ainda não está configurado.
                </p>
              </div>
            )}
          </form>
        </div>
      )}

      <div className="overflow-x-auto border border-ink-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-soft text-xs uppercase tracking-label text-muted-dark">
            <tr>
              <th className="px-4 py-3">E-mail</th>
              <th className="px-4 py-3">Papel</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {invites.map((inv) => (
              <tr key={inv.id} className="border-t border-ink-line">
                <td className="px-4 py-3 text-parchment-soft">{inv.email}</td>
                <td className="px-4 py-3 text-muted-dark">{inv.role}</td>
                <td className="px-4 py-3 text-muted-dark">
                  {inv.accepted_at
                    ? "Aceito"
                    : new Date(inv.expires_at) < new Date()
                      ? "Expirado"
                      : "Pendente"}
                </td>
              </tr>
            ))}
            {invites.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-4 text-center text-muted-dark">
                  Nenhum convite enviado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
