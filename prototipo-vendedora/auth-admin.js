// Cliente Auth mínimo para o protótipo estático, sem dependências.
// Tokens ficam apenas em memória; nenhum token é gravado em localStorage.
import {supabaseConfig,configValida} from './supabase-config.js';
export function criarAuthAdmin(config=supabaseConfig, fetcher=fetch) {
 if (!configValida(config)) throw new Error('Configuração pública ausente');
 const base=config.url.replace(/\/$/,'');
 const headers={'apikey':config.publishableKey,'Content-Type':'application/json'};
 let token=null;
 async function request(path,options={}) {
  const response=await fetcher(base+path,{...options,headers:{...headers,...options.headers}});
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(response.status===401?'Credenciais inválidas ou sessão expirada.':'Falha na autenticação ou permissão.');
  return data;
 }
 return {
  async entrar(email,senha) {
   token=null;
   const session=await request('/auth/v1/token?grant_type=password',{method:'POST',body:JSON.stringify({email,password:senha})});
   if(!session.access_token) throw new Error('Não foi possível iniciar a sessão.');
   try {
    const admins=await request('/rest/v1/administradores?select=usuario_id&limit=1',{headers:{Authorization:'Bearer '+session.access_token}});
    if(!Array.isArray(admins)||admins.length!==1) throw new Error('Conta sem autorização administrativa.');
    token=session.access_token;
    return {autorizado:true};
   } catch(e) {
    await fetcher(base+'/auth/v1/logout',{method:'POST',headers:{...headers,Authorization:'Bearer '+session.access_token}}).catch(()=>{});
    throw e;
   }
  },
  async listarProdutos() {
   if(!token) throw new Error('É necessário entrar como administrador.');
   return request('/rest/v1/produtos?select=id,sku,nome,ativo&order=criado_em.desc&limit=100',{headers:{Authorization:'Bearer '+token}});
  },
  async sair() {
   const anterior=token;token=null;
   if(anterior) await fetcher(base+'/auth/v1/logout',{method:'POST',headers:{...headers,Authorization:'Bearer '+anterior}}).catch(()=>{});
  }
 };
}
