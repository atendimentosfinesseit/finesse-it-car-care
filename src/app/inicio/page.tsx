import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LayoutGrid, ShieldCheck } from "lucide-react";
import { getOrCreateEmpresa } from "@/lib/empresa";
import { isAdmin } from "@/lib/admin";

export default async function Inicio() {
  const empresa = await getOrCreateEmpresa();
  if (!empresa) redirect("/login");

  // Só admin vê a escolha; usuário comum vai direto pro catálogo.
  if (!(await isAdmin())) redirect("/dashboard");

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
      <p className="mt-2 text-lilac-soft">{empresa.nome}</p>

      <div className="stagger mt-10 grid w-full gap-5 sm:grid-cols-2">
        <Link
          href="/dashboard"
          className="hover-lift flex flex-col items-center gap-3 rounded-3xl border-2 border-lilac/50 bg-purple-600/40 p-8 text-center"
        >
          <LayoutGrid size={40} className="text-pink" />
          <span className="font-display text-xl font-bold text-cream">
            Entrar no catálogo
          </span>
          <span className="text-sm text-lilac-soft">
            Gerenciar serviços, estoque e agenda do seu negócio
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
            Controlar quais contas têm acesso de administrador
          </span>
        </Link>
      </div>
    </main>
  );
}
