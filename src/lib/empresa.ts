import { createClient } from "@/lib/supabase/server";
import { SERVICOS } from "@/lib/catalogo";

export type Empresa = {
  id: string;
  nome: string;
  whatsapp: string | null;
};

/**
 * Garante que o usuário logado tenha uma empresa. No primeiro acesso, cria a
 * empresa "Finesse It Car Care" e SEMEIA o catálogo real de serviços nela
 * (a partir de `catalogo.ts`). Retorna a empresa, ou null se não houver
 * usuário autenticado.
 */
export async function getOrCreateEmpresa(): Promise<Empresa | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: existente } = await supabase
    .from("empresas")
    .select("id, nome, whatsapp")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (existente) return existente;

  const nome =
    (user.user_metadata?.empresa_nome as string | undefined)?.trim() ||
    "Finesse It Car Care";

  const { data: nova, error } = await supabase
    .from("empresas")
    .insert({ user_id: user.id, nome })
    .select("id, nome, whatsapp")
    .single();

  if (error) throw new Error(error.message);

  // Seed do catálogo na primeira criação — a partir daí o dono edita no painel.
  const rows = SERVICOS.map((s, i) => ({
    empresa_id: nova.id,
    nome: s.nome,
    categoria: s.categoria,
    descricao: s.descricao ?? (s.itens ? s.itens.join(" · ") : null),
    preco: s.preco, // null = sob consulta, 0 = cortesia
    ativo: true,
    ordem: i,
  }));
  await supabase.from("servicos").insert(rows);

  return nova;
}
