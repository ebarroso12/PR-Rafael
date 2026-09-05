"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: number;
  name: string;
  whatsapp: string;
  message: string | null;
  status: "new" | "contacted" | "scheduled" | "archived";
  created_at: string;
};

const STATUS_LABEL: Record<Lead["status"], string> = {
  new: "Novo",
  contacted: "Contatado",
  scheduled: "Agendado",
  archived: "Arquivado",
};

export default function LeadsPanel() {
  const [leads, setLeads] = useState<Lead[] | null>(null);

  async function load() {
    const res = await fetch("/api/admin/leads");
    const data = await res.json();
    setLeads(data.leads ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: number, status: Lead["status"]) {
    setLeads((prev) => prev?.map((l) => (l.id === id ? { ...l, status } : l)) ?? null);
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  }

  if (!leads) return <p className="text-muted-dark">Carregando leads…</p>;
  if (leads.length === 0) return <p className="text-muted-dark">Nenhum lead recebido ainda.</p>;

  return (
    <div className="overflow-x-auto border border-ink-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-ink-soft text-xs uppercase tracking-label text-muted-dark">
          <tr>
            <th className="px-4 py-3">Nome</th>
            <th className="px-4 py-3">WhatsApp</th>
            <th className="px-4 py-3">Mensagem</th>
            <th className="px-4 py-3">Recebido em</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t border-ink-line">
              <td className="px-4 py-3 font-medium text-parchment-soft">{lead.name}</td>
              <td className="px-4 py-3">
                <a
                  href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold underline underline-offset-4"
                >
                  {lead.whatsapp}
                </a>
              </td>
              <td className="max-w-xs px-4 py-3 text-muted-dark">{lead.message || "—"}</td>
              <td className="px-4 py-3 text-muted-dark">
                {new Date(lead.created_at).toLocaleString("pt-BR")}
              </td>
              <td className="px-4 py-3">
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value as Lead["status"])}
                  className="border border-ink-line bg-ink px-2 py-1 text-xs text-parchment-soft"
                >
                  {Object.entries(STATUS_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
