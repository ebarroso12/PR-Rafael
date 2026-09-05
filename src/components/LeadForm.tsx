"use client";

import { useState } from "react";
import { track } from "@/lib/track";

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, whatsapp, message, sourcePath: window.location.pathname }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      track("cta_click", "lead_form_submit");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-gold/40 bg-ink-soft p-6 text-center">
        <p className="font-display text-xl text-parchment-soft">Mensagem recebida.</p>
        <p className="mt-2 text-sm text-muted-dark">
          Obrigado, {name.split(" ")[0]}. A equipe RenovaH vai retornar pelo WhatsApp em breve.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-muted-dark">
          Nome
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-ink-line bg-ink px-4 py-3 text-parchment-soft outline-none focus:border-gold"
            placeholder="Seu nome"
          />
        </label>
        <label className="grid gap-2 text-sm text-muted-dark">
          WhatsApp
          <input
            required
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="border border-ink-line bg-ink px-4 py-3 text-parchment-soft outline-none focus:border-gold"
            placeholder="(16) 99105-3955"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm text-muted-dark">
        Mensagem (opcional)
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="border border-ink-line bg-ink px-4 py-3 text-parchment-soft outline-none focus:border-gold"
          placeholder="Conte, em poucas linhas, o que te trouxe até aqui."
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 bg-gold px-6 py-3 text-sm font-semibold tracking-label text-ink transition hover:bg-gold-soft disabled:opacity-60"
      >
        {status === "sending" ? "ENVIANDO…" : "QUERO SABER MAIS"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-400">Não foi possível enviar agora. Tente novamente em instantes.</p>
      )}
    </form>
  );
}
