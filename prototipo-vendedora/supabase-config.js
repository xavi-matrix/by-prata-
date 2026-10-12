// Configuração pública de desenvolvimento. Nunca inclua service_role ou secret key.
// Preencha apenas URL e publishable key, que são próprias para clientes públicos.
export const supabaseConfig = Object.freeze({
 url: '',
 publishableKey: ''
});
export function configValida(c=supabaseConfig) {
 return /^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(c.url)
   && /^(sb_publishable_|eyJ)/.test(c.publishableKey);
}
