import Header from "@/components/Header";
import PhotoPanel from "@/components/PhotoPanel";
import LeadForm from "@/components/LeadForm";
import AssistantWidget from "@/components/AssistantWidget";
import WhatsAppCta from "@/components/WhatsAppCta";
import PageviewTracker from "@/components/PageviewTracker";
import { supabase } from "@/lib/supabase";
import { formatWhatsappDisplay } from "@/lib/whatsapp";

export const revalidate = 0;

type ImagesContent = { hero_url?: string; portrait_url?: string; bible_url?: string };

async function getImages(): Promise<ImagesContent> {
  try {
    const { data } = await supabase.rpc("rpc_public_content");
    return (data?.images as ImagesContent) ?? {};
  } catch {
    return {};
  }
}

export default async function Home() {
  const images = await getImages();

  return (
    <>
      <PageviewTracker />
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-ink-line/60">
          <div className="absolute inset-0">
            <PhotoPanel src={images.hero_url} alt="Pr. Rafael Melo" className="h-full w-full" icon="cross" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          </div>

          <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-20">
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-label text-gold">
              <span className="h-px w-8 bg-gold" />
              PSICANÁLISE · FÉ · MENTORIA PARA HOMENS
            </div>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.1] text-parchment-soft sm:text-6xl">
              O homem que decide olhar para dentro recupera o poder de{" "}
              <span className="text-gold font-display italic">conduzir a própria história.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-dark sm:text-lg">
              Atendimento individual, apoio e mentoria para homens que desejam restaurar a identidade,
              fortalecer a família e voltar a caminhar com clareza diante de Deus e de si mesmos.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <WhatsAppCta
                message="Olá! Vim pelo site da RenovaH e quero iniciar uma conversa."
                target="hero_primary"
                className="bg-gold px-6 py-3 text-sm font-semibold tracking-label text-ink transition hover:bg-gold-soft"
              >
                INICIAR UMA CONVERSA
              </WhatsAppCta>
              <a
                href="#processo"
                className="border border-parchment-soft/40 px-6 py-3 text-sm font-semibold tracking-label text-parchment-soft transition hover:border-gold hover:text-gold"
              >
                CONHEÇA O PROCESSO
              </a>
            </div>

            <p className="mt-10 text-xs font-semibold tracking-label text-muted-dark">
              PR. RAFAEL MELO · PASTOR · PSICANALISTA · MENTOR DE HOMENS
            </p>

            <blockquote className="mt-4 max-w-md border-l-2 border-gold pl-4 font-display text-lg italic text-parchment-soft">
              &ldquo;Homens restaurados fortalecem famílias inteiras.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* PROPOSTA */}
        <section id="proposta" className="bg-parchment text-ink">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="mb-4 text-xs font-semibold tracking-label text-gold-deep">
              PROFUNDIDADE SEM EXPOSIÇÃO
            </div>
            <p className="max-w-2xl text-lg text-muted-light">
              Para homens que sustentam muita coisa e reconhecem que a força verdadeira também sabe
              pedir ajuda.
            </p>
            <h2 className="mt-6 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-5xl">
              Por fora, você continua. Por dentro, talvez seja hora de{" "}
              <span className="text-gold-deep">reconstruir com consciência.</span>
            </h2>

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <p className="border-l-2 border-gold-deep/60 pl-5 text-muted-light">
                Trabalho, família, fé e liderança podem coexistir com culpa, ansiedade, conflitos e uma
                sensação silenciosa de desconexão. Isso não diminui você; revela que algo precisa de
                escuta.
              </p>
              <p className="border-l-2 border-gold-deep/60 pl-5 text-muted-light">
                A RenovaH oferece um lugar seguro e confidencial para compreender a própria história,
                nomear o que pesa e escolher uma resposta consciente diante de Deus, da família e de si
                mesmo.
              </p>
            </div>
          </div>
        </section>

        {/* PROCESSO - 4 pilares */}
        <section id="processo" className="bg-ink">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
            {[
              {
                n: "01",
                title: "Atendimento individual",
                body: "Um encontro reservado para elaborar o que você vive e reencontrar direção.",
              },
              {
                n: "02",
                title: "Leitura dos padrões",
                body: "Nomeamos reações, dores e responsabilidades que roubam sua clareza e sustentam ciclos que você quer interromper.",
              },
              {
                n: "03",
                title: "Fé com verdade",
                body: "Princípios bíblicos, consciência emocional e perguntas estratégicas caminham sem atalhos e sem discursos vazios.",
              },
              {
                n: "04",
                title: "Direção que se sustenta",
                body: "Reflexões e exercícios transformam intenção em escolhas maduras para a vida, a família e o propósito.",
              },
            ].map((step) => (
              <div key={step.n} className="border-t border-ink-line pt-6">
                <span className="font-display text-sm font-bold text-gold">{step.n}</span>
                <h3 className="mt-2 font-display text-2xl font-bold text-parchment-soft sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-md text-muted-dark">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
            <p className="max-w-3xl border-t border-ink-line pt-6 text-sm text-muted-dark/80">
              Os atendimentos da RenovaH não substituem tratamento médico, psicológico, psiquiátrico ou
              atendimento de urgência. Cuidado responsável também sabe encaminhar quando necessário.
            </p>
          </div>
        </section>

        {/* PR RAFAEL BIO */}
        <section id="rafael" className="bg-ink-soft">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center">
            <PhotoPanel
              src={images.portrait_url}
              alt="Retrato do Pr. Rafael Melo"
              className="aspect-[4/5] w-full"
              icon="compass"
            />
            <div>
              <div className="mb-4 text-xs font-semibold tracking-label text-gold">PR. RAFAEL MELO</div>
              <h2 className="font-display text-3xl font-bold leading-tight text-parchment-soft sm:text-4xl">
                Autoridade que começa em uma história vivida com Deus.
              </h2>
              <p className="mt-5 text-muted-dark">
                Pastor, psicanalista e mentor de homens, Rafael conduz atendimentos e mentorias para
                quem deseja tratar a própria história com verdade, presença e responsabilidade.
              </p>
              <p className="mt-4 text-muted-dark">
                Sua forma de acompanhar nasce da caminhada ministerial, da escuta psicanalítica e da
                convicção de que ninguém precisa ser definido para sempre pelo que doeu.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-[11px] font-semibold tracking-label text-gold">
                {["PASTOR", "PSICANALISTA", "MENTOR DE HOMENS"].map((t) => (
                  <span key={t} className="border border-gold/40 px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>
              <blockquote className="mt-8 border border-gold/30 bg-ink p-6 font-display text-xl italic text-parchment-soft">
                &ldquo;A verdadeira mudança começa quando a verdade encontra um coração disposto.&rdquo;
              </blockquote>
            </div>
          </div>
        </section>

        {/* FÉ / BÍBLIA */}
        <section className="bg-ink">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="mb-4 text-xs font-semibold tracking-label text-gold">
                PSICANÁLISE, FÉ E DIREÇÃO
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight text-parchment-soft sm:text-5xl">
                A força não está em negar a dor. Está em saber o que fazer com ela.
              </h2>
            </div>
            <div className="relative order-1 lg:order-2">
              <PhotoPanel
                src={images.bible_url}
                alt="Momento de fé e oração"
                className="aspect-[4/3] w-full"
                icon="book"
              />
              <span className="absolute -bottom-4 left-4 border border-gold/40 bg-ink px-4 py-2 text-xs font-semibold tracking-label text-gold sm:left-8">
                FÉ QUE SUSTENTA A DIREÇÃO
              </span>
            </div>
          </div>
        </section>

        {/* PROCESSO DETALHADO */}
        <section className="bg-parchment text-ink">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">
                A mudança não precisa ser confusa.
              </h2>
              <p className="mt-5 max-w-md text-muted-light">
                O processo normalmente é organizado em oito encontros individuais, respeitando
                história, momento e responsabilidade.
              </p>
            </div>
            <div className="flex aspect-square w-full max-w-xs items-center justify-center border border-gold-deep/40 justify-self-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gold-deep/50">
                <svg viewBox="0 0 24 24" className="h-9 w-9 text-gold-deep" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M12 3c-4 3-4 7-4 9a4 4 0 008 0c0-2 0-6-4-9z" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ASSISTENTE */}
        <section className="bg-ink">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <AssistantWidget />
          </div>
        </section>

        {/* CTA FINAL + FORM */}
        <section id="contato" className="bg-ink-soft">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight text-parchment-soft sm:text-5xl">
                Um novo tempo começa com uma decisão honesta.
              </h2>
              <p className="mt-5 max-w-md text-muted-dark">
                Sua história não precisa continuar sendo definida pelo que doeu. Quando estiver pronto,
                comece com uma conversa. Há direção possível para o homem que decide não caminhar
                sozinho.
              </p>
              <p className="mt-6 text-sm text-muted-dark">
                Prefere falar direto? WhatsApp{" "}
                <WhatsAppCta
                  message="Olá! Vim pelo site da RenovaH e quero saber mais."
                  target="contact_section"
                  className="text-gold underline underline-offset-4"
                >
                  {formatWhatsappDisplay()}
                </WhatsAppCta>
              </p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink-line/60 bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-ink-line/60 pb-8">
          <div>
            <span className="font-display text-lg font-bold tracking-wide text-parchment-soft">
              RENOVAH
            </span>
            <p className="text-xs tracking-label text-gold/80">
              PSICANÁLISE, FÉ E DIREÇÃO PARA HOMENS
            </p>
          </div>
          <div className="flex gap-6 text-xs font-semibold tracking-label text-muted-dark">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              YOUTUBE
            </a>
            <WhatsAppCta message="Olá! Vim pelo site da RenovaH." target="footer" className="hover:text-gold">
              WHATSAPP
            </WhatsAppCta>
            <a href="/admin" className="hover:text-gold">
              ACESSO RESERVADO
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 pt-8 text-xs text-muted-dark sm:flex-row sm:items-end">
          <p className="max-w-md">
            © {new Date().getFullYear()} RenovaH. Atendimento individual, apoio e mentoria. O trabalho
            não substitui cuidados médicos, psicológicos, psiquiátricos ou atendimento de urgência.
            Desenvolvido por © Dr. Edson Barroso.
          </p>
          <a href="#top" className="border border-ink-line px-4 py-2 tracking-label hover:border-gold hover:text-gold">
            VOLTAR AO TOPO ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
