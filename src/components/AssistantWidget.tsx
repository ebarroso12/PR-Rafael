"use client";

import { useState } from "react";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/track";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Como funcionam os atendimentos?",
    a: "O processo normalmente é organizado em oito encontros individuais, respeitando a história, o momento e a responsabilidade de cada homem. Cada encontro é reservado e conduzido pelo Pr. Rafael Melo.",
  },
  {
    q: "Como a Psicanálise pode me ajudar?",
    a: "A escuta psicanalítica ajuda a nomear reações, dores e responsabilidades que sustentam ciclos que você quer interromper — trazendo clareza sobre padrões que se repetem no trabalho, na família e na fé.",
  },
  {
    q: "Como a Bíblia pode orientar meu recomeço?",
    a: "Princípios bíblicos caminham lado a lado com a consciência emocional, sem atalhos e sem discursos vazios — como base para decisões mais maduras.",
  },
  {
    q: "Como a fé cristã acompanha esse processo?",
    a: "A fé é tratada com verdade e profundidade, como parte da identidade e do propósito de quem busca reconstrução — nunca como discurso motivacional vazio.",
  },
  {
    q: "O que é Teologia na prática?",
    a: "É colocar princípios de fé em diálogo direto com escolhas reais: família, trabalho, liderança e propósito, transformando reflexão em direção concreta.",
  },
  {
    q: "Como posso dar o primeiro passo?",
    a: "Comece com uma conversa pelo WhatsApp. O Pr. Rafael Melo vai entender seu momento e explicar como funcionam os próximos passos, sem julgamento e sem promessas fáceis.",
  },
];

export default function AssistantWidget() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div id="assistente" className="border border-gold/30 bg-ink-soft/60 p-6 sm:p-10">
      <span className="inline-flex items-center gap-2 border border-gold/40 px-3 py-1 text-[11px] font-semibold tracking-label text-gold">
        <SparkleIcon /> ASSISTENTE RENOVAH
      </span>
      <h3 className="mt-5 font-display text-3xl font-bold text-parchment-soft sm:text-4xl">
        Comece pela pergunta que você tem coragem de fazer hoje.
      </h3>
      <p className="mt-4 max-w-2xl text-muted-dark">
        Um espaço para explicar atendimentos, Psicanálise, Bíblia, fé cristã, Teologia e os próximos
        passos — sem julgamento e sem promessas fáceis. As respostas abaixo foram preparadas pela
        equipe RenovaH.
      </p>

      <div className="mt-8 grid gap-3">
        {FAQ.map((item, i) => (
          <div key={item.q} className="border border-ink-line">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-parchment-soft hover:text-gold"
            >
              {item.q}
              <span className="ml-4 text-gold">{openIndex === i ? "–" : "+"}</span>
            </button>
            {openIndex === i && (
              <p className="border-t border-ink-line px-5 py-4 text-sm leading-relaxed text-muted-dark">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>

      <a
        href={whatsappUrl("Olá! Vim pelo site da RenovaH e gostaria de conversar.")}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", "assistant_widget")}
        className="mt-8 inline-flex items-center gap-2 border border-gold px-6 py-3 text-sm font-semibold tracking-label text-gold transition hover:bg-gold hover:text-ink"
      >
        FALAR COM A EQUIPE PELO WHATSAPP
      </a>

      <p className="mt-6 text-xs leading-relaxed text-muted-dark/70">
        A assistente não substitui atendimento individual, cuidado profissional, liderança pastoral
        local ou suporte de emergência.
      </p>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M12 2l1.8 5.6L19 9.5l-5.2 1.9L12 17l-1.8-5.6L5 9.5l5.2-1.9L12 2z" />
    </svg>
  );
}
