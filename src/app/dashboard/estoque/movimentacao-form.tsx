"use client";

import { useActionState } from "react";
import { ArrowDownCircle } from "lucide-react";
import {
  registrarMovimentacao,
  type EstoqueState,
} from "@/lib/actions/estoque";

const inicial: EstoqueState = {};

const campo =
  "rounded-lg border border-lilac/40 bg-purple-950/40 px-3 py-2 text-base text-white outline-none transition-colors placeholder:text-lilac-soft/50 focus:border-pink";
const rotulo = "flex flex-col gap-1 text-sm font-medium text-cream";

type Opcao = { id: string; nome: string; unidade: string };

export function MovimentacaoForm({ insumos }: { insumos: Opcao[] }) {
  const [state, action, pending] = useActionState(
    registrarMovimentacao,
    inicial
  );

  if (insumos.length === 0) {
    return (
      <p className="text-sm text-lilac-soft">
        Cadastre um insumo primeiro pra poder lançar consumo ou reposição.
      </p>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <label className={rotulo}>
        Insumo
        <select name="insumo_id" required className={campo}>
          {insumos.map((i) => (
            <option key={i.id} value={i.id}>
              {i.nome}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={rotulo}>
          Tipo
          <select name="tipo" defaultValue="saida" className={campo}>
            <option value="saida">Consumo (usei em um serviço)</option>
            <option value="entrada">Reposição (comprei mais)</option>
          </select>
        </label>
        <label className={rotulo}>
          Quantidade
          <input
            name="quantidade"
            required
            inputMode="decimal"
            placeholder="Ex: 200"
            className={campo}
          />
        </label>
      </div>

      <label className={rotulo}>
        Observação (opcional)
        <input
          name="observacao"
          placeholder="Ex: vitrificação do Golf"
          className={campo}
        />
      </label>

      {state.error && <p className="text-sm text-pink">{state.error}</p>}
      {state.ok && <p className="text-sm text-cream">{state.ok}</p>}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-pink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-dark disabled:opacity-60"
      >
        <ArrowDownCircle size={16} /> {pending ? "Registrando..." : "Registrar"}
      </button>
    </form>
  );
}
