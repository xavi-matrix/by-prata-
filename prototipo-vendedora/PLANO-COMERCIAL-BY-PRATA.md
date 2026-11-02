# Plano comercial By Prata

Status: decisões aprovadas em 12/10/2026. Documento de referência para desenvolvimento; funcionalidades ainda dependem de implementação e testes.

## Modelo de operação
- A By Prata fabrica, vende, recebe pagamentos e envia os pedidos.
- Consultoras podem montar seu próprio mostruário selecionando itens do catálogo central. Não podem editar preços nem condições comerciais.
- Cada consultora terá identificação individual para atribuição de pedidos. Os kits de demonstração são comprados com desconto, não constituem estoque de revenda.
- A By Prata administra produtos, fotos, preços, disponibilidade e promoções.

## Preços
- Preço de venda fixo e uniforme para todas as consultoras.
- Promoções e alterações de preço apenas por autorização da administração.
- O servidor deve recalcular preços e totais dos pedidos; nunca confiar nos valores enviados pelo navegador.

## Desconto para mostruário das consultoras (revisado em 13/10/2026)
- Benefício permanente por modelo novo lançado, destinado à formação do mostruário físico da consultora.
- Primeira unidade do modelo para cada consultora: 25% de desconto sobre o preço oficial.
- Segunda unidade do mesmo modelo para a mesma consultora: 15% de desconto sobre o preço oficial.
- A partir da terceira unidade do mesmo modelo: preço oficial, sem desconto especial.
- A By Prata admite a possibilidade de revenda direta pela consultora, desde que sejam definidos procedimentos fiscais, de garantia, trocas e atendimento. A comparação econômica entre desconto e comissão considera custos adicionais de cada canal.
- As compras próprias de demonstração não geram comissão nem contam para metas ou prêmios.
- O preço de venda ao consumidor final permanece único e definido pela By Prata.
- Registrar a quantidade adquirida por consultora e por modelo, impedindo reutilização do benefício; validar elegibilidade e preço no servidor.
- Implementação e condições operacionais de venda de kits ainda pendentes; não aplicar automaticamente antes de testes.

## Parcelamento
Faixas de valor do pedido em produtos e quantidade máxima **sem juros**:
- Até R$ 79,99: 1 parcela.
- R$ 80,00 a R$ 149,99: até 2 parcelas.
- R$ 150,00 a R$ 249,99: até 3 parcelas.
- R$ 250,00 a R$ 399,99: até 4 parcelas.
- A partir de R$ 400,00: até 5 parcelas.

Até 6 parcelas no total. Parcelas que ultrapassem o limite sem juros da faixa terão juros, conforme taxas e condições da operadora de pagamentos ainda a definir. Respeitar valor mínimo de parcela e demais limitações da operadora. Os juros devem ser informados à cliente antes da confirmação do pagamento e não integram a base de comissões e metas.

## Comissão
- Comissão de 20% sobre o valor elegível dos produtos vendidos e atribuídos à consultora.
- Não incluir juros, pedidos cancelados ou valores devolvidos.
- Apuração e liberação sujeitas à confirmação do pagamento, entrega e janela de devolução.
- Calendário operacional planejado de repasses: dias 10, 20 e 30, condicionado à elegibilidade e conferência.

## Premiação mensal (não cumulativa)
- R$ 1.000,00 em vendas elegíveis no mês: prêmio de R$ 30,00.
- R$ 2.000,00 em vendas elegíveis no mês: prêmio de R$ 80,00.
- R$ 3.000,00 ou mais em vendas elegíveis no mês: prêmio de R$ 150,00.
- Pagar somente o maior prêmio alcançado no mês, adicional à comissão.
- Não contar juros, cancelamentos ou devoluções para as metas.
- Administração pode ajustar valores e faixas futuramente; alterações devem ser registradas e não mudar retroativamente cálculos já fechados.

Exemplo: R$ 3.000 em vendas elegíveis => R$ 600 em comissão + R$ 150 em prêmio = R$ 750, antes de eventuais ajustes de elegibilidade.

