-- Finesse It Car Care — 003 estoque compartilhado entre admins
-- O estoque deixa de ser por empresa e passa a ser UM só, compartilhado por
-- todos os admins: se um admin consome um insumo, baixa pra todos.

-- empresa_id deixa de ser obrigatório (o estoque compartilhado não tem dono).
alter table insumos alter column empresa_id drop not null;
alter table movimentacoes_estoque alter column empresa_id drop not null;

-- Remove as políticas antigas (escopo por empresa).
drop policy if exists "insumos da própria empresa" on insumos;
drop policy if exists "movimentações da própria empresa" on movimentacoes_estoque;

-- Novas políticas: qualquer admin (email na tabela `admins`) enxerga e edita
-- o MESMO estoque. Quem não é admin não vê nada.
create policy "admins gerenciam o estoque (insumos)" on insumos for all
  using (exists (select 1 from admins a where a.email = (auth.jwt() ->> 'email')))
  with check (exists (select 1 from admins a where a.email = (auth.jwt() ->> 'email')));

create policy "admins gerenciam o estoque (movimentacoes)" on movimentacoes_estoque for all
  using (exists (select 1 from admins a where a.email = (auth.jwt() ->> 'email')))
  with check (exists (select 1 from admins a where a.email = (auth.jwt() ->> 'email')));
