"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError("E-mail ou senha inválidos.");
        setLoading(false);
        return;
      }
      router.push(data.user.must_change_password ? "/admin/change-password" : "/admin");
    } catch {
      setError("Não foi possível entrar agora. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md border border-gold/30 bg-ink-soft p-8">
        <p className="text-center text-xs font-semibold tracking-label text-gold">CENTRAL RENOVAH</p>
        <h1 className="mt-3 text-center font-display text-3xl font-bold text-parchment-soft">
          Acesso reservado.
        </h1>
        <p className="mt-2 text-center text-sm text-muted-dark">
          Entre para acessar a central de governança da RenovaH.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm text-muted-dark">
            E-mail
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-ink-line bg-ink px-4 py-3 text-parchment-soft outline-none focus:border-gold"
            />
          </label>
          <label className="grid gap-2 text-sm text-muted-dark">
            Senha
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
            {loading ? "ENTRANDO…" : "ENTRAR COM SEGURANÇA"}
          </button>
        </form>
      </div>
    </div>
  );
}
