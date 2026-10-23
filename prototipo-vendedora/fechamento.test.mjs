import test from 'node:test';
import assert from 'node:assert/strict';
import {resumirCompetencia,proximaDataPrevistaPagamento} from './fechamento.js';
const base={consultoraId:'ana',competencia:'2026-10',pago:true,entregueEm:'2026-10-01T12:00:00Z',prazoDevolucaoAte:'2026-10-08T12:00:00Z',agora:'2026-10-12T12:00:00Z'};
test('fecha apenas pedidos elegíveis',()=>{
 const p=[{...base,id:'1',valorCentavos:100000},{...base,id:'2',valorCentavos:200000,pendencia:true},{...base,id:'3',valorCentavos:50000,cancelado:true}];
 const [r]=resumirCompetencia(p,'2026-10');
 assert.equal(r.vendasElegiveisCentavos,100000);
 assert.equal(r.comissaoLiberadaCentavos,20000);
 assert.equal(r.comissaoPendenteCentavos,40000);
 assert.equal(r.premioEstimadoCentavos,3000);
 assert.equal(r.totalEstimadoLiberadoCentavos,23000);
});
test('não permite duplicação de pedido',()=>assert.throws(()=>resumirCompetencia([{...base,id:'1',valorCentavos:100},{...base,id:'1',valorCentavos:100}],'2026-10')));
test('datas nominais 10, 20 e 30',()=>{
 assert.equal(proximaDataPrevistaPagamento('2026-10-12'),'2026-10-20');
 assert.equal(proximaDataPrevistaPagamento('2026-10-30'),'2026-11-10');
 assert.equal(proximaDataPrevistaPagamento('2026-02-21'),'2026-03-10');
});
