"use client";

import { useEffect, useState } from "react";

type Metrics = {
  pageviews: number;
  whatsapp_clicks: number;
  cta_clicks: number;
  leads_total: number;
  leads_new: number;
  events_last_14_days: { date: string; pageviews: number; clicks: number }[];
};

export default function MetricsPanel() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    fetch("/api/admin/metrics")
      .then((r) => r.json())
      .then(setMetrics);
  }, []);

  if (!metrics) return <p className="text-muted-dark">Carregando métricas…</p>;

  const cards = [
    { label: "Visualizações da página", value: metrics.pageviews },
    { label: "Cliques no WhatsApp", value: metrics.whatsapp_clicks },
    { label: "Cliques em botões (CTA)", value: metrics.cta_clicks },
    { label: "Leads recebidos", value: metrics.leads_total },
    { label: "Leads novos (não contatados)", value: metrics.leads_new },
  ];

  const maxDay = Math.max(1, ...metrics.events_last_14_days.map((d) => d.pageviews + d.clicks));

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="border border-ink-line bg-ink-soft p-5">
            <p className="text-3xl font-bold text-gold">{c.value}</p>
            <p className="mt-1 text-xs text-muted-dark">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-ink-line bg-ink-soft p-5">
        <p className="mb-4 text-sm font-semibold text-parchment-soft">Últimos 14 dias</p>
        <div className="flex h-32 items-end gap-2">
          {metrics.events_last_14_days.map((d) => (
            <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full flex-col justify-end gap-0.5" style={{ height: "100%" }}>
                <div
                  className="w-full bg-gold/70"
                  style={{ height: `${(d.pageviews / maxDay) * 100}%` }}
                  title={`${d.pageviews} visualizações`}
                />
                <div
                  className="w-full bg-gold-deep/70"
                  style={{ height: `${(d.clicks / maxDay) * 100}%` }}
                  title={`${d.clicks} cliques`}
                />
              </div>
              <span className="text-[9px] text-muted-dark">{d.date.slice(8, 10)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-4 text-xs text-muted-dark">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 bg-gold/70" /> visualizações
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 bg-gold-deep/70" /> cliques
          </span>
        </div>
      </div>
    </div>
  );
}
