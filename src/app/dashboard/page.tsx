import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut, ExternalLink } from "lucide-react";
import { getOrCreateEmpresa } from "@/lib/empresa";
import { getServicos } from "@/lib/servicos";
import { signOut } from "@/lib/actions/auth";
import { CATEGORIAS } from "@/lib/catalogo";
import { formatBRL } from "@/lib/valor";

function precoLabel(preco: number | null): string {
  if (preco === null) return "Sob consulta";
  if (preco === 0) return "Cortesia";
  return formatBRL(preco);
}

export default async function Dashboard() {
  const empresa = await getOrCreateEmpresa();
  if (!empresa) redirect("/login");

  const servicos = await getServicos(empresa.id);

  return (
    <main className="mx-auto w-full max-w-4xl px-5 pb-24 pt-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-lilac-soft">Painel de gestão</p>
          <h1 className="font-display text-3xl font-bold text-cream">
            {empresa.nome}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-lilac/50 px-4 py-2 text-sm font-medium text-cream hover:border-pink"
          >
            <ExternalLink size={15} /> Ver vitrine
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

      <section className="mt-10">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-display text-xl font-semibold text-cream">
            Serviços
          </h2>
          <span className="font-mono text-sm text-lilac-soft">
            {servicos.length} no catálogo
          </span>
        </div>

        {servicos.length === 0 ? (
          <p className="text-lilac-soft">Nenhum serviço cadastrado ainda.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {CATEGORIAS.map((cat) => {
              const itens = servicos.filter((s) => s.categoria === cat.chave);
              if (itens.length === 0) return null;
              return (
                <div key={cat.chave}>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-lilac">
                    {cat.titulo}
                  </h3>
                  <ul className="overflow-hidden rounded-2xl border border-lilac/30">
                    {itens.map((s) => (
                      <li
                        key={s.id}
                        className="flex items-center justify-between gap-4 border-b border-lilac/15 bg-purple-600/25 px-4 py-3 last:border-b-0"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-medium text-cream">
                            {s.nome}
                            {!s.ativo && (
                              <span className="ml-2 text-xs text-lilac-soft">
                                (inativo)
                              </span>
                            )}
                          </p>
                          {s.descricao && (
                            <p className="truncate text-sm text-lilac-soft">
                              {s.descricao}
                            </p>
                          )}
                        </div>
                        <span className="shrink-0 font-mono font-semibold text-white">
                          {precoLabel(s.preco)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
