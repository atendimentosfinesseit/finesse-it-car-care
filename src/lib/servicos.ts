import { createClient } from "@/lib/supabase/server";

export type ServicoDB = {
  id: string;
  nome: string;
  categoria: string | null;
  descricao: string | null;
  preco: number | null;
  ativo: boolean;
  ordem: number;
};

/** Lista os serviços de uma empresa, na ordem definida. */
export async function getServicos(empresaId: string): Promise<ServicoDB[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("servicos")
    .select("id, nome, categoria, descricao, preco, ativo, ordem")
    .eq("empresa_id", empresaId)
    .order("ordem", { ascending: true });
  return data ?? [];
}
