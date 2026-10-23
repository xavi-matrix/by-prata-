// Funções puras para regras de comissão da By Prata.
// Valores em centavos. Nenhuma função realiza pagamentos.
export function calcularComissaoCentavos(baseCentavos, percentual = 20) {
 if (!Number.isSafeInteger(baseCentavos) || baseCentavos < 0) throw new RangeError('base inválida');
 if (!Number.isFinite(percentual) || percentual < 0 || percentual > 100) throw new RangeError('percentual inválido');
 return Math.round(baseCentavos * percentual / 100);
}
// Metas e valores abaixo são propostas ainda sujeitas a aprovação.
export const metasPropostas = Object.freeze([
 {minimoCentavos: 300000, premioCentavos: 15000},
 {minimoCentavos: 200000, premioCentavos: 8000},
 {minimoCentavos: 100000, premioCentavos: 3000}
]);
export function premioPropostoCentavos(vendasElegiveisCentavos) {
 if (!Number.isSafeInteger(vendasElegiveisCentavos) || vendasElegiveisCentavos < 0) throw new RangeError('vendas inválidas');
 return metasPropostas.find(m => vendasElegiveisCentavos >= m.minimoCentavos)?.premioCentavos ?? 0;
}
export function elegivelParaLiberacao({pago, entregueEm, prazoDevolucaoAte, agora, pendencia = false, cancelado = false, reembolsado = false}) {
 if (!pago || pendencia || cancelado || reembolsado || !entregueEm || !prazoDevolucaoAte) return false;
 const entrega = Date.parse(entregueEm), prazo = Date.parse(prazoDevolucaoAte), instante = Date.parse(agora);
 return [entrega,prazo,instante].every(Number.isFinite) && prazo >= entrega && instante > prazo;
}