## Entrega local por motoboy (definido em 13/10/2026)
- Os pedidos realizados na landing page terão opção de entrega por motoboy, conforme área de atendimento.
- No checkout, o comprador informará endereço de entrega, dia preferido e período do dia preferido (manhã, tarde ou noite).
- Permitir observações opcionais sobre recebimento.
- Data e período são preferências do comprador; a confirmação dependerá da disponibilidade da By Prata e do motoboy.
- A administração deverá receber esses dados associados ao pedido para organizar e confirmar a entrega.
- Área atendida, taxa de entrega, dias e períodos disponíveis, prazos mínimos e política de reagendamento ainda precisam ser definidos.
- Não prometer entrega garantida nem cobrar taxa sem informar o valor antes da conclusão do pedido.
- Implementação do checkout e agendamento pendente; não alterar o site oficial sem autorização.

### Tentativa de entrega sem recebimento (definido em 13/10/2026)
- Se a cliente não receber o pedido na tentativa de entrega por motoboy, a mercadoria será deixada com a consultora responsável pela venda para posterior contato e entrega.
- A consultora deverá contatar a cliente e combinar uma nova entrega.
- Registrar no pedido a tentativa frustrada, data/hora, consultora que recebeu a mercadoria, transferência de custódia e confirmação da entrega final.
- Status operacional sugerido: `aguardando_reagendamento`; não marcar como entregue até a confirmação efetiva da cliente.
- A transferência à consultora deve ter registro de recebimento e preservar a embalagem/integridade da peça.
- Se não houver consultora vinculada ao pedido ou se ela não puder receber, o procedimento alternativo dependerá de definição da By Prata.
- Eventuais custos de nova tentativa e condições de reagendamento ainda não foram definidos; informar previamente à cliente quando aplicáveis.

## Segurança e implantação
- Apenas administração pode alterar preços, faixas de parcelamento, taxas e prêmios.
- Pedidos precisam de associação de consultora validada, pagamentos confirmados por webhook verificado, operações idempotentes e regras de acesso (RLS).
- Ambiente de testes separado do site oficial. Não publicar a plataforma em produção antes de validação.
- Os cadastros atuais de produto e consultora no Supabase são testes administrativos; a venda, o cálculo automático e o pagamento de comissão/prêmio ainda não estão implementados.

## Infraestrutura
- Código e documentação: GitHub `xavi-matrix/by-prata-`, branch `feature/mostruario-vendedoras`.
- Banco: Supabase, projeto de desenvolvimento.
- Testes web: Netlify, site de homologação separado.
- Site oficial `https://byprata.com.br/` deve permanecer preservado.

## Canal exclusivo para compras das consultoras (definido em 13/10/2026)
- Compras próprias de peças por consultoras não poderão ser realizadas na landing page destinada a clientes finais.
- Essas compras deverão ocorrer em fluxo interno/exclusivo para consultoras, com identificação da consultora e aplicação dos descontos específicos já aprovados.
- As peças compradas pela consultora serão entregues diretamente a ela, não ao cliente final.
- Essas compras não geram comissão nem pontuação para premiações de vendas.
- Pedidos da landing page permanecem exclusivamente para clientes finais e seguem seu próprio fluxo de entrega.
- O canal interno de compra de consultoras ainda precisa ser implementado; não alterar o site oficial sem autorização.

## QR Code de recebimento disponibilizado ao cliente na landing page (definido em 15/10/2026)
- Após conclusão da compra e confirmação do pagamento, a landing page disponibilizará à cliente um QR Code exclusivo do pedido, com opção de salvar e recuperar pelo link seguro do pedido.
- O QR Code fica sob controle da cliente; no momento da entrega, ela o apresenta ao motoboy.
- O motoboy autenticado no sistema By Prata escaneia o código e valida a correspondência com o pedido atribuído a ele.
- O QR Code deve usar token aleatório, não expor dados pessoais, ser validado no servidor e invalidado após confirmação efetiva da entrega.
- Apenas escanear não deve concluir automaticamente o pedido: registrar identificação do entregador, data/hora e confirmação explícita de entrega; avaliar confirmação adicional da cliente para reduzir fraude.
- Na ausência da cliente ou do código, não marcar automaticamente como entregue. Aplicar procedimento de tentativa frustrada, com transferência registrada à consultora responsável quando aplicável.
- Definir posteriormente alternativa acessível para clientes sem celular ou sem acesso ao QR Code, além de tratamento de perda, compartilhamento e revogação do token.
- Fluxo ainda não implementado; não alterar o site oficial sem autorização.

