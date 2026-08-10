import Link from "next/link";
import { ArrowLeft, ShieldCheck, X, Boxes, LogOut } from "lucide-react";
import { requireAdmin, listAdmins } from "@/lib/admin";
import { removeAdmin } from "@/lib/actions/admin";
import { signOut } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { AddAdminForm } from "./add-admin-form";

export default async function AdminPage() {
  await requireAdmin();

  const [emails, supabase] = await Promise.all([listAdmins(), createClient()]);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const meuEmail = user?.email?.toLowerCase() ?? "";

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-24 pt-8">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck size={26} className="text-pink" />
          <div>
            <p className="text-sm text-lilac-soft">Painel admin</p>
            <h1 className="font-display text-2xl font-bold text-cream">
              Administradores
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/inicio"
            className="inline-flex items-center gap-1.5 rounded-full border border-lilac/50 px-4 py-2 text-sm font-medium text-cream hover:border-pink"
          >
            <ArrowLeft size={15} /> Voltar
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full border border-lilac/50 px-4 py-2 text-sm font-medium text-cream hover:border-pink"
            >
              <LogOut size={15} /> Sair
            </button>
          </form>
        </div>
      </header>

      <nav className="mt-8">
        <Link
          href="/admin/estoque"
          className="hover-lift flex items-center gap-3 rounded-2xl border-2 border-lilac/40 bg-purple-600/30 p-5"
        >
          <Boxes size={28} className="text-pink" />
          <div>
            <p className="font-display font-bold text-cream">
              Estoque compartilhado
            </p>
            <p className="text-sm text-lilac-soft">
              Insumos, consumo e custo real — um só pra todos os admins
            </p>
          </div>
        </Link>
      </nav>

      <section className="mt-8 rounded-3xl border-2 border-lilac/40 bg-purple-600/30 p-6">
        <h2 className="font-display mb-1 text-lg font-semibold text-cream">
          Dar acesso de admin
        </h2>
        <p className="mb-4 text-sm text-lilac-soft">
          Pode ser um email que ainda nem se cadastrou — o acesso vale assim que
          a conta for criada.
        </p>
        <AddAdminForm />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-lilac">
          Com acesso ({emails.length})
        </h2>
        <ul className="overflow-hidden rounded-2xl border border-lilac/30">
          {emails.map((email) => (
            <li
              key={email}
              className="flex items-center justify-between gap-4 border-b border-lilac/15 bg-purple-600/25 px-4 py-3 last:border-b-0"
            >
              <span className="min-w-0 truncate text-cream">
                {email}
                {email === meuEmail && (
                  <span className="ml-2 text-xs text-lilac-soft">(você)</span>
                )}
              </span>
              {email !== meuEmail && (
                <form action={removeAdmin}>
                  <input type="hidden" name="email" value={email} />
                  <button
                    type="submit"
                    aria-label={`Remover admin de ${email}`}
                    className="inline-flex items-center gap-1 rounded-full border border-lilac/40 px-3 py-1.5 text-xs font-medium text-lilac-soft hover:border-pink hover:text-pink"
                  >
                    <X size={14} /> Remover
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
