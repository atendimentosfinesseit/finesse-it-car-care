import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Mantém a sessão do usuário viva a cada requisição: lê os cookies de sessão,
 * renova o token no Supabase quando necessário e devolve a resposta com os
 * cookies atualizados. É chamado pelo `proxy.ts` (o "middleware" do Next 16).
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Importante: getUser() força a validação/renovação do token de sessão.
  // Não colocar lógica entre createServerClient e getUser.
  await supabase.auth.getUser();

  return supabaseResponse;
}
