-- BY PRATA • Esquema inicial de desenvolvimento (não aplicado em produção).
-- Execute apenas em ambiente de testes após revisar permissões, tributos e regras comerciais.
create extension if not exists pgcrypto;

create table if not exists public.consultoras (
 id uuid primary key default gen_random_uuid(),
 slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
 nome text not null,
 whatsapp text,
 ativa boolean not null default false,
 criada_em timestamptz not null default now()
);
create table if not exists public.produtos (
 id uuid primary key default gen_random_uuid(),
 sku text not null unique,
 nome text not null,
 descricao text,
 imagem_url text,
 ativo boolean not null default false,
 criado_em timestamptz not null default now()
);
create table if not exists public.variantes (
 id uuid primary key default gen_random_uuid(),
 produto_id uuid not null references public.produtos(id),
 aro smallint not null check (aro between 1 and 40),
 preco_centavos integer not null check (preco_centavos >= 0),
 ativa boolean not null default false,
 unique (produto_id, aro)
);
create table if not exists public.pedidos (
 id uuid primary key default gen_random_uuid(),
 referencia_externa text unique,
 consultora_id uuid references public.consultoras(id),
 status text not null default 'rascunho' check (status in ('rascunho','aguardando_pagamento','pago','producao','enviado','entregue','cancelado','reembolsado')),
 valor_centavos integer not null default 0 check (valor_centavos >= 0),
 pagamento_confirmado_em timestamptz,
 entregue_em timestamptz,
 devolucao_ate timestamptz,
 criado_em timestamptz not null default now(),
 atualizado_em timestamptz not null default now()
);
create table if not exists public.itens_pedido (
 id uuid primary key default gen_random_uuid(),
 pedido_id uuid not null references public.pedidos(id),
 variante_id uuid not null references public.variantes(id),
 quantidade integer not null check (quantidade > 0),
 preco_unitario_centavos integer not null check (preco_unitario_centavos >= 0)
);
create table if not exists public.eventos_pedido (
 id uuid primary key default gen_random_uuid(),
 pedido_id uuid not null references public.pedidos(id),
 tipo text not null,
 origem text,
 chave_idempotencia text unique,
 dados jsonb not null default '{}'::jsonb,
 criado_em timestamptz not null default now()
);
create table if not exists public.comissoes (
 id uuid primary key default gen_random_uuid(),
 pedido_id uuid not null unique references public.pedidos(id),
 consultora_id uuid not null references public.consultoras(id),
 base_centavos integer not null check (base_centavos >= 0),
 percentual numeric(5,2) not null default 20.00 check (percentual between 0 and 100),
 valor_centavos integer not null check (valor_centavos >= 0),
 status text not null default 'pendente' check (status in ('pendente','liberada','paga','estornada')),
 liberada_em timestamptz,
 paga_em timestamptz
);
create table if not exists public.premios (
 id uuid primary key default gen_random_uuid(),
 consultora_id uuid not null references public.consultoras(id),
 competencia date not null,
 valor_centavos integer not null check (valor_centavos >= 0),
 status text not null default 'pendente' check (status in ('pendente','liberado','pago','estornado')),
 unique (consultora_id, competencia)
);
create table if not exists public.repasses (
 id uuid primary key default gen_random_uuid(),
 consultora_id uuid not null references public.consultoras(id),
 referencia text not null unique,
 valor_centavos integer not null check (valor_centavos > 0),
 status text not null default 'planejado' check (status in ('planejado','processando','confirmado','falhou')),
 pago_em timestamptz,
 criado_em timestamptz not null default now()
);
-- Segurança: nenhum acesso anônimo ou autenticado diretamente às tabelas até
-- serem implementadas políticas RLS por perfil e operações em backend confiável.
alter table public.consultoras enable row level security;
alter table public.produtos enable row level security;
alter table public.variantes enable row level security;
alter table public.pedidos enable row level security;
alter table public.itens_pedido enable row level security;
alter table public.eventos_pedido enable row level security;
alter table public.comissoes enable row level security;
alter table public.premios enable row level security;
alter table public.repasses enable row level security;
-- Sem políticas = acesso negado para papéis comuns sujeitos a RLS.
-- Nunca expor a chave service_role no navegador.
