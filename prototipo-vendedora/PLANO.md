# By Prata | Plano de evolução segura

## Preservação
A página oficial `index.html` e a história institucional (incluindo a origem em Joinville) não devem ser alteradas sem revisão. Este protótipo está isolado em `prototipo-vendedora/`.

## Estado atual
- Vitrine de categorias **fictícias**, sem produtos cadastrados nem preços.
- Identificação de consultora por parâmetro `?consultora=Ana` apenas para demonstração. **Não é um identificador confiável de vendas.**
- Seleção de estilo e número do aro, sem coleta no servidor.
- WhatsApp propositalmente desativado até configurar o número autorizado.
- Sem checkout, pedidos, autenticação, comissões ou prêmios operacionais.

## Modelo comercial acordado
- By Prata recebe todos os pagamentos e faz a entrega.
- Vendedoras usam kits demonstrativos comprados com desconto, sem revenda em atacado.
- Comissão-base: 20% das vendas elegíveis.
- Prêmios mensais em dinheiro, não cumulativos, **valores de exemplo a validar**: R$30 ao atingir R$1.000; R$80 ao atingir R$2.000; R$150 ao atingir R$3.000.
- Pagamentos previstos nos dias 10, 20 e 30, apenas para comissões e prêmios já liberados.
- Liberar após entrega, término do prazo aplicável de devolução e resolução de contestações. Reverter valores em cancelamentos/devoluções.
- Não presumir vínculo perpétuo da cliente à vendedora: regra de atribuição ainda precisa ser definida.

## Etapas técnicas
1. Aprovar cadastro real de produtos (SKU, fotos próprias, nome, peso, aro, preço e disponibilidade).
2. Criar base de dados com tabelas: `consultoras`, `produtos`, `variantes`, `clientes`, `pedidos`, `itens_pedido`, `atribuicoes`, `eventos_pedido`, `comissoes`, `premios`, `pagamentos_comerciais`.
3. Criar páginas por slug único, resolvido no servidor. Guardar a atribuição no pedido de forma auditável; não confiar no nome enviado pelo navegador.
4. Checkout via provedor de pagamentos com confirmação por webhook autenticado e idempotente. Não registrar dados de cartão no site.
5. Painel de produção e entregas; cálculo de elegibilidade por item, devolução e prazo; fechamento mensal e pagamento Pix reconciliado.
6. Controle de acesso por perfil, políticas de dados e consentimento LGPD; testes automatizados para devoluções, bônus e pagamento duplicado.
7. Homologação em ambiente separado, revisão de textos institucionais e aprovação antes de publicar.

## Critérios mínimos para lançar
- Nenhum pedido pago pode ficar sem atribuição auditável, quando originado de consultora.
- Nunca liberar comissão antes da elegibilidade.
- Nunca pagar duas vezes o mesmo lançamento.
- Cancelamentos e reembolsos ajustam comissões e prêmios.
- Cada consultora visualiza apenas seus dados; administradores têm visão central.
- Site oficial permanece disponível durante migração.

**Observação:** não há integração de produção ativa nesta ramificação.