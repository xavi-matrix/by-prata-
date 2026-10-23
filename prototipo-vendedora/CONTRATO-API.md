# Contrato de catálogo e atribuição | By Prata

## Objetivo
Conectar a vitrine demonstrativa a um catálogo real sem aceitar preços, consultoras ou comissões enviados pelo navegador como fonte de verdade.

## API planejada (não implantada)
`GET /api/v1/vitrine/:slug`

Resposta pública de exemplo (dados fictícios):
```json
{
  "consultora": {"slug":"ana","nome":"Ana","ativa":true},
  "produtos": [
    {"sku":"BP-001","nome":"Anel Orgânico","descricao":"Prata 925, sem pedras","imagem_url":null,
     "variantes":[{"aro":16,"preco_centavos":9900,"disponivel":true}]}
  ]
}
```

- O servidor consulta o banco, retorna apenas produtos e consultoras ativos e não expõe dados internos.
- A identificação da consultora vem do slug validado no banco, não do parâmetro livre `?consultora=`.
- Preços são sempre obtidos no servidor, em centavos.
- A disponibilidade deve considerar a produção sob encomenda e prazos reais.

`POST /api/v1/checkout/sessoes` (somente depois de integrar o provedor)
```json
{"consultora_slug":"ana","itens":[{"sku":"BP-001","aro":16,"quantidade":1}]}
```
O backend valida consultora, variante e quantidade, recalcula o total, cria pedido com referência imutável de atribuição e inicia o checkout hospedado. Nunca recebe preço ou comissão como entrada confiável.

## Estados financeiros
1. Pedido pago confirmado por webhook com assinatura verificada e chave de idempotência.
2. Produção, envio e confirmação de entrega.
3. Devolução/cancelamento/reembolso registrados por eventos auditáveis.
4. Comissão só é liberada após entrega, prazo aplicável e ausência de pendências.
5. Prêmio mensal apurado a partir de vendas elegíveis, conforme política comercial aprovada.
6. Repasse por Pix reconciliado com lançamentos individuais; impedir pagamento duplicado.

## Pendências antes da integração real
- Fotos e SKUs reais, tamanhos disponíveis e preços aprovados.
- WhatsApp autorizado e regra de atribuição para recompras.
- Escolha de hospedagem, banco, checkout e ambiente de homologação.
- Política de devolução, frete, privacidade e autorização para uso de dados das consultoras.
- Validação das metas e valores de prêmio, ainda exemplos.
- Autenticação de administradores/consultoras e políticas RLS testadas.

## Critérios de aceite
- Uma URL inválida não atribui vendas a uma consultora fictícia.
- Alterar preço no navegador não altera o valor cobrado.
- Webhook repetido não duplica pedido nem comissão.
- Cancelamento e reembolso não liberam comissão.
- O site principal e a história da marca não são modificados durante homologação.
