"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; ok?: string };

/** Login com email e senha. */
export async function signIn(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Preencha email e senha." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: traduzErro(error.message) };

  redirect("/inicio");
}

/** Cadastro aberto: cada negócio cria sua própria conta. */
export async function signUp(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const nome = String(formData.get("empresa_nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Preencha email e senha." };
  if (password.length < 6)
    return { error: "A senha precisa ter pelo menos 6 caracteres." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { empresa_nome: nome || undefined } },
  });

  if (error) return { error: traduzErro(error.message) };

  // Confirmação de email desligada → já vem com sessão → entra direto.
  if (data.session) redirect("/inicio");

  // Confirmação de email ligada → precisa confirmar antes de entrar.
  return { ok: "Conta criada! Confirme seu email e depois faça login." };
}

/** Sair da conta. */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

/** Traduz as mensagens de erro mais comuns do Supabase para português. */
function traduzErro(mensagem: string): string {
  const m = mensagem.toLowerCase();
  if (m.includes("invalid login credentials"))
    return "Email ou senha incorretos.";
  if (m.includes("already registered") || m.includes("already been registered"))
    return "Já existe uma conta com esse email. Faça login.";
  if (m.includes("email not confirmed"))
    return "Confirme seu email antes de entrar.";
  if (m.includes("password"))
    return "A senha precisa ter pelo menos 6 caracteres.";
  return "Não foi possível concluir. Tente novamente.";
}