## Recuperação e alternativa ao QR Code de entrega (definido em 15/10/2026)
- A cliente terá duas credenciais equivalentes para confirmar recebimento: QR Code exclusivo e código numérico de uso único (preferência sobre palavra por facilitar leitura e digitação).
- As credenciais são disponibilizadas após confirmação do pagamento, vinculadas ao mesmo pedido, e invalidadas após a entrega confirmada.
- A administração By Prata poderá localizar o pedido, consultar o estado da entrega e solicitar reenvio ou reemissão das credenciais quando a cliente perder ou apagar o código.
- Por segurança, reemissão deverá revogar credenciais anteriores, validar a identidade ou contato cadastrado da cliente e manter trilha de auditoria (quem, quando, motivo).
- Entregadores não poderão consultar antecipadamente QR Code ou código secreto do cliente; somente validar o código apresentado na entrega, com autenticação e pedido atribuído.
- O painel administrativo deve permitir gestão e recuperação controlada, mas evitar exposição indiscriminada de credenciais ativas; em exceções, prever procedimento administrativo auditável.
- Evitar armazenar código secreto em texto puro; usar validação segura no servidor, limitação de tentativas e expiração apropriada.
- Ainda pendente de implementação e testes; preservar o site oficial.

## Medidor digital de aro na landing page (definido em 22/10/2026)

### Objetivo
- Permitir que a cliente descubra o tamanho aproximado do aro sem instalar um aplicativo, usando um anel que já lhe sirva no mesmo dedo.
- O medidor digital será incorporado à landing page By Prata, em interface responsiva e alinhada à identidade visual preto, branco e verde-menta.
- Oferecer caminhos alternativos: informar aro conhecido ou solicitar medição física com aneleira pela consultora.

### Calibração obrigatória da tela
1. Explicar que a tela pode representar dimensões diferentes conforme o dispositivo, escala, zoom e configurações.
2. Pedir um cartão de dimensões padronizadas (formato ID-1: 85,60 × 53,98 mm), sem solicitar fotografia, número, nome ou dados do cartão. Preferir o lado menor se a largura da tela não comportar o maior.
3. Mostrar uma faixa/retângulo ajustável na tela, com controles acessíveis de aumentar/diminuir, para a cliente fazê-lo coincidir com o tamanho físico do cartão.
4. Calcular a razão entre dimensões de referência e medidas renderizadas na tela (pixels CSS por milímetro), considerando variações de exibição; exigir nova calibração quando ela não for confiável.
5. Não apresentar estimativa de aro como validada se a cliente pular a calibração.

### Medição do anel
1. Orientar a usar anel que sirva confortavelmente no MESMO dedo e a posicioná-lo plano sobre a tela, sem pressionar nem arranhar.
2. Exibir círculo ajustável para coincidir com a BORDA INTERNA do anel, não a externa.
3. Converter o diâmetro calibrado em milímetros para circunferência e aro conforme tabela brasileira adotada e validada pela produção By Prata; apresentar também o diâmetro estimado e a margem de incerteza.
4. Pedir que a cliente repita a medida e confirme quando o valor estiver próximo do limite entre dois aros.
5. Para anéis de banda larga, formatos incomuns ou resultado duvidoso, recomendar medição com aneleira física e confirmação antes da fabricação.

### Integração e segurança operacional
- Mostrar o resultado na ficha do produto/checkout como **aro estimado digitalmente**, distinguindo-o de **aro confirmado presencialmente** e **aro informado pela cliente**.
- Registrar método de medição, resultado, data e eventual confirmação da consultora, sem armazenar dados de cartão bancário.
- Pedido sob medida com aro pendente de confirmação não deve ser liberado automaticamente para a produção.
- Testar e calibrar com aneleiras profissionais e anéis acabados de diferentes larguras, comparando celulares e navegadores; definir tolerâncias aceitáveis antes de uso comercial.
- O recurso é uma **especificação aprovada para desenvolvimento**, não está implementado ou validado na landing page.
- Não publicar ou alterar o site oficial sem autorização.
