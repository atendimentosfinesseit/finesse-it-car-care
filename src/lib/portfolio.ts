import type { CoverflowSlide } from "@/components/ui/coverflow-carousel";

/* ── Galeria "Trabalhos recentes" (carros que passaram pela Finesse It) ──
 *
 * As fotos ficam em  public/portfolio/  e são referenciadas por  src: "/portfolio/arquivo.jpg".
 *
 * COMO ADICIONAR MAIS UM CARRO:
 *   1. Coloque a imagem em  public/portfolio/  (ex.: public/portfolio/carro-13.jpg)
 *   2. Adicione um item abaixo com  src: "/portfolio/carro-13.jpg"
 *   3. Preencha o `alt` (descrição para acessibilidade) e, se quiser,
 *      um `title` curto (serviço) e `subtitle` (modelo).
 *
 * Dica: fotos quadradas (ou próximas) ficam melhores, pois os cards são quadrados.
 */

export const PORTFOLIO: CoverflowSlide[] = [
  {
    src: "/portfolio/carro-08.jpg",
    alt: "VW Golf vermelho rebaixado com pintura brilhante após serviço",
    title: "Polimento + brilho",
    subtitle: "VW Golf",
  },
  {
    src: "/portfolio/carro-09.jpg",
    alt: "Honda Civic preto espelhando as luzes do box após acabamento",
    title: "Vitrificação",
    subtitle: "Honda Civic",
  },
  {
    src: "/portfolio/carro-02.jpg",
    alt: "VW Jetta branco com a dianteira reluzindo ao sol",
    title: "Lavagem premium",
    subtitle: "VW Jetta",
  },
  {
    src: "/portfolio/carro-01.jpg",
    alt: "VW Jetta branco com a traseira brilhante após enceramento",
    title: "Enceramento",
    subtitle: "VW Jetta",
  },
  {
    src: "/portfolio/carro-10.jpg",
    alt: "Capô de Honda Civic preto durante polimento com politriz e boina",
    title: "Polimento técnico",
    subtitle: "Honda Civic",
  },
  {
    src: "/portfolio/carro-11.jpg",
    alt: "Capô prata com produto de proteção e flanelas sobre a pintura",
    title: "Proteção de pintura",
    subtitle: "Vitrificação",
  },
  {
    src: "/portfolio/carro-06.jpg",
    alt: "Honda prata coberto de espuma durante a lavagem no box",
    title: "Lavagem com espuma",
    subtitle: "Honda",
  },
  {
    src: "/portfolio/carro-12.jpg",
    alt: "VW Gol preto coberto de espuma durante a lavagem",
    title: "Lavagem com espuma",
    subtitle: "VW Gol",
  },
  {
    src: "/portfolio/carro-07.jpg",
    alt: "VW cinza coberto de espuma no box da Finesse It",
    title: "Lavagem detalhada",
    subtitle: "Finesse It",
  },
  {
    src: "/portfolio/carro-05.jpg",
    alt: "Farol cristalino após restauração, com o capô aberto",
    title: "Restauração de faróis",
    subtitle: "Cristalização",
  },
  {
    src: "/portfolio/carro-04.jpg",
    alt: "Moto Honda vermelha detalhada, vista de frente",
    title: "Detalhamento de moto",
    subtitle: "Honda",
  },
  {
    src: "/portfolio/carro-03.jpg",
    alt: "Painel e tanque de moto Honda vermelha após limpeza detalhada",
    title: "Higienização de moto",
    subtitle: "Honda",
  },
];
