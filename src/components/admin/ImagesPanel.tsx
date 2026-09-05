"use client";

import { useEffect, useState } from "react";

const SLOTS: { key: "hero" | "portrait" | "bible"; label: string; hint: string }[] = [
  { key: "hero", label: "Foto do topo (hero)", hint: "Usada na primeira tela do site." },
  { key: "portrait", label: "Retrato do Pr. Rafael", hint: "Usada na seção \"Pr. Rafael Melo\"." },
  { key: "bible", label: "Foto de fé / Bíblia", hint: "Usada na seção \"Fé que sustenta a direção\"." },
];

export default function ImagesPanel() {
  const [images, setImages] = useState<Record<string, string | undefined>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/content");
    const data = await res.json();
    setImages(data.images ?? {});
  }

  useEffect(() => {
    load();
  }, []);

  async function handleUpload(slot: string, file: File) {
    setUploading(slot);
    setMessage(null);
    const form = new FormData();
    form.append("file", file);
    form.append("slot", slot);
    const res = await fetch("/api/admin/images", { method: "POST", body: form });
    const data = await res.json();
    setUploading(null);
    if (!res.ok) {
      setMessage("Não foi possível enviar a imagem. Tente um arquivo menor (até 8MB).");
      return;
    }
    setImages((prev) => ({ ...prev, [`${slot}_url`]: data.url }));
    setMessage("Imagem atualizada no site.");
  }

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {SLOTS.map((slot) => {
        const url = images[`${slot.key}_url`];
        return (
          <div key={slot.key} className="border border-ink-line bg-ink-soft p-4">
            <div className="aspect-[4/3] w-full overflow-hidden bg-ink">
              {url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={url} alt={slot.label} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-dark">
                  Sem imagem — usando placeholder no site
                </div>
              )}
            </div>
            <p className="mt-3 text-sm font-medium text-parchment-soft">{slot.label}</p>
            <p className="text-xs text-muted-dark">{slot.hint}</p>
            <label className="mt-3 inline-flex cursor-pointer items-center border border-gold/50 px-3 py-2 text-xs font-semibold tracking-label text-gold hover:bg-gold hover:text-ink">
              {uploading === slot.key ? "ENVIANDO…" : "TROCAR IMAGEM"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(slot.key, file);
                }}
              />
            </label>
          </div>
        );
      })}
      {message && <p className="col-span-full text-sm text-gold">{message}</p>}
    </div>
  );
}
