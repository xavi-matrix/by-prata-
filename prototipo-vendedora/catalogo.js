// By Prata: catálogo de demonstração, sem preços ou produtos comerciais reais.
// Substituir por resposta de API autenticada/validada antes do lançamento.
export const catalogoDemo = Object.freeze([
 {sku:"DEMO-ORG",nome:"Orgânico",categoria:"Curvas",descricao:"Prata 925 • Sem pedras",imagem_url:null,variantes:[]},
 {sku:"DEMO-MIN",nome:"Minimalista",categoria:"Linhas",descricao:"Prata 925 • Uso diário",imagem_url:null,variantes:[]},
 {sku:"DEMO-ESC",nome:"Escultural",categoria:"Volume",descricao:"Prata 925 • Design autoral",imagem_url:null,variantes:[]},
 {sku:"DEMO-CNT",nome:"Contemporâneo",categoria:"Texturas",descricao:"Prata 925 • Acabamentos variados",imagem_url:null,variantes:[]}
]);
export function validarSlug(slug) {
 return typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 60;
}
export function validarAro(aro) {
 return Number.isInteger(Number(aro)) && Number(aro)>=1 && Number(aro)<=40 && String(aro).trim()!=="";
}
export function formatarPreco(centavos) {
 if(!Number.isSafeInteger(centavos)||centavos<0) return "Preço sob consulta";
 return (centavos/100).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}
