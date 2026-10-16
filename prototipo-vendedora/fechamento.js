// Simulação local e determinística. Não consulta dados de clientes nem envia Pix.
import {calcularComissaoCentavos,premioPropostoCentavos,elegivelParaLiberacao} from './regras-comerciais.js';

export function resumirCompetencia(pedidos, competencia) {
 if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(competencia)) throw new Error('Competência inválida');
 if (!Array.isArray(pedidos)) throw new TypeError('Pedidos inválidos');
 const ids = new Set();
 const grupos = new Map();
 for (const p of pedidos) {
  if (!p || typeof p.id !== 'string' || ids.has(p.id)) throw new Error('Pedido duplicado ou inválido');
  ids.add(p.id);
  if (typeof p.consultoraId !== 'string' || !p.consultoraId) throw new Error('Consultora inválida');
  if (!Number.isSafeInteger(p.valorCentavos) || p.valorCentavos < 0) throw new Error('Valor inválido');
  if (p.competencia !== competencia) continue;
  const g = grupos.get(p.consultoraId) ?? {consultoraId:p.consultoraId,competencia,vendasElegiveisCentavos:0,comissaoLiberadaCentavos:0,comissaoPendenteCentavos:0,quantidadePedidos:0};
  g.quantidadePedidos++;
  if (!p.cancelado && !p.reembolsado && p.pago) {
   const comissao = calcularComissaoCentavos(p.valorCentavos);
   if (elegivelParaLiberacao(p)) {
    g.vendasElegiveisCentavos += p.valorCentavos;
    g.comissaoLiberadaCentavos += comissao;
   } else g.comissaoPendenteCentavos += comissao;
  }
  grupos.set(p.consultoraId,g);
 }
 return [...grupos.values()].sort((a,b)=>a.consultoraId.localeCompare(b.consultoraId)).map(g=>({
  ...g,premioEstimadoCentavos:premioPropostoCentavos(g.vendasElegiveisCentavos),
  totalEstimadoLiberadoCentavos:g.comissaoLiberadaCentavos+premioPropostoCentavos(g.vendasElegiveisCentavos)
 }));
}
export function proximaDataPrevistaPagamento(isoDate) {
 const d=new Date(isoDate);
 if(!Number.isFinite(d.getTime()))throw new Error('Data inválida');
 const year=d.getUTCFullYear(),month=d.getUTCMonth(),day=d.getUTCDate();
 const next=[10,20,30].find(n=>n>day && new Date(Date.UTC(year,month,n)).getUTCMonth()===month);
 if(next)return new Date(Date.UTC(year,month,next)).toISOString().slice(0,10);
 return new Date(Date.UTC(year,month+1,10)).toISOString().slice(0,10);
}
// Datas acima são apenas calendário nominal; não tratam feriados nem conciliação bancária.
