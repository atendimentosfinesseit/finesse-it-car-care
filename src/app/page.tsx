import Image from "next/image";
import { MessageCircle, Check, Sparkles } from "lucide-react";
import {
  SERVICOS,
  CATEGORIAS,
  linkWhatsApp,
  type Servico,
} from "@/lib/catalogo";
import { formatBRL } from "@/lib/valor";

function precoLabel(s: Servico): string {
  if (s.cortesia) return "Cortesia";
  if (s.preco === null) return "Sob consulta";
  return formatBRL(s.preco);
}

function CardServico({ s }: { s: Servico }) {
  const msg = `Olá! Vim pelo catálogo da Finesse It e quero agendar: ${s.nome}.`;
  return (
    <article
      className="hover-lift flex flex-col rounded-3xl border-2 border-lilac/60 bg-purple-600/40 p-6 backdrop-blur-sm"
    >
      {s.destaque && (
        <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-pink px-3 py-1 text-xs font-semibold text-white">
          <Sparkles size={13} /> Mais pedido
        </span>
      )}
      <h3 className="font-display text-2xl font-bold text-cream">{s.nome}</h3>

      {s.descricao && (
        <p className="mt-2 text-sm leading-relaxed text-lilac-soft">
          {s.descricao}
        </p>
      )}

      {s.itens && (
        <ul className="mt-4 flex flex-1 flex-col gap-2">
          {s.itens.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-lilac-soft">
              <Check size={16} className="mt-0.5 shrink-0 text-pink" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex items-end justify-between gap-3">
        <span className="font-mono text-2xl font-bold text-white">
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

export default function Home() {
  const msgGeral =
    "Olá! Vim pelo catálogo da Finesse It Car Care e gostaria de agendar um serviço.";

  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-10">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="rise flex flex-col items-center text-center">
        <Image
          src="/mascote.jpg"
          alt="Mascote da Finesse It Car Care"
          width={132}
          height={132}
          className="rounded-full border-4 border-lilac shadow-2xl"
          priority
        />
        <h1 className="font-display mt-5 text-4xl font-extrabold tracking-tight text-cream sm:text-5xl">
          Finesse It Car Care
        </h1>
        <p className="mt-3 max-w-xl text-lg text-lilac-soft">
          Estética automotiva de verdade. Seu carro brilhando como novo —
          lavagens, polimentos, proteções e higienizações.
        </p>
        <a
          href={linkWhatsApp(msgGeral)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-pink px-7 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-pink-dark"
        >
          <MessageCircle size={20} /> Agendar pelo WhatsApp
        </a>
      </header>

      {/* ── Catálogo por categoria ───────────────────────────── */}
      {CATEGORIAS.map((cat) => {
        const itens = SERVICOS.filter((s) => s.categoria === cat.chave);
        if (itens.length === 0) return null;
        return (
          <section key={cat.chave} className="mt-16" id={cat.chave}>
            <h2 className="font-display mb-6 text-center text-3xl font-bold uppercase tracking-wide text-cream/90">
              {cat.titulo}
            </h2>
            <div className="stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {itens.map((s) => (
                <CardServico key={s.slug} s={s} />
              ))}
            </div>
          </section>
        );
      })}

      {/* ── Rodapé ───────────────────────────────────────────── */}
      <footer className="mt-20 border-t border-lilac/20 pt-8 text-center text-sm text-lilac-soft">
        <p>
          Finesse It Car Care — agende pela página ou direto no{" "}
          <a
            href={linkWhatsApp(msgGeral)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-pink underline-offset-2 hover:underline"
          >
            WhatsApp
          </a>
          .
        </p>
      </footer>

      {/* ── Botão flutuante de WhatsApp ──────────────────────── */}
      <a
        href={linkWhatsApp(msgGeral)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agendar pelo WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-pink text-white shadow-2xl hover:bg-pink-dark"
      >
        <MessageCircle size={26} />
      </a>
    </main>
  );
}
