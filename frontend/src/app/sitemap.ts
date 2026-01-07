import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://winebusiness.news';

// Em produção, buscar artigos do Strapi
async function getArticles() {
  // TODO: Implementar fetch do Strapi
  return [
    { slug: 'noticias/importacoes-vinhos-crescem-15-primeiro-trimestre-2026', updatedAt: '2026-01-06' },
    { slug: 'noticias/vinicola-chilena-anuncia-expansao-mercado-brasileiro', updatedAt: '2026-01-05' },
  ];
}

async function getEvents() {
  return [
    { slug: 'eventos/prowein-2026', updatedAt: '2026-01-01' },
    { slug: 'eventos/expovinis-brasil-2026', updatedAt: '2026-01-01' },
  ];
}

async function getRankings() {
  return [
    { slug: 'rankings/top-50-importadores-vinhos-brasil-2025', updatedAt: '2025-12-01' },
    { slug: 'rankings/melhores-vinhos-brasileiros-2025', updatedAt: '2025-11-15' },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  const events = await getEvents();
  const rankings = await getRankings();

  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/noticias`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/gente`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/importadores`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/produtores`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/varejo`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dados-insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/opiniao-entrevistas`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/eventos`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/rankings`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/newsletter`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Dynamic article pages
  const articlePages = articles.map((article) => ({
    url: `${BASE_URL}/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dynamic event pages
  const eventPages = events.map((event) => ({
    url: `${BASE_URL}/${event.slug}`,
    lastModified: new Date(event.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Dynamic ranking pages
  const rankingPages = rankings.map((ranking) => ({
    url: `${BASE_URL}/${ranking.slug}`,
    lastModified: new Date(ranking.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages, ...eventPages, ...rankingPages];
}
