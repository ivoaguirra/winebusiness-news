/**
 * Data service: fetches from Strapi API, falls back to mock data.
 *
 * On Vercel (production) the frontend calls the Railway Strapi backend.
 * If Strapi is unavailable or returns no data the service gracefully
 * returns the built-in mock data so the portal always renders.
 */
import type { Article, Event, Category, Ranking, StrapiResponse } from '@/types';
import {
  mockArticles,
  mockEvents,
  mockCategories,
  mockRankings,
} from './mock-data';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// ---------------------------------------------------------------------------
// Generic Strapi fetch helper
// ---------------------------------------------------------------------------
async function strapiGet<T>(path: string, params?: Record<string, unknown>): Promise<T | null> {
  try {
    const url = new URL(`/api${path}`, STRAPI_URL);

    if (params) {
      // qs-style nested params for Strapi (simplified)
      const flat = flattenParams(params);
      for (const [key, value] of Object.entries(flat)) {
        url.searchParams.set(key, String(value));
      }
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }

    const res = await fetch(url.toString(), {
      headers,
      next: { revalidate: 60 }, // ISR: revalidate every 60s
    });

    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Flatten nested params to Strapi-compatible query string keys */
function flattenParams(
  obj: Record<string, unknown>,
  prefix = '',
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}[${key}]` : key;
    if (value !== null && value !== undefined && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenParams(value as Record<string, unknown>, newKey));
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (typeof v === 'object' && v !== null) {
          Object.assign(result, flattenParams(v as Record<string, unknown>, `${newKey}[${i}]`));
        } else {
          result[`${newKey}[${i}]`] = String(v);
        }
      });
    } else {
      result[newKey] = String(value ?? '');
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------
export async function getFeaturedArticles(limit = 3): Promise<Article[]> {
  const res = await strapiGet<StrapiResponse<Article[]>>('/articles', {
    populate: ['featured_image', 'category', 'tags', 'author'],
    filters: { status: { $eq: 'published' }, is_featured: { $eq: true } },
    sort: 'publishedAt:desc',
    pagination: { pageSize: limit },
  });

  if (res?.data && res.data.length > 0) return res.data;
  return mockArticles.filter((a) => a.is_featured).slice(0, limit);
}

export async function getLatestArticles(page = 1, pageSize = 10): Promise<StrapiResponse<Article[]>> {
  const res = await strapiGet<StrapiResponse<Article[]>>('/articles', {
    populate: ['featured_image', 'category', 'tags', 'author'],
    filters: { status: { $eq: 'published' } },
    sort: 'publishedAt:desc',
    pagination: { page, pageSize },
  });

  if (res?.data && res.data.length > 0) return res;
  return {
    data: mockArticles.slice((page - 1) * pageSize, page * pageSize),
    meta: { pagination: { page, pageSize, pageCount: 1, total: mockArticles.length } },
  };
}

export async function getArticlesByCategory(
  categorySlug: string,
  page = 1,
  pageSize = 10,
): Promise<StrapiResponse<Article[]>> {
  const res = await strapiGet<StrapiResponse<Article[]>>('/articles', {
    populate: ['featured_image', 'category', 'tags', 'author'],
    filters: { status: { $eq: 'published' }, category: { slug: { $eq: categorySlug } } },
    sort: 'publishedAt:desc',
    pagination: { page, pageSize },
  });

  if (res?.data && res.data.length > 0) return res;
  // fallback: all mock articles (mock has no category filtering)
  return {
    data: mockArticles.slice(0, pageSize),
    meta: { pagination: { page, pageSize, pageCount: 1, total: mockArticles.length } },
  };
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const res = await strapiGet<StrapiResponse<Article[]>>('/articles', {
    populate: ['featured_image', 'category', 'tags', 'author'],
    filters: { slug: { $eq: slug } },
  });

  if (res?.data?.[0]) return res.data[0];
  return mockArticles.find((a) => a.slug === slug) ?? mockArticles[0];
}

export async function getRelatedArticles(
  articleId: number,
  categorySlug?: string,
  limit = 2,
): Promise<Article[]> {
  if (categorySlug) {
    const res = await strapiGet<StrapiResponse<Article[]>>('/articles', {
      populate: ['featured_image', 'category'],
      filters: {
        status: { $eq: 'published' },
        category: { slug: { $eq: categorySlug } },
        id: { $ne: articleId },
      },
      sort: 'publishedAt:desc',
      pagination: { pageSize: limit },
    });
    if (res?.data && res.data.length > 0) return res.data;
  }
  return mockArticles.filter((a) => a.id !== articleId).slice(0, limit);
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export async function getCategories(): Promise<Category[]> {
  const res = await strapiGet<StrapiResponse<Category[]>>('/categories', {
    sort: 'order:asc',
  });

  if (res?.data && res.data.length > 0) return res.data;
  return mockCategories;
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------
export async function getEvents(page = 1, pageSize = 10): Promise<StrapiResponse<Event[]>> {
  const res = await strapiGet<StrapiResponse<Event[]>>('/events', {
    populate: ['featured_image', 'tags'],
    filters: { status: { $eq: 'published' } },
    sort: 'start_date:asc',
    pagination: { page, pageSize },
  });

  if (res?.data && res.data.length > 0) return res;
  return {
    data: mockEvents.slice((page - 1) * pageSize, page * pageSize),
    meta: { pagination: { page, pageSize, pageCount: 1, total: mockEvents.length } },
  };
}

export async function getFeaturedEvents(limit = 5): Promise<Event[]> {
  const res = await strapiGet<StrapiResponse<Event[]>>('/events', {
    populate: ['featured_image'],
    filters: {
      status: { $eq: 'published' },
      is_featured: { $eq: true },
      start_date: { $gte: new Date().toISOString() },
    },
    sort: 'start_date:asc',
    pagination: { pageSize: limit },
  });

  if (res?.data && res.data.length > 0) return res.data;
  return mockEvents.filter((e) => e.is_featured).slice(0, limit);
}

export async function getUpcomingEvents(limit = 3): Promise<Event[]> {
  const res = await strapiGet<StrapiResponse<Event[]>>('/events', {
    populate: ['featured_image'],
    filters: {
      status: { $eq: 'published' },
      start_date: { $gte: new Date().toISOString() },
    },
    sort: 'start_date:asc',
    pagination: { pageSize: limit },
  });

  if (res?.data && res.data.length > 0) return res.data;
  return mockEvents.slice(0, limit);
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const res = await strapiGet<StrapiResponse<Event[]>>('/events', {
    populate: ['featured_image', 'tags', 'author'],
    filters: { slug: { $eq: slug } },
  });

  if (res?.data?.[0]) return res.data[0];
  return mockEvents.find((e) => e.slug === slug) ?? null;
}

// ---------------------------------------------------------------------------
// Rankings
// ---------------------------------------------------------------------------
export async function getRankings(page = 1, pageSize = 10): Promise<StrapiResponse<Ranking[]>> {
  const res = await strapiGet<StrapiResponse<Ranking[]>>('/rankings', {
    populate: ['featured_image', 'author'],
    filters: { status: { $eq: 'published' } },
    sort: 'year:desc',
    pagination: { page, pageSize },
  });

  if (res?.data && res.data.length > 0) return res;
  return {
    data: mockRankings.slice((page - 1) * pageSize, page * pageSize),
    meta: { pagination: { page, pageSize, pageCount: 1, total: mockRankings.length } },
  };
}

export async function getRankingBySlug(slug: string): Promise<Ranking | null> {
  const res = await strapiGet<StrapiResponse<Ranking[]>>('/rankings', {
    populate: ['featured_image', 'author', 'categories.results', 'jury_members.photo'],
    filters: { slug: { $eq: slug } },
  });

  if (res?.data?.[0]) return res.data[0];
  return mockRankings.find((r) => r.slug === slug) ?? null;
}

// ---------------------------------------------------------------------------
// Sitemap / RSS helpers
// ---------------------------------------------------------------------------
export async function getAllArticleSlugs(): Promise<{ slug: string; category: string; updatedAt: string }[]> {
  const res = await strapiGet<StrapiResponse<Article[]>>('/articles', {
    fields: ['slug', 'updatedAt'],
    populate: ['category'],
    filters: { status: { $eq: 'published' } },
    sort: 'publishedAt:desc',
    pagination: { pageSize: 100 },
  });

  if (res?.data && res.data.length > 0) {
    return res.data.map((a) => ({
      slug: `${a.category?.slug ?? 'noticias'}/${a.slug}`,
      category: a.category?.name ?? 'Notícias',
      updatedAt: a.updatedAt,
    }));
  }

  return mockArticles.map((a) => ({
    slug: `${a.category?.slug ?? 'noticias'}/${a.slug}`,
    category: a.category?.name ?? 'Notícias',
    updatedAt: a.updatedAt,
  }));
}

export async function getAllEventSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
  const res = await strapiGet<StrapiResponse<Event[]>>('/events', {
    fields: ['slug', 'updatedAt'],
    filters: { status: { $eq: 'published' } },
    pagination: { pageSize: 100 },
  });

  if (res?.data && res.data.length > 0) {
    return res.data.map((e) => ({ slug: `eventos/${e.slug}`, updatedAt: e.updatedAt }));
  }

  return mockEvents.map((e) => ({ slug: `eventos/${e.slug}`, updatedAt: e.updatedAt }));
}

export async function getAllRankingSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
  const res = await strapiGet<StrapiResponse<Ranking[]>>('/rankings', {
    fields: ['slug', 'updatedAt'],
    filters: { status: { $eq: 'published' } },
    pagination: { pageSize: 100 },
  });

  if (res?.data && res.data.length > 0) {
    return res.data.map((r) => ({ slug: `rankings/${r.slug}`, updatedAt: r.updatedAt }));
  }

  return mockRankings.map((r) => ({ slug: `rankings/${r.slug}`, updatedAt: r.updatedAt }));
}

export async function getLatestArticlesForRSS(limit = 20): Promise<{
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  author: string;
}[]> {
  const res = await strapiGet<StrapiResponse<Article[]>>('/articles', {
    populate: ['category', 'author'],
    filters: { status: { $eq: 'published' } },
    sort: 'publishedAt:desc',
    pagination: { pageSize: limit },
  });

  if (res?.data && res.data.length > 0) {
    return res.data.map((a) => ({
      title: a.title,
      slug: `${a.category?.slug ?? 'noticias'}/${a.slug}`,
      excerpt: a.excerpt ?? '',
      publishedAt: a.publishedAt ?? a.createdAt,
      category: a.category?.name ?? 'Notícias',
      author: a.author?.username ?? 'Redação',
    }));
  }

  return mockArticles.map((a) => ({
    title: a.title,
    slug: `${a.category?.slug ?? 'noticias'}/${a.slug}`,
    excerpt: a.excerpt ?? '',
    publishedAt: a.publishedAt ?? a.createdAt,
    category: a.category?.name ?? 'Notícias',
    author: a.author?.username ?? 'Redação',
  }));
}
