"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me").then((res) => {
      if (!res.ok) router.replace("/admin/login");
      else setChecked(true);
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setError("Use pelo menos 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword: password }),
    });
    if (!res.ok) {
      setError("Não foi possível salvar a senha agora.");
      setLoading(false);
      return;
    }
    router.push("/admin");
  }

  if (!checked) return null;

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md border border-gold/30 bg-ink-soft p-8">
        <p className="text-center text-xs font-semibold tracking-label text-gold">
          PRIMEIRO ACESSO
        </p>
        <h1 className="mt-3 text-center font-display text-2xl font-bold text-parchment-soft">
          Defina uma nova senha
        </h1>
        <p className="mt-2 text-center text-sm text-muted-dark">
          Por segurança, troque a senha temporária antes de continuar.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm text-muted-dark">
            Nova senha
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-ink-line bg-ink px-4 py-3 text-parchment-soft outline-none focus:border-gold"
            />
          </label>
          <label className="grid gap-2 text-sm text-muted-dark">
            Confirmar senha
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="border border-ink-line bg-ink px-4 py-3 text-parchment-soft outline-none focus:border-gold"
            />
          </label>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-gold px-6 py-3 text-sm font-semibold tracking-label text-ink transition hover:bg-gold-soft disabled:opacity-60"
          >
            {loading ? "SALVANDO…" : "SALVAR E CONTINUAR"}
          </button>
        </form>
      </div>
    </div>
  );
}
