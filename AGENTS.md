# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Finesse It Car Care

Sistema de estoque + precificação + catálogo + agendamento para a estética automotiva **Finesse It Car Care**. Mesma estrutura do projeto irmão `lo-orbe`:

- `src/lib/<modulo>.ts` — leituras do Supabase
- `src/lib/actions/<modulo>.ts` — Server Actions (mutations)
- `src/lib/supabase/{client,server}.ts` — clientes Supabase
- `supabase/*.sql` — migrations numeradas
- Multi-tenant: cada negócio é uma linha em `empresas` (por `user_id`), isolado por RLS.

Stack: Next.js 16.2 (App Router, Turbopack) · React 19 · TypeScript · Tailwind 4 · Supabase.

**Marca:** roxo/violeta, mascote onça-pintada rosa de gravata borboleta. Ver `README.md`.
