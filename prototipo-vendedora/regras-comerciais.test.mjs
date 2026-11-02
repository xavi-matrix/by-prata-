import test from 'node:test';
import assert from 'node:assert/strict';
import {calcularComissaoCentavos,premioPropostoCentavos,elegivelParaLiberacao} from './regras-comerciais.js';
test('comissão fixa de 20% em centavos',()=>{assert.equal(calcularComissaoCentavos(100000),20000);assert.equal(calcularComissaoCentavos(100100),20020);});
test('prêmios não cumulativos por faixa proposta',()=>{assert.equal(premioPropostoCentavos(99999),0);assert.equal(premioPropostoCentavos(100000),3000);assert.equal(premioPropostoCentavos(200000),8000);assert.equal(premioPropostoCentavos(300000),15000);});
test('só libera após prazo de devolução',()=>{const pedido={pago:true,entregueEm:'2026-10-01T12:00:00Z',prazoDevolucaoAte:'2026-10-08T12:00:00Z'};assert.equal(elegivelParaLiberacao({...pedido,agora:'2026-10-08T12:00:00Z'}),false);assert.equal(elegivelParaLiberacao({...pedido,agora:'2026-10-09T12:00:00Z'}),true);assert.equal(elegivelParaLiberacao({...pedido,agora:'2026-10-09T12:00:00Z',pendencia:true}),false);assert.equal(elegivelParaLiberacao({...pedido,agora:'2026-10-09T12:00:00Z',reembolsado:true}),false);});
test('rejeita base inválida',()=>assert.throws(()=>calcularComissaoCentavos(-1)));
