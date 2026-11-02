# Regras de Sistema | By Prata
Atualizado: 2026-11-01. **Especificação, não atestado de software instalado.**
## Ambientes e segurança
- Repositório `xavi-matrix/by-prata-`, branch `feature/mostruario-vendedoras`; staging Netlify separado do domínio oficial.
- Supabase para autenticação, atribuição de consultora, estoques por local/modelo/tamanho, rastreamento e permissões. Estado atual do projeto não revalidado nesta atualização.
- Recalcular preço/total no servidor; autenticação, controle de acesso por função/RLS, trilhas auditáveis e idempotência de webhooks de pagamentos/entregas.
- Administração aprova preços, comissões, campanhas, transferências, limites de estoque, gestoras/substitutas e exceções. Nenhuma publicação no oficial sem autorização.
## Reservas de estoque
- Carrinho não reserva. Ao iniciar pagamento: reserva transacional do item/quantidade.
- Pix: 30 minutos, validade da cobrança coordenada com reserva. Cartão: até 15 minutos iniciais, extensão finita apenas com sinal válido de autenticação/análise; teto máximo configurável por provedor e aprovado pela administração.
- Confirmar após evento autenticado do provedor; falhas/expirações liberam estoque com segurança. Pagamento tardio: buscar mesma peça na fábrica/CDs, validar prazo; oferecer solução acordada ou reembolso integral quando necessário, sem prometer peça alocada a outro pedido.
- Pedidos multipeças: preferir consolidar, split somente em exceção justificada.
## Entregas e retornos
- Datas/turnos oferecidos por disponibilidade real. QR Code com token e código numérico de uso único vinculados ao pedido, validação do entregador e confirmação explícita de entrega. Reemissão revoga anterior; não expor segredos ao motoboy.
- Pedido sem recebimento não é entregue: volta ao CD, custódia auditada e reagendamento por gestora. Opções retirada, consultora ou novo motoboy conforme vínculo.
## Cadastros e acompanhamento
- Avaliação qualitativa de candidatas, comentários, indicação da gestora e aprovação exclusiva admin. Prazo condicional de 30 dias com reavaliação; treinamento básico >=80% e habilitação. Vinculação/transferências comerciais administradas separadamente do CD de despacho.
- Relatórios mensais de gestoras: operacional e expansão comercial. Reuniões e recrutadas acompanhadas por 90 dias com medidas de conversão, produtividade, vendas e contribuição.
## Medidor de aro
- Documento histórico especifica medidor digital com calibração por cartão ID-1 e anel real, mantendo indicação de aro estimado, sem garantia. Implementação e validação pendentes.
