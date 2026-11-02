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
  async cadastrarProduto({sku,nome,descricao}) {
   if(!token) throw new Error('É necessário entrar como administrador.');
   const codigo=String(sku??'').trim().toUpperCase();
   const titulo=String(nome??'').trim();
   if(!/^[A-Z0-9-]{2,32}$/.test(codigo)) throw new Error('SKU inválido.');
   if(titulo.length<2||titulo.length>100) throw new Error('Nome inválido.');
   const resultado=await request('/rest/v1/produtos',{method:'POST',headers:{Authorization:'Bearer '+token,Prefer:'return=representation'},body:JSON.stringify({sku:codigo,nome:titulo,descricao:String(descricao??'').trim(),ativo:false})});
   if(!Array.isArray(resultado)||resultado.length!==1) throw new Error('Cadastro não confirmado.');
   return resultado[0];
  },
  async cadastrarConsultora({nome,slug,whatsapp}) {
   if(!token) throw new Error('É necessário entrar como administrador.');
   const titulo=String(nome??'').trim();
   const identificador=String(slug??'').trim().toLowerCase();
   const telefone=String(whatsapp??'').replace(/\D/g,'');
   if(titulo.length<2||titulo.length>100) throw new Error('Nome inválido.');
   if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(identificador)) throw new Error('Identificador inválido.');
   if(telefone && !/^55[1-9][0-9]{9,10}$/.test(telefone)) throw new Error('WhatsApp deve conter 55, DDD e número.');
   const result=await request('/rest/v1/consultoras',{method:'POST',headers:{Authorization:'Bearer '+token,Prefer:'return=representation'},body:JSON.stringify({nome:titulo,slug:identificador,whatsapp:telefone||null,ativa:false})});
   if(!Array.isArray(result)||result.length!==1) throw new Error('Cadastro não confirmado.');
   return result[0];
  },
  async listarConsultoras() {
   if(!token) throw new Error('É necessário entrar como administrador.');
   return request('/rest/v1/consultoras?select=id,nome,slug,whatsapp,ativa&order=criada_em.desc&limit=100',{headers:{Authorization:'Bearer '+token}});
  },
  async sair() {
   const anterior=token;token=null;
   if(anterior) await fetcher(base+'/auth/v1/logout',{method:'POST',headers:{...headers,Authorization:'Bearer '+anterior}}).catch(()=>{});
  }
 };
}
