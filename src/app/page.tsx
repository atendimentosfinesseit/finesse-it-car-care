import Image from "next/image";
import {
  MessageCircle,
  Check,
  Sparkles,
  ShieldCheck,
  Star,
  Gift,
  ArrowRight,
} from "lucide-react";
import {
  SERVICOS,
  CATEGORIAS,
  linkWhatsApp,
  type Servico,
} from "@/lib/catalogo";
import { formatBRL } from "@/lib/valor";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";
import { PORTFOLIO } from "@/lib/portfolio";

const MSG_GERAL =
  "Olá! Vim pelo catálogo da Finesse It Car Care e gostaria de agendar um serviço.";

function precoLabel(s: Servico): string {
  if (s.cortesia) return "Cortesia";
  if (s.preco === null) return "Sob consulta";
  return formatBRL(s.preco);
}

/* ── Header fixo ───────────────────────────────────────────── */
function Header() {
  return (
    <header className="glass sticky top-0 z-40 border-b border-lilac/15">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <a href="#topo" className="flex items-center gap-2.5">
          <Image
            src="/mascote.jpg"
            alt=""
            width={38}
            height={38}
            className="rounded-full border border-lilac/60"
          />
          <span className="font-display text-lg font-bold leading-none text-cream">
            Finesse It
            <span className="block text-[11px] font-medium tracking-wide text-lilac-soft">
              Car Care
            </span>
          </span>
        </a>
        <a
          href={linkWhatsApp(MSG_GERAL)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-pink px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-pink-dark"
        >
          <MessageCircle size={16} />
          <span className="hidden sm:inline">Agendar</span>
        </a>
      </div>
    </header>
  );
}

/* ── Hero ──────────────────────────────────────────────────── */
function Hero() {
  const trust = [
    { icon: ShieldCheck, label: "Proteção até 3 anos" },
    { icon: Star, label: "Resultados reais" },
    { icon: MessageCircle, label: "Agende pelo WhatsApp" },
  ];
  return (
    <section id="topo" className="relative overflow-hidden px-5 pt-14 pb-10">
      <div className="rise mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="relative">
          <div className="glow absolute -inset-6 -z-10 rounded-full" aria-hidden />
          <Image
            src="/mascote.jpg"
            alt="Mascote da Finesse It Car Care"
            width={150}
            height={150}
            className="rounded-full border-4 border-lilac shadow-2xl"
            priority
          />
        </div>
        <h1 className="font-display mt-6 text-4xl font-extrabold tracking-tight text-cream sm:text-6xl">
          Finesse It Car Care
        </h1>
        <p className="mt-4 max-w-xl text-lg text-lilac-soft sm:text-xl">
          Estética automotiva de verdade. Seu carro brilhando como novo —
          lavagens, polimentos, proteções e higienizações.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={linkWhatsApp(MSG_GERAL)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-pink px-7 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-pink-dark sm:w-auto"
          >
            <MessageCircle size={20} /> Agendar pelo WhatsApp
          </a>
          <a
            href="#lavagem"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-lilac/50 px-7 py-3.5 text-base font-semibold text-cream hover:border-pink sm:w-auto"
          >
            Ver serviços <ArrowRight size={18} />
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {trust.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-1.5 text-sm text-lilac-soft"
            >
              <Icon size={15} className="text-pink" /> {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Vitrine: carros que passaram pela Finesse It ──────────── */
function Portfolio() {
  if (PORTFOLIO.length === 0) return null;
  return (
    <section
      id="trabalhos"
      className="relative mx-auto mt-4 w-full max-w-6xl px-5"
    >
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-lilac/40" aria-hidden />
        <h2 className="font-display text-center text-2xl font-bold uppercase tracking-wide text-cream sm:text-3xl">
          Trabalhos recentes
        </h2>
        <span className="h-px w-8 bg-lilac/40" aria-hidden />
      </div>
      <p className="mx-auto mb-2 max-w-lg text-center text-sm text-lilac-soft">
        Alguns dos carros que passaram pelas nossas mãos.
      </p>
      <CoverflowCarousel
        slides={PORTFOLIO}
        label="Carros lavados na Finesse It"
        showCaption
        showNavigation
        showPagination
      />
    </section>
  );
}

/* ── Navegação por categoria ───────────────────────────────── */
function CategoryNav() {
  return (
    <nav className="glass sticky top-[62px] z-30 border-y border-lilac/15">
      <div className="no-scrollbar mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-5 py-3">
        {CATEGORIAS.map((cat) => (
          <a
            key={cat.chave}
            href={`#${cat.chave}`}
            className="chip whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium text-lilac-soft"
          >
            {cat.titulo}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ── Card de serviço ───────────────────────────────────────── */
function CardServico({ s }: { s: Servico }) {
  const msg = `Olá! Vim pelo catálogo da Finesse It e quero agendar: ${s.nome}.`;
  return (
    <article className="card-fi hover-lift flex flex-col rounded-3xl p-6">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-2xl font-bold text-cream">{s.nome}</h3>
        {s.destaque && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-pink px-2.5 py-1 text-[11px] font-semibold text-white">
            <Sparkles size={12} /> Mais pedido
          </span>
        )}
      </div>

      {s.descricao && (
        <p className="mt-2 text-sm leading-relaxed text-lilac-soft">
          {s.descricao}
        </p>
      )}

      {s.itens && (
        <ul className="mt-4 flex flex-1 flex-col gap-2">
          {s.itens.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-lilac-soft"
            >
              <Check size={16} className="mt-0.5 shrink-0 text-pink" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex items-end justify-between gap-3 border-t border-lilac/15 pt-4">
        <span className="inline-flex items-center gap-1.5 font-mono text-2xl font-bold text-white">
          {s.cortesia && <Gift size={18} className="text-pink" />}
          {precoLabel(s)}
        </span>
        <a
          href={linkWhatsApp(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-pink px-4 py-2 text-sm font-semibold text-white hover:bg-pink-dark"
        >
          <MessageCircle size={16} /> Agendar
        </a>
      </div>
    </article>
  );
}

/* ── Faixa de CTA (pacotes → sobe o ticket) ────────────────── */
function CTABand() {
  const msg =
    "Olá! Quero saber mais sobre os pacotes mensais da Finesse It Car Care.";
  return (
    <section className="mx-auto mt-20 max-w-6xl px-5">
      <div className="card-fi flex flex-col items-center gap-4 rounded-3xl p-8 text-center sm:p-10">
        <h2 className="font-display text-2xl font-bold text-cream sm:text-3xl">
          Carro sempre impecável, o mês inteiro
        </h2>
        <p className="max-w-lg text-lilac-soft">
          Feche um pacote mensal e mantenha o brilho sem se preocupar — sai mais
          em conta que lavagens avulsas.
        </p>
        <a
          href={linkWhatsApp(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-pink px-7 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-pink-dark"
        >
          <MessageCircle size={20} /> Falar sobre pacotes
        </a>
      </div>
    </section>
  );
}

/* ── Página ────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="relative flex min-h-full flex-col">
      <Header />
      <CategoryNav />

      <main className="flex-1 pb-24">
        <Hero />
        <Portfolio />

        {CATEGORIAS.map((cat) => {
          const itens = SERVICOS.filter((s) => s.categoria === cat.chave);
          if (itens.length === 0) return null;
          return (
            <section
              key={cat.chave}
              id={cat.chave}
              className="mx-auto mt-16 w-full max-w-6xl px-5"
            >
              <div className="mb-6 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-lilac/40" aria-hidden />
                <h2 className="font-display text-center text-2xl font-bold uppercase tracking-wide text-cream sm:text-3xl">
                  {cat.titulo}
                </h2>
                <span className="h-px w-8 bg-lilac/40" aria-hidden />
              </div>
              <div className="stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {itens.map((s) => (
                  <CardServico key={s.slug} s={s} />
                ))}
              </div>
            </section>
          );
        })}

        <CTABand />

        <footer className="mx-auto mt-20 max-w-6xl px-5">
          <div className="flex flex-col items-center gap-4 border-t border-lilac/20 pt-10 text-center">
            <Image
              src="/mascote.jpg"
              alt=""
              width={56}
              height={56}
              className="rounded-full border-2 border-lilac"
            />
            <p className="font-display text-lg font-bold text-cream">
              Finesse It Car Care
            </p>
            <a
              href={linkWhatsApp(MSG_GERAL)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-pink px-5 py-2.5 text-sm font-semibold text-white hover:bg-pink-dark"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <p className="text-xs text-lilac-soft">
              © {2026} Finesse It Car Care. Agende pela página ou pelo WhatsApp.
            </p>
          </div>
        </footer>
      </main>

      {/* Botão flutuante de WhatsApp */}
      <a
        href={linkWhatsApp(MSG_GERAL)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agendar pelo WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-pink text-white shadow-2xl hover:bg-pink-dark"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
