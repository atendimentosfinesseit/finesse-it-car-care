"use client";

import { useActionState } from "react";
import { UserPlus } from "lucide-react";
import { addAdmin, type AdminState } from "@/lib/actions/admin";

const inicial: AdminState = {};

export function AddAdminForm() {
  const [state, action, pending] = useActionState(addAdmin, inicial);

  return (
    <form action={action} className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="email@exemplo.com"
          className="min-w-0 flex-1 rounded-lg border border-lilac/40 bg-purple-950/40 px-3 py-2 text-base text-white outline-none transition-colors placeholder:text-lilac-soft/50 focus:border-pink"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-lg bg-pink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-pink-dark disabled:opacity-60"
        >
          <UserPlus size={16} /> {pending ? "Adicionando..." : "Dar admin"}
        </button>
      </div>
      {state.error && <p className="text-sm text-pink">{state.error}</p>}
      {state.ok && <p className="text-sm text-cream">{state.ok}</p>}
    </form>
  );
}
