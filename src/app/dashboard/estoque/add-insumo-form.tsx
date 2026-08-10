"use client";

import { useActionState } from "react";
import { Plus } from "lucide-react";
import { addInsumo, type EstoqueState } from "@/lib/actions/estoque";

const inicial: EstoqueState = {};

const campo =
  "rounded-lg border border-lilac/40 bg-purple-950/40 px-3 py-2 text-base text-white outline-none transition-colors placeholder:text-lilac-soft/50 focus:border-pink";
const rotulo = "flex flex-col gap-1 text-sm font-medium text-cream";

export function AddInsumoForm() {
  const [state, action, pending] = useActionState(addInsumo, inicial);

  return (
    <form action={action} className="flex flex-col gap-4">
      <label className={rotulo}>
        Nome do insumo
        <input name="nome" required placeholder="Ex: Cera premium" className={campo} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={rotulo}>
          Categoria (opcional)
          <input name="categoria" placeholder="Ex: proteção" className={campo} />
        </label>
        <label className={rotulo}>
          Unidade
          <select name="unidade" defaultValue="ml" className={campo}>
            <option value="ml">ml (mililitro)</option>
            <option value="L">L (litro)</option>
            <option value="g">g (grama)</option>
            <option value="kg">kg (quilo)</option>
            <option value="un">un (unidade)</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={rotulo}>
          Quantidade comprada
          <input
            name="qtd_compra"
            required
            inputMode="decimal"
            placeholder="Ex: 500"
            className={campo}
          />
        </label>
        <label className={rotulo}>
          Quanto pagou (R$)
          <input
            name="custo_compra"
            required
            inputMode="decimal"
            placeholder="Ex: 80,00"
            className={campo}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={rotulo}>
          Estoque atual
          <input
            name="estoque_atual"
            inputMode="decimal"
            defaultValue="0"
            placeholder="0"
            className={campo}
          />
        </label>
        <label className={rotulo}>
          Alerta de mínimo
          <input
            name="estoque_minimo"
            inputMode="decimal"
            defaultValue="0"
            placeholder="0"
            className={campo}
          />
        </label>
      </div>

      {state.error && <p className="text-sm text-pink">{state.error}</p>}
      {state.ok && <p className="text-sm text-cream">{state.ok}</p>}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-pink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-dark disabled:opacity-60"
      >
        <Plus size={16} /> {pending ? "Salvando..." : "Cadastrar insumo"}
      </button>
    </form>
  );
}
