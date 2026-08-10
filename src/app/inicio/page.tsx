import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LayoutGrid, ShieldCheck, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import { signOut } from "@/lib/actions/auth";

export default async function Inicio() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Só admin vê a escolha; qualquer outra conta vai direto pro catálogo.
  if (!(await isAdmin())) redirect("/");

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 py-12">
      <Image
        src="/mascote.jpg"
        alt="Finesse It Car Care"
        width={88}
        height={88}
        className="rounded-full border-2 border-lilac"
      />
      <h1 className="font-display mt-5 text-3xl font-bold text-cream">
        Onde você quer entrar?
      </h1>
      <p className="mt-2 text-sm text-lilac-soft">{user.email}</p>

      <div className="stagger mt-10 grid w-full gap-5 sm:grid-cols-2">
        <Link
          href="/"
          className="hover-lift flex flex-col items-center gap-3 rounded-3xl border-2 border-lilac/50 bg-purple-600/40 p-8 text-center"
        >
          <LayoutGrid size={40} className="text-pink" />
          <span className="font-display text-xl font-bold text-cream">
            Entrar no catálogo
          </span>
          <span className="text-sm text-lilac-soft">
            Ver a vitrine de serviços da Finesse It
          </span>
        </Link>

        <Link
          href="/admin"
          className="hover-lift flex flex-col items-center gap-3 rounded-3xl border-2 border-lilac/50 bg-purple-600/40 p-8 text-center"
        >
          <ShieldCheck size={40} className="text-pink" />
          <span className="font-display text-xl font-bold text-cream">
            Painel admin
          </span>
          <span className="text-sm text-lilac-soft">
            Estoque e controle de administradores
          </span>
        </Link>
      </div>

      <form action={signOut} className="mt-8">
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-lilac-soft transition-colors hover:text-pink"
        >
          <LogOut size={15} /> Sair
        </button>
      </form>
    </main>
  );
}
