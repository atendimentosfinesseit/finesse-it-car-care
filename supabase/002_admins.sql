-- Finesse It Car Care — 002 admins
-- Painel de admin: controla quais EMAILS têm acesso administrativo.
-- Por email (não user_id) pra permitir pré-autorizar alguém antes do cadastro.

create table if not exists admins (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table admins enable row level security;

-- Um usuário logado pode checar se o PRÓPRIO email é admin (só a linha dele).
-- A gestão (adicionar/remover) é feita por Server Actions com a service_role.
create policy "usuário vê se o próprio email é admin" on admins for select
  using ((auth.jwt() ->> 'email') = email);

-- Primeiro admin.
insert into admins (email) values ('rafaelpilger17@gmail.com')
  on conflict (email) do nothing;
