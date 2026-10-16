// Armazenamento local apenas para ensaio administrativo. Nunca usar como fonte de pedidos reais.
const CHAVE='byprata-admin-demo-v1';
export function lerRascunhos(storage=localStorage){
 try {const v=JSON.parse(storage.getItem(CHAVE)||'null');return Array.isArray(v)?v:[]}catch{return []}
}
export function salvarRascunhos(lista,storage=localStorage){
 if(!Array.isArray(lista)||lista.length>200)throw new Error('Limite de rascunhos excedido');
 storage.setItem(CHAVE,JSON.stringify(lista));
}
export function criarRascunho({nome,sku,aro},existentes=[]){
 const n=String(nome??'').trim(),s=String(sku??'').trim().toUpperCase(),a=Number(aro);
 if(n.length<2||n.length>100)throw new Error('Nome deve ter de 2 a 100 caracteres');
 if(!/^[A-Z0-9-]{2,32}$/.test(s))throw new Error('SKU deve ter 2 a 32 letras, números ou hífens');
 if(!Number.isInteger(a)||a<1||a>40)throw new Error('Aro deve estar entre 1 e 40');
 if(existentes.some(p=>p.sku===s&&p.aro===a))throw new Error('SKU e aro já cadastrados');
 return {id:crypto.randomUUID(),nome:n,sku:s,aro:a,ativo:false,criadoEm:new Date().toISOString()};
}
