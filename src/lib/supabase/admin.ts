import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase com a SERVICE ROLE KEY — bypassa o RLS. USO SÓ NO SERVIDOR.
 * Nunca importar em componente client. Usado pela gestão de admins e por
 * operações que precisam agir fora do escopo do usuário logado.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
