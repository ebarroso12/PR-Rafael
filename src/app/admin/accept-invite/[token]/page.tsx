"use client";

import { useState, use as usePromise } from "react";
import { useRouter } from "next/navigation";

export default function AcceptInvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = usePromise(params);
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setError("Use pelo menos 8 caracteres.");
      return;
    }
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/accept-invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteToken: token, name, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(
        data.error === "invalid_or_expired_invite"
          ? "Este convite não é mais válido. Peça um novo link."
          : "Não foi possível concluir agora."
      );
      setLoading(false);
      return;
    }
    router.push("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md border border-gold/30 bg-ink-soft p-8">
        <p className="text-center text-xs font-semibold tracking-label text-gold">
          CONVITE RENOVAH
        </p>
        <h1 className="mt-3 text-center font-display text-2xl font-bold text-parchment-soft">
          Crie seu acesso administrativo
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm text-muted-dark">
            Seu nome
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-ink-line bg-ink px-4 py-3 text-parchment-soft outline-none focus:border-gold"
            />
          </label>
          <label className="grid gap-2 text-sm text-muted-dark">
            Crie uma senha
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-ink-line bg-ink px-4 py-3 text-parchment-soft outline-none focus:border-gold"
            />
          </label>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-gold px-6 py-3 text-sm font-semibold tracking-label text-ink transition hover:bg-gold-soft disabled:opacity-60"
          >
            {loading ? "CRIANDO…" : "CRIAR ACESSO"}
          </button>
        </form>
      </div>
    </div>
  );
}
