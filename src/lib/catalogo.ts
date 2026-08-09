/**
 * Catálogo de serviços da Finesse It Car Care.
 *
 * Extraído dos flyers da marca. Por enquanto vive aqui como fonte única
 * pra alimentar a página pública (a "vitrine"). Quando o módulo de Serviços
 * no Supabase estiver pronto, isto vira o seed inicial da tabela `servicos`
 * e a vitrine passa a ler do banco.
 */

export type Categoria =
  | "lavagem"
  | "pacote"
  | "polimento"
  | "protecao"
  | "higienizacao";

export type Servico = {
  slug: string;
  nome: string;
  categoria: Categoria;
  /** Preço em reais. null = "sob consulta". 0 = cortesia. */
  preco: number | null;
  cortesia?: boolean;
  descricao?: string;
  itens?: string[];
  destaque?: boolean;
};

export const CATEGORIAS: { chave: Categoria; titulo: string }[] = [
  { chave: "lavagem", titulo: "Lavagens" },
  { chave: "pacote", titulo: "Pacotes mensais" },
  { chave: "polimento", titulo: "Polimentos" },
  { chave: "protecao", titulo: "Proteções" },
  { chave: "higienizacao", titulo: "Higienizações" },
];

export const SERVICOS: Servico[] = [
  // ── Lavagens ────────────────────────────────────────────────
  {
    slug: "lavagem-prata",
    nome: "Prata",
    categoria: "lavagem",
    preco: 90,
    itens: [
      "Lavagem externa",
      "Lavagem interna",
      "Restauração de plásticos",
      "Revitalização de pneus",
      "Aplicação de proteção",
    ],
  },
  {
    slug: "lavagem-ouro",
    nome: "Ouro",
    categoria: "lavagem",
    preco: 150,
    destaque: true,
    itens: [
      "Lavagem detalhada externa",
      "Descontaminação de pintura",
      "Lavagem interna",
      "Restauração de plásticos",
      "Revitalização de pneus",
      "Aplicação de proteção",
    ],
  },

  // ── Pacotes mensais ─────────────────────────────────────────
  {
    slug: "pacote-2x",
    nome: "Lavagem simples — 2x no mês",
    categoria: "pacote",
    preco: 210,
    descricao: "Lavagem simples, duas vezes ao mês.",
  },
  {
    slug: "pacote-4x",
    nome: "Lavagem simples — 4x no mês",
    categoria: "pacote",
    preco: 370,
    destaque: true,
    descricao: "Lavagem simples, quatro vezes ao mês.",
  },

  // ── Polimentos ──────────────────────────────────────────────
  {
    slug: "polimento-comercial",
    nome: "Polimento Comercial",
    categoria: "polimento",
    preco: 500,
    itens: ["Uma etapa", "Realça o brilho", "Remove riscos superficiais"],
  },
  {
    slug: "polimento-tecnico",
    nome: "Polimento Técnico",
    categoria: "polimento",
    preco: 800,
    destaque: true,
    itens: ["Três etapas", "Correção alta", "Preparação pra vitrificação"],
  },
  {
    slug: "restauracao-farois",
    nome: "Restauração de Faróis",
    categoria: "polimento",
    preco: 160,
    itens: [
      "Remoção da oxidação",
      "Revitalização com polímero",
      "Proteção com vitrificador",
    ],
  },

  // ── Proteções ───────────────────────────────────────────────
  {
    slug: "cera-liquida",
    nome: "Cera líquida",
    categoria: "protecao",
    preco: 0,
    cortesia: true,
    itens: ["Alto brilho", "Não-sintética", "Proteção de até 2 meses"],
  },
  {
    slug: "cera-premium",
    nome: "Cera premium",
    categoria: "protecao",
    preco: 50,
    itens: [
      "Altíssimo brilho",
      "Não-sintética",
      "Proteção de até 6 meses",
      "Remove contaminação",
    ],
  },
  {
    slug: "selante",
    nome: "Selante",
    categoria: "protecao",
    preco: 70,
    itens: [
      "Altíssimo brilho",
      "Sintético",
      "Remove pequenos riscos",
      "Proteção de até 12 meses",
    ],
  },
  {
    slug: "vitrificacao",
    nome: "Vitrificação",
    categoria: "protecao",
    preco: 500,
    destaque: true,
    itens: [
      "Mais alta tecnologia",
      "Sintético",
      "Brilho, proteção e durabilidade",
      "Proteção de até 3 anos",
    ],
  },
  {
    slug: "cristalizacao-vidros",
    nome: "Cristalização de Vidros",
    categoria: "protecao",
    preco: 40,
    itens: ["Segurança", "Hidrorrepelência em dias de chuva"],
  },

  // ── Higienizações ───────────────────────────────────────────
  {
    slug: "higienizacao-interna",
    nome: "Higienização Interna",
    categoria: "higienizacao",
    preco: 200,
    descricao:
      "Limpeza de painel, forros de porta, forro do teto, remoção de encardidos, aplicação de proteção e higienização com ozônio para remoção de bactérias.",
  },
  {
    slug: "higienizacao-estofados",
    nome: "Higienização de Estofados",
    categoria: "higienizacao",
    preco: 250,
    descricao: "Remoção, higienização e tratamento de estofados.",
  },
  {
    slug: "higienizacao-couro",
    nome: "Higienização de Couro",
    categoria: "higienizacao",
    preco: 100,
    descricao: "Higienização e tratamento de estofados em couro.",
  },
];

/** Número de WhatsApp do negócio (só dígitos, formato internacional). */
export const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "";

/** Monta um link wa.me com mensagem pré-preenchida. */
export function linkWhatsApp(mensagem: string): string {
  const texto = encodeURIComponent(mensagem);
  return WHATSAPP
    ? `https://wa.me/${WHATSAPP}?text=${texto}`
    : `https://wa.me/?text=${texto}`;
}
