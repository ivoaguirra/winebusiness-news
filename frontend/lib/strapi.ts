/**
 * Helper para conexão com a API do Strapi
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

interface FetchOptions extends RequestInit {
  token?: string;
}

/**
 * Função para fazer requisições à API do Strapi
 */
export async function fetchAPI(
  path: string,
  options: FetchOptions = {}
) {
  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${STRAPI_API_URL}${path}`;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do Strapi:', error);
    throw error;
  }
}

/**
 * Obter URL completa para imagens do Strapi
 */
export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return '';
  
  // Se já é uma URL completa, retorna ela
  if (url.startsWith('http')) return url;
  
  // Caso contrário, adiciona o URL base do Strapi
  return `${STRAPI_URL}${url}`;
}

/**
 * Exemplos de uso:
 * 
 * // Buscar artigos
 * const articles = await fetchAPI('/articles?populate=*');
 * 
 * // Buscar um artigo específico
 * const article = await fetchAPI('/articles/1?populate=*');
 * 
 * // Criar um artigo (requer token)
 * const newArticle = await fetchAPI('/articles', {
 *   method: 'POST',
 *   token: 'seu-token-aqui',
 *   body: JSON.stringify({ data: { title: 'Novo Artigo' } })
 * });
 */
