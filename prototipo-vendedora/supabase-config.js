// Chave PUBLICÁVEL do ambiente de desenvolvimento; nunca usar service_role aqui.
export const supabaseConfig = Object.freeze({
 url: 'https://fhtuvpqxkmmrigjkqcgw.supabase.co',
 publishableKey: 'sb_publishable_jwD2Cyf3wCylDNk006i4OQ_TKXn4f6j'
});
export function configValida(c=supabaseConfig) {
 return /^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(c.url)
   && /^sb_publishable_[A-Za-z0-9_-]+$/.test(c.publishableKey);
}
