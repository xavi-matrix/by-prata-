-- By Prata | Revisão manual antes de aplicar.
-- Projeto: By Prata - Desenvolvimento. Não executar no site público.
-- Sem administradores pré-cadastrados, nenhuma pessoa obtém acesso ao catálogo.
-- O usuário administrador deve ser criado via Supabase Auth e seu UUID verificado.
create table if not exists public.administradores (
 usuario_id uuid primary key references auth.users(id) on delete cascade,
 criado_em timestamptz not null default now()
);
alter table public.administradores enable row level security;
revoke all on public.administradores from anon, authenticated;
grant select on public.administradores to authenticated;
create policy admin_ver_proprio on public.administradores for select to authenticated
 using (usuario_id = (select auth.uid()));

-- Somente a leitura dos produtos e variantes por administradores autenticados.
-- Escrita fica bloqueada até o fluxo de edição e auditoria ser validado.
grant select on public.produtos, public.variantes to authenticated;
create policy admin_ler_produtos on public.produtos for select to authenticated
 using (exists (select 1 from public.administradores a where a.usuario_id = (select auth.uid())));
create policy admin_ler_variantes on public.variantes for select to authenticated
 using (exists (select 1 from public.administradores a where a.usuario_id = (select auth.uid())));
-- Inserção do administrador inicial deve ser realizada manualmente por operador
-- confiável no SQL Editor, após confirmar UUID e titularidade. Nunca no frontend.
