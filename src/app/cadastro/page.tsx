"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { signUp, type AuthState } from "@/lib/actions/auth";

const inicial: AuthState = {};

export default function CadastroPage() {
  const [state, action, pending] = useActionState(signUp, inicial);

  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <div className="rise w-full max-w-sm rounded-3xl border-2 border-lilac/50 bg-purple-600/40 p-8 backdrop-blur-sm">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/mascote.jpg"
            alt="Finesse It Car Care"
            width={72}
            height={72}
            className="rounded-full border-2 border-lilac"
          />
          <h1 className="font-display mt-4 text-2xl font-bold text-cream">
            Criar conta
          </h1>
          <p className="mt-1 text-sm text-lilac-soft">
            Monte o catálogo e a agenda do seu negócio
          </p>
        </div>

        <form action={action} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-cream">
            Nome do negócio
            <input
              type="text"
              name="empresa_nome"
              placeholder="Ex: Finesse It Car Care"
              className="rounded-lg border border-lilac/40 bg-purple-950/40 px-3 py-2 text-base font-normal text-white outline-none transition-colors placeholder:text-lilac-soft/50 focus:border-pink"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-cream">
            Email
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="rounded-lg border border-lilac/40 bg-purple-950/40 px-3 py-2 text-base font-normal text-white outline-none transition-colors focus:border-pink"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-cream">
            Senha
            <input
              type="password"
              name="password"
              required
              minLength={6}
              autoComplete="new-password"
              className="rounded-lg border border-lilac/40 bg-purple-950/40 px-3 py-2 text-base font-normal text-white outline-none transition-colors focus:border-pink"
            />
          </label>

          {state.error && <p className="text-sm text-pink">{state.error}</p>}
          {state.ok && <p className="text-sm text-cream">{state.ok}</p>}

          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-pink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-dark disabled:opacity-60"
          >
            {pending ? "Criando..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-lilac-soft">
          Já tem conta?{" "}
          <Link href="/login" className="font-semibold text-pink hover:underline">
            Fazer login
          </Link>
        </p>
      </div>
    </main>
  );
}
