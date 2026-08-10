"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type AdminState = { error?: string; ok?: string };

/** Concede admin a um email (pode ser antes mesmo dele se cadastrar). */
export async function addAdmin(
  _prevState: AdminState,
  formData: FormData
): Promise<AdminState> {
  await requireAdmin();

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!email || !email.includes("@")) {
    return { error: "Informe um email válido." };
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("admins")
    .upsert({ email }, { onConflict: "email" });

  if (error) return { error: "Não foi possível adicionar. Tente novamente." };

  revalidatePath("/admin");
  return { ok: `${email} agora tem acesso de admin.` };
}

/** Remove o acesso admin de um email. Não deixa o usuário remover a si mesmo. */
export async function removeAdmin(formData: FormData): Promise<void> {
  await requireAdmin();

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!email) return;

  // Proteção contra auto-remoção (evita ficar sem nenhum admin com acesso).
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user?.email?.toLowerCase() === email) return;

  const admin = createAdminClient();
  await admin.from("admins").delete().eq("email", email);

  revalidatePath("/admin");
}
