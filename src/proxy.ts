import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// "Proxy" é o novo nome do middleware a partir do Next.js 16.
// Aqui ele só renova a sessão do Supabase a cada requisição; o controle de
// acesso (quem pode ver o quê) é feito dentro de cada página.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Roda em todas as rotas, exceto arquivos estáticos e imagens.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
