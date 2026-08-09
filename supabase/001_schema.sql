-- Finesse It Car Care — schema inicial
-- Rode no SQL Editor do Supabase (Dashboard > SQL Editor > New query).
--
-- Ideia central (das mensagens do briefing):
--   insumo (estoque + custo) -> consumo (baixa + custo) -> serviço (custo real)
--   -> precificação -> catálogo público -> agendamento (página ou WhatsApp)

-- ── 1. Empresas ────────────────────────────────────────────────
-- Cada usuário logado representa um negócio. Multi-tenant por RLS.
create table if not exists empresas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  nome text not null,
  segmento text default 'estetica_automotiva',
  whatsapp text,                      -- número pro catálogo público (só dígitos)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 2. Insumos (estoque) ───────────────────────────────────────
-- "catalogar tudo que tenho em estoque, valor do produto, quantidade que ainda tem"
create table if not exists insumos (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references empresas(id) on delete cascade,
  nome text not null,
  categoria text,                     -- cera, shampoo, vitrificador, descartável...
  unidade text not null default 'ml', -- ml, L, g, kg, un
  -- Base de custo: comprei `qtd_compra` da unidade por `custo_compra` reais.
  -- Custo por unidade = custo_compra / qtd_compra (calculado na aplicação).
  qtd_compra numeric(12, 3) not null default 0,
  custo_compra numeric(12, 2) not null default 0,
  -- Quanto ainda tem em estoque, na `unidade` acima.
  estoque_atual numeric(12, 3) not null default 0,
  estoque_minimo numeric(12, 3) not null default 0, -- alerta de reposição
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 3. Movimentações de estoque ────────────────────────────────
-- "quantidade que gastei" + "valor daquilo que gastei" (usei 200ml = R$20).
-- Entrada = compra/reposição. Saída = consumo num serviço.
create table if not exists movimentacoes_estoque (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references empresas(id) on delete cascade,
  insumo_id uuid not null references insumos(id) on delete cascade,
  tipo text not null check (tipo in ('entrada', 'saida')),
  quantidade numeric(12, 3) not null,       -- na unidade do insumo
  custo_unitario numeric(12, 4) not null default 0, -- snapshot do custo/unidade
  custo_total numeric(12, 2) not null default 0,    -- quantidade * custo_unitario
  agendamento_id uuid,                       -- liga o consumo a um serviço feito
  observacao text,
  created_at timestamptz not null default now()
);

-- ── 4. Serviços (catálogo) ─────────────────────────────────────
-- Prata, Ouro, Polimentos, Proteções, Higienizações...
create table if not exists servicos (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references empresas(id) on delete cascade,
  nome text not null,
  categoria text,                     -- lavagem, pacote, polimento, protecao, higienizacao
  descricao text,
  preco numeric(12, 2),               -- null = sob consulta; 0 = cortesia
  duracao_min integer,                -- duração estimada em minutos
  ativo boolean not null default true,
  ordem integer not null default 0,   -- ordenação na vitrine
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 5. Receita do serviço (quais insumos ele consome) ──────────
-- Permite calcular o custo real de cada serviço automaticamente.
create table if not exists servico_insumos (
  id uuid primary key default gen_random_uuid(),
  servico_id uuid not null references servicos(id) on delete cascade,
  insumo_id uuid not null references insumos(id) on delete cascade,
  quantidade numeric(12, 3) not null default 0, -- consumo por execução
  unique (servico_id, insumo_id)
);

-- ── 6. Clientes (CRM básico p/ ticket médio) ───────────────────
create table if not exists clientes (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references empresas(id) on delete cascade,
  nome text not null,
  telefone text,
  veiculo text,
  observacoes text,
  created_at timestamptz not null default now()
);

-- ── 7. Agendamentos ────────────────────────────────────────────
-- "sistema de agendamento que redirecione o cliente" — via página OU WhatsApp.
create table if not exists agendamentos (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references empresas(id) on delete cascade,
  cliente_id uuid references clientes(id) on delete set null,
  -- Dados avulsos (agendamento público, cliente ainda sem cadastro).
  cliente_nome text,
  cliente_telefone text,
  veiculo text,
  data_hora timestamptz,
  status text not null default 'pendente'
    check (status in ('pendente', 'confirmado', 'concluido', 'cancelado')),
  origem text not null default 'pagina'
    check (origem in ('pagina', 'whatsapp', 'manual')),
  preco_total numeric(12, 2) not null default 0,
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 8. Itens do agendamento (combos / upsell) ──────────────────
-- Vários serviços num agendamento => sobe o ticket médio ("fechar mais").
create table if not exists agendamento_itens (
  id uuid primary key default gen_random_uuid(),
  agendamento_id uuid not null references agendamentos(id) on delete cascade,
  servico_id uuid references servicos(id) on delete set null,
  nome text not null,                 -- snapshot do nome do serviço
  preco numeric(12, 2) not null default 0
);

-- ── Índices úteis ──────────────────────────────────────────────
create index if not exists idx_insumos_empresa on insumos(empresa_id);
create index if not exists idx_mov_empresa on movimentacoes_estoque(empresa_id);
create index if not exists idx_mov_insumo on movimentacoes_estoque(insumo_id);
create index if not exists idx_servicos_empresa on servicos(empresa_id);
create index if not exists idx_agend_empresa on agendamentos(empresa_id);

-- ── Segurança (RLS): cada usuário só enxerga a própria empresa ──
alter table empresas enable row level security;
alter table insumos enable row level security;
alter table movimentacoes_estoque enable row level security;
alter table servicos enable row level security;
alter table servico_insumos enable row level security;
alter table clientes enable row level security;
alter table agendamentos enable row level security;
alter table agendamento_itens enable row level security;

create policy "empresa própria" on empresas for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Helper: id das empresas do usuário logado.
create policy "insumos da própria empresa" on insumos for all
  using (empresa_id in (select id from empresas where user_id = auth.uid()))
  with check (empresa_id in (select id from empresas where user_id = auth.uid()));

create policy "movimentações da própria empresa" on movimentacoes_estoque for all
  using (empresa_id in (select id from empresas where user_id = auth.uid()))
  with check (empresa_id in (select id from empresas where user_id = auth.uid()));

create policy "serviços da própria empresa" on servicos for all
  using (empresa_id in (select id from empresas where user_id = auth.uid()))
  with check (empresa_id in (select id from empresas where user_id = auth.uid()));

create policy "receita de serviço da própria empresa" on servico_insumos for all
  using (servico_id in (
    select s.id from servicos s
    join empresas e on e.id = s.empresa_id
    where e.user_id = auth.uid()))
  with check (servico_id in (
    select s.id from servicos s
    join empresas e on e.id = s.empresa_id
    where e.user_id = auth.uid()));

create policy "clientes da própria empresa" on clientes for all
  using (empresa_id in (select id from empresas where user_id = auth.uid()))
  with check (empresa_id in (select id from empresas where user_id = auth.uid()));

create policy "agendamentos da própria empresa" on agendamentos for all
  using (empresa_id in (select id from empresas where user_id = auth.uid()))
  with check (empresa_id in (select id from empresas where user_id = auth.uid()));

create policy "itens de agendamento da própria empresa" on agendamento_itens for all
  using (agendamento_id in (
    select a.id from agendamentos a
    join empresas e on e.id = a.empresa_id
    where e.user_id = auth.uid()))
  with check (agendamento_id in (
    select a.id from agendamentos a
    join empresas e on e.id = a.empresa_id
    where e.user_id = auth.uid()));

-- NOTA sobre agendamento público:
--   A página pública (cliente não logado) NÃO insere direto via RLS.
--   Ela chama uma Server Action que usa a Service Role Key (server-only)
--   pra inserir o agendamento com origem = 'pagina'. Mesmo padrão do
--   painel admin do lo-orbe. Assim o cliente nunca precisa de conta.
