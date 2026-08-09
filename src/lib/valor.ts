/**
 * Converte um valor digitado em português ("1.234,56") para número.
 * Aceita também o formato simples "1234.56". Usado para valores em R$,
 * quantidades e percentuais.
 *
 * Retorna null se não for um número válido ou se for negativo.
 */
export function parseValor(bruto: string): number | null {
  const limpo = bruto.trim().replace(/\s/g, "").replace(/r\$/i, "").replace(/%/g, "");
  if (!limpo) return null;

  let normalizado = limpo;
  if (limpo.includes(",")) {
    // Formato brasileiro: ponto é separador de milhar, vírgula é decimal.
    normalizado = limpo.replace(/\./g, "").replace(",", ".");
  }

  const n = Number(normalizado);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100) / 100;
}

/** Formata um número como moeda brasileira: 1234.5 -> "R$ 1.234,50". */
export function formatBRL(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
