"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";
import { custoUnitario } from "@/lib/estoque";
import { parseValor } from "@/lib/valor";

export type EstoqueState = { error?: string; ok?: string };

const UNIDADES = ["ml", "L", "g", "kg", "un"];
const ROTA = "/admin/estoque";

/** Cadastra um novo insumo no estoque compartilhado. */
export async function addInsumo(
  _prevState: EstoqueState,
  formData: FormData
): Promise<EstoqueState> {
  await requireAdmin();

  const nome = String(formData.get("nome") ?? "").trim();
  const categoria = String(formData.get("categoria") ?? "").trim() || null;
  const unidade = String(formData.get("unidade") ?? "ml").trim();
  const qtdCompra = parseValor(String(formData.get("qtd_compra") ?? ""));
  const custoCompra = parseValor(String(formData.get("custo_compra") ?? ""));
  const estoqueAtual = parseValor(String(formData.get("estoque_atual") ?? "0"));
  const estoqueMinimo = parseValor(String(formData.get("estoque_minimo") ?? "0"));

  if (!nome) return { error: "Informe o nome do insumo." };
  if (!UNIDADES.includes(unidade)) return { error: "Unidade inválida." };
  if (qtdCompra === null || qtdCompra <= 0)
    return { error: "Informe a quantidade comprada (ex: 500)." };
  if (custoCompra === null)
    return { error: "Informe quanto pagou por essa quantidade (ex: 80,00)." };

  const supabase = await createClient();
  const { error } = await supabase.from("insumos").insert({
    nome,
    categoria,
    unidade,
    qtd_compra: qtdCompra,
    custo_compra: custoCompra,
    estoque_atual: estoqueAtual ?? 0,
    estoque_minimo: estoqueMinimo ?? 0,
  });

  if (error) return { error: "Não foi possível salvar. Tente novamente." };

  revalidatePath(ROTA);
  const cu = custoUnitario({ qtd_compra: qtdCompra, custo_compra: custoCompra });
  return {
    ok: `${nome} cadastrado — custo de ${cu.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    })} por ${unidade}.`,
  };
}

/**
 * Registra uma movimentação no estoque compartilhado: consumo (saída) ou
 * reposição (entrada). Atualiza o estoque atual do insumo pra TODOS os admins.
 */
export async function registrarMovimentacao(
  _prevState: EstoqueState,
  formData: FormData
): Promise<EstoqueState> {
  await requireAdmin();

  const insumoId = String(formData.get("insumo_id") ?? "");
  const tipo = String(formData.get("tipo") ?? "");
  const quantidade = parseValor(String(formData.get("quantidade") ?? ""));
  const observacao = String(formData.get("observacao") ?? "").trim() || null;

  if (!insumoId) return { error: "Escolha o insumo." };
  if (tipo !== "entrada" && tipo !== "saida")
    return { error: "Tipo de movimentação inválido." };
  if (quantidade === null || quantidade <= 0)
    return { error: "Informe uma quantidade válida." };

  const supabase = await createClient();
  const { data: insumo } = await supabase
    .from("insumos")
    .select("id, nome, unidade, qtd_compra, custo_compra, estoque_atual")
    .eq("id", insumoId)
    .maybeSingle();

  if (!insumo) return { error: "Insumo não encontrado." };

  const estoqueAtual = Number(insumo.estoque_atual);
  if (tipo === "saida" && quantidade > estoqueAtual) {
    return {
      error: `Estoque insuficiente: há ${estoqueAtual} ${insumo.unidade} de ${insumo.nome}.`,
    };
  }

  const cu = custoUnitario(insumo);
  const custoTotal = Math.round(cu * quantidade * 100) / 100;
  const novoEstoque =
    tipo === "saida" ? estoqueAtual - quantidade : estoqueAtual + quantidade;

  const { error: errMov } = await supabase.from("movimentacoes_estoque").insert({
    insumo_id: insumoId,
    tipo,
    quantidade,
    custo_unitario: cu,
    custo_total: custoTotal,
    observacao,
  });
  if (errMov) return { error: "Não foi possível registrar. Tente novamente." };

  await supabase
    .from("insumos")
    .update({ estoque_atual: novoEstoque })
    .eq("id", insumoId);

  revalidatePath(ROTA);

  if (tipo === "saida") {
    return {
      ok: `Consumo de ${quantidade} ${insumo.unidade} de ${insumo.nome} lançado — custo de ${custoTotal.toLocaleString(
        "pt-BR",
        { style: "currency", currency: "BRL" }
      )}.`,
    };
  }
  return {
    ok: `Reposição de ${quantidade} ${insumo.unidade} de ${insumo.nome} registrada.`,
  };
}

/** Remove um insumo (e suas movimentações, por cascade). */
export async function deleteInsumo(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("insumos").delete().eq("id", id);

  revalidatePath(ROTA);
}
