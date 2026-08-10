import Link from "next/link";
import { ArrowLeft, PackagePlus, AlertTriangle, Trash2 } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import {
  getInsumos,
  getMovimentacoes,
  custoUnitario,
  formatQtd,
} from "@/lib/estoque";
import { deleteInsumo } from "@/lib/actions/estoque";
import { formatBRL } from "@/lib/valor";
import { AddInsumoForm } from "./add-insumo-form";
import { MovimentacaoForm } from "./movimentacao-form";

function dataCurta(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function EstoquePage() {
  await requireAdmin();

  const [insumos, movs] = await Promise.all([
    getInsumos(),
    getMovimentacoes(),
  ]);

  const valorEmEstoque = insumos.reduce(
    (s, i) => s + custoUnitario(i) * Number(i.estoque_atual),
    0
  );

  return (
    <main className="mx-auto w-full max-w-4xl px-5 pb-24 pt-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-lilac-soft">Painel admin</p>
          <h1 className="font-display text-3xl font-bold text-cream">
            Estoque compartilhado
          </h1>
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 rounded-full border border-lilac/50 px-4 py-2 text-sm font-medium text-cream hover:border-pink"
        >
          <ArrowLeft size={15} /> Painel admin
        </Link>
      </header>

      <p className="mt-2 text-sm text-lilac-soft">
        Um estoque só, compartilhado por todos os admins — o que um consome baixa
        pra todos.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-purple-600/25 p-4">
          <p className="text-sm text-lilac-soft">Insumos cadastrados</p>
          <p className="font-mono text-2xl font-bold text-white">
            {insumos.length}
          </p>
        </div>
        <div className="rounded-2xl bg-purple-600/25 p-4">
          <p className="text-sm text-lilac-soft">Valor parado em estoque</p>
          <p className="font-mono text-2xl font-bold text-white">
            {formatBRL(valorEmEstoque)}
          </p>
        </div>
      </div>

      {/* Formulários */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border-2 border-lilac/40 bg-purple-600/30 p-6">
          <h2 className="font-display mb-4 flex items-center gap-2 text-lg font-semibold text-cream">
            <PackagePlus size={20} className="text-pink" /> Novo insumo
          </h2>
          <AddInsumoForm />
        </section>

        <section className="rounded-3xl border-2 border-lilac/40 bg-purple-600/30 p-6">
          <h2 className="font-display mb-4 text-lg font-semibold text-cream">
            Lançar consumo / reposição
          </h2>
          <MovimentacaoForm
            insumos={insumos.map((i) => ({
              id: i.id,
              nome: i.nome,
              unidade: i.unidade,
            }))}
          />
        </section>
      </div>

      {/* Lista de insumos */}
      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-lilac">
          Insumos
        </h2>
        {insumos.length === 0 ? (
          <p className="text-lilac-soft">Nenhum insumo cadastrado ainda.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-lilac/30">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-purple-950/30 text-lilac-soft">
                <tr>
                  <th className="px-4 py-3 font-medium">Insumo</th>
                  <th className="px-4 py-3 font-medium">Em estoque</th>
                  <th className="px-4 py-3 text-right font-medium">Custo / un.</th>
                  <th className="px-4 py-3 text-right font-medium">Valor</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {insumos.map((i) => {
                  const cu = custoUnitario(i);
                  const baixo =
                    Number(i.estoque_minimo) > 0 &&
                    Number(i.estoque_atual) <= Number(i.estoque_minimo);
                  return (
                    <tr
                      key={i.id}
                      className="border-t border-lilac/15 bg-purple-600/20"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-cream">{i.nome}</p>
                        {i.categoria && (
                          <p className="text-xs text-lilac-soft">{i.categoria}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`font-mono ${baixo ? "text-pink" : "text-white"}`}
                        >
                          {formatQtd(i.estoque_atual, i.unidade)}
                        </span>
                        {baixo && (
                          <span className="ml-2 inline-flex items-center gap-1 text-xs text-pink">
                            <AlertTriangle size={12} /> baixo
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-lilac-soft">
                        {cu.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 4,
                        })}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-white">
                        {formatBRL(cu * Number(i.estoque_atual))}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <form action={deleteInsumo}>
                          <input type="hidden" name="id" value={i.id} />
                          <button
                            type="submit"
                            aria-label={`Excluir ${i.nome}`}
                            className="text-lilac-soft transition-colors hover:text-pink"
                          >
                            <Trash2 size={16} />
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Histórico */}
      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-lilac">
          Últimas movimentações
        </h2>
        {movs.length === 0 ? (
          <p className="text-lilac-soft">Nenhuma movimentação ainda.</p>
        ) : (
          <ul className="overflow-hidden rounded-2xl border border-lilac/30">
            {movs.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between gap-4 border-b border-lilac/15 bg-purple-600/20 px-4 py-3 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-cream">
                    <span
                      className={m.tipo === "saida" ? "text-pink" : "text-lilac"}
                    >
                      {m.tipo === "saida" ? "Consumo" : "Reposição"}
                    </span>{" "}
                    — {m.insumos?.nome ?? "insumo"}{" "}
                    <span className="font-mono">
                      {formatQtd(m.quantidade, m.insumos?.unidade ?? "")}
                    </span>
                  </p>
                  <p className="truncate text-xs text-lilac-soft">
                    {dataCurta(m.created_at)}
                    {m.observacao ? ` · ${m.observacao}` : ""}
                  </p>
                </div>
                <span className="shrink-0 font-mono font-semibold text-white">
                  {formatBRL(Number(m.custo_total))}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
