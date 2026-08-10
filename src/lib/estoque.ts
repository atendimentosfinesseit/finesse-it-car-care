import { createClient } from "@/lib/supabase/server";

export type Insumo = {
  id: string;
  nome: string;
  categoria: string | null;
  unidade: string;
  qtd_compra: number;
  custo_compra: number;
  estoque_atual: number;
  estoque_minimo: number;
};

export type Movimentacao = {
  id: string;
  tipo: "entrada" | "saida";
  quantidade: number;
  custo_unitario: number;
  custo_total: number;
  observacao: string | null;
  created_at: string;
  insumos: { nome: string; unidade: string } | null;
};

/** Custo por unidade de um insumo (custo da compra ÷ quantidade comprada). */
export function custoUnitario(insumo: {
  qtd_compra: number | string;
  custo_compra: number | string;
}): number {
  const q = Number(insumo.qtd_compra);
  if (!q) return 0;
  return Number(insumo.custo_compra) / q;
}

/** Formata uma quantidade com a unidade: 300 -> "300 ml". */
export function formatQtd(qtd: number | string, unidade: string): string {
  const n = Number(qtd);
  const s = Number.isInteger(n) ? n.toString() : n.toLocaleString("pt-BR");
  return `${s} ${unidade}`;
}

/**
 * Lista os insumos do estoque COMPARTILHADO (um só pra todos os admins),
 * em ordem alfabética. O RLS garante que só admin enxerga.
 */
export async function getInsumos(): Promise<Insumo[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("insumos")
    .select(
      "id, nome, categoria, unidade, qtd_compra, custo_compra, estoque_atual, estoque_minimo"
    )
    .order("nome", { ascending: true });
  return (data ?? []) as Insumo[];
}

/** Últimas movimentações do estoque compartilhado (com o nome do insumo). */
export async function getMovimentacoes(limit = 30): Promise<Movimentacao[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("movimentacoes_estoque")
    .select(
      "id, tipo, quantidade, custo_unitario, custo_total, observacao, created_at, insumos(nome, unidade)"
    )
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as unknown as Movimentacao[];
}
