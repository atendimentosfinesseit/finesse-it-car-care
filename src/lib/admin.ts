import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/** O email do usuário logado está na tabela `admins`? */
export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return false;

  const { data } = await supabase
    .from("admins")
    .select("email")
    .eq("email", user.email)
    .maybeSingle();

  return !!data;
}

/** Barra o acesso: quem não é admin vai pro catálogo. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/");
}

/** Lista todos os emails admin (via service_role — o RLS só mostra o próprio). */
export async function listAdmins(): Promise<string[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("admins")
    .select("email")
    .order("created_at", { ascending: true });
  return (data ?? []).map((r) => r.email as string);
}
