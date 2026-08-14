import type { CoverflowSlide } from "@/components/ui/coverflow-carousel";

/* ── Galeria "Trabalhos recentes" (carros que passaram pela Finesse It) ──
 *
 * COMO ADICIONAR UMA FOTO DE UM CARRO LAVADO:
 *   1. Coloque a imagem em  public/portfolio/  (ex.: public/portfolio/civic-branco.jpg)
 *   2. Adicione um item abaixo com  src: "/portfolio/civic-branco.jpg"
 *   3. Preencha o `alt` (descrição para acessibilidade) e, se quiser,
 *      um `title` curto (aparece na legenda, ex.: "Polimento + Vitrificação").
 *
 * Dica: use fotos quadradas (ou próximas), pois os cards são quadrados.
 * Os itens abaixo são PLACEHOLDERS (Unsplash) — troque pelos carros reais.
 */

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=720&h=720&fit=crop&q=72&auto=format`;

export const PORTFOLIO: CoverflowSlide[] = [
  {
    src: UNSPLASH("1503376780353-7e6692767b70"),
    alt: "Esportivo laranja com pintura espelhada após polimento",
    title: "Polimento técnico",
    subtitle: "Brilho de vitrine",
  },
  {
    src: UNSPLASH("1552519507-da3b142c6e3d"),
    alt: "Esportivo azul limpo e encerado",
    title: "Lavagem premium",
    subtitle: "Enceramento",
  },
  {
    src: UNSPLASH("1494976388531-d1058494cdd8"),
    alt: "Clássico vermelho detalhado",
    title: "Detalhamento completo",
    subtitle: "Interior + externo",
  },
  {
    src: UNSPLASH("1541348263662-e068662d82af"),
    alt: "Sedan escuro com acabamento impecável",
    title: "Vitrificação",
    subtitle: "Proteção de pintura",
  },
  {
    src: UNSPLASH("1583121274602-3e2820c69888"),
    alt: "Carro esportivo com faróis e pintura realçados",
    title: "Revitalização",
    subtitle: "Faróis + pintura",
  },
  {
    src: UNSPLASH("1493238792000-8113da705763"),
    alt: "Carro branco limpo em estúdio",
    title: "Higienização",
    subtitle: "Limpeza profunda",
  },
];
