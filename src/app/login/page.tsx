"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { signIn, type AuthState } from "@/lib/actions/auth";

const inicial: AuthState = {};

export default function LoginPage() {
  const [state, action, pending] = useActionState(signIn, inicial);

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
            Finesse It Car Care
          </h1>
          <p className="mt-1 text-sm text-lilac-soft">Painel de gestão</p>
        </div>

        <form action={action} className="mt-6 flex flex-col gap-4">
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
              autoComplete="current-password"
              className="rounded-lg border border-lilac/40 bg-purple-950/40 px-3 py-2 text-base font-normal text-white outline-none transition-colors focus:border-pink"
            />
          </label>

          {state.error && (
            <p className="text-sm text-pink">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-pink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-dark disabled:opacity-60"
          >
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-lilac-soft">
          Ainda não tem conta?{" "}
          <Link
            href="/cadastro"
            className="font-semibold text-pink hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </main>
  );
}
