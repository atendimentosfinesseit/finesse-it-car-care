# Finesse It Car Care

Sistema de **estoque + precificação + catálogo + agendamento** para a estética
automotiva Finesse It Car Care. Projeto irmão do `lo-orbe`, mesma arquitetura.

## A ideia (do briefing)

Dois lados que se conversam:

**🔒 Interno (você logado) — o cérebro**
- **Estoque / Insumos** — catalogar tudo, valor do produto, quantidade que ainda tem.
- **Consumo** — "usei 200ml = R$20": baixa no estoque + custo lançado.
- **Serviços** — cada serviço consome X de insumos → custo real calculado sozinho.
- **Precificação** — custo dos insumos + sua mão de obra → preço e margem.
- **Clientes / Ticket médio** — histórico e média por cliente.
- **Indicadores** — faturamento, ticket médio, insumo que mais consome, margem.

**🌐 Público (cliente) — a vitrine**
- **Catálogo** — serviços com preço (já no ar em `/`).
- **Agendamento** — cliente escolhe serviço + horário.
- **WhatsApp** — agenda pela página **ou** direto no Whats.
- **Combos / upsell** — mais de um serviço por agendamento → sobe o ticket.

## Stack

Next.js 16.2 (App Router, Turbopack) · React 19 · TypeScript · Tailwind 4 ·
Supabase (`@supabase/ssr`) · lucide-react.

## Estrutura

```
src/app/            páginas (a raiz "/" é a vitrine pública)
src/lib/*.ts        leituras do Supabase + helpers (valor, catálogo)
src/lib/actions/    Server Actions (mutations)
src/lib/supabase/   clientes browser/server
supabase/*.sql      migrations numeradas
public/mascote.jpg  mascote da marca
```

## Marca

Roxo/violeta profundo, detalhes lilás, títulos creme. Mascote: onça-pintada
rosa de gravata borboleta. Paleta em `src/app/globals.css` (`--color-purple-*`,
`--color-lilac`, `--color-cream`, `--color-pink`). Fontes: Poppins (títulos),
Geist (texto), Rubik (números/preços).

## Rodar

```bash
npm install
npm run dev   # http://localhost:3000
```

Copie `.env.local.example` para `.env.local` e preencha as chaves do Supabase
e o `NEXT_PUBLIC_WHATSAPP` (só dígitos, ex: 5551999999999).

⚠️ Este PC bloqueia `next dev` local (Application Control / bindings nativos),
igual ao lo-orbe. Fluxo de trabalho: commit → push (SSH) → testar no deploy da
Vercel. `npx tsc --noEmit` roda ok pra validar tipos antes do push.

## Banco

Rode `supabase/001_schema.sql` no SQL Editor do Supabase. Cria as tabelas
`empresas, insumos, movimentacoes_estoque, servicos, servico_insumos,
clientes, agendamentos, agendamento_itens` com RLS multi-tenant.

## Roteiro

- [x] Scaffold + marca + vitrine pública com catálogo real
- [x] Modelo de dados (SQL)
- [ ] Provisionar Supabase + GitHub + Vercel (precisa das contas do Rafa)
- [ ] Auth (login) + módulo Estoque/Insumos (CRUD + movimentações)
- [ ] Módulo Serviços + receita de insumos → custo real
- [ ] Precificação (custo + mão de obra → preço sugerido/margem)
- [ ] Vitrine lendo do banco + agendamento online (Server Action c/ service role)
- [ ] Indicadores (ticket médio, faturamento, margem)
