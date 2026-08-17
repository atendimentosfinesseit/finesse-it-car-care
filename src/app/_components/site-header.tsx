"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

import { CATEGORIAS, linkWhatsApp } from "@/lib/catalogo";
import { cn } from "@/lib/utils";

const MSG_GERAL =
  "Olá! Vim pelo catálogo da Finesse It Car Care e gostaria de agendar um serviço.";

/**
 * Cabeçalho fixo (logo + Agendar) e barra de categorias.
 * Ao rolar a página o menu "encolhe": o cabeçalho fica mais compacto e a
 * barra de categorias colapsa. Ao voltar ao topo, tudo reaparece inteiro.
 * Vale para celular e desktop, pois o gatilho é a posição do scroll.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll(); // corrige o estado se a página já abrir rolada
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="glass sticky top-0 z-40 border-b border-lilac/15">
        <div
          className={cn(
            "mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 transition-all duration-300",
            scrolled ? "py-1.5" : "py-3",
          )}
        >
          <a href="#topo" className="flex items-center gap-2.5">
            <Image
              src="/mascote.jpg"
              alt=""
              width={38}
              height={38}
              className={cn(
                "rounded-full border border-lilac/60 transition-all duration-300",
                scrolled ? "h-8 w-8" : "h-[38px] w-[38px]",
              )}
            />
            <span
              className={cn(
                "font-display font-bold leading-none text-cream transition-all duration-300",
                scrolled ? "text-base" : "text-lg",
              )}
            >
              Finesse It
              <span
                className={cn(
                  "block overflow-hidden text-[11px] font-medium tracking-wide text-lilac-soft transition-all duration-300",
                  scrolled ? "max-h-0 opacity-0" : "max-h-4 opacity-100",
                )}
              >
                Car Care
              </span>
            </span>
          </a>
          <a
            href={linkWhatsApp(MSG_GERAL)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full bg-pink font-semibold text-white shadow-lg transition-all duration-300 hover:bg-pink-dark",
              scrolled ? "px-3.5 py-1.5 text-sm" : "px-4 py-2 text-sm",
            )}
          >
            <MessageCircle size={16} />
            <span className="hidden sm:inline">Agendar</span>
          </a>
        </div>
      </header>

      <nav
        aria-label="Categorias de serviço"
        className={cn(
          "glass sticky top-[68px] z-30 overflow-hidden border-y transition-all duration-300",
          scrolled
            ? "max-h-0 border-transparent opacity-0"
            : "max-h-20 border-lilac/15 opacity-100",
        )}
      >
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
    </>
  );
}
