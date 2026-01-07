import axios from 'axios';
import type { Article, Category, Tag, Event, Ranking, Page, Person, AdSetting, StrapiResponse } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicionar token de API se disponível
if (process.env.STRAPI_API_TOKEN) {
  api.defaults.headers.common['Authorization'] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
}

// Articles
export async function getArticles(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
  featured?: boolean;
  sort?: string;
}): Promise<StrapiResponse<Article[]>> {
  const { page = 1, pageSize = 10, category, tag, featured, sort = 'publishedAt:desc' } = params || {};
  
  const filters: Record<string, unknown> = {
    status: { $eq: 'published' },
  };
  
  if (category) {
    filters['category'] = { slug: { $eq: category } };
  }
  
  if (tag) {
    filters['tags'] = { slug: { $in: [tag] } };
  }
  
  if (featured !== undefined) {
    filters['is_featured'] = { $eq: featured };
  }

  const response = await api.get('/api/articles', {
    params: {
      populate: ['featured_image', 'category', 'tags', 'author'],
      filters,
      sort,
      pagination: { page, pageSize },
    },
  });
  
  return response.data;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const response = await api.get('/api/articles', {
    params: {
      filters: { slug: { $eq: slug } },
      populate: ['featured_image', 'category', 'tags', 'author'],
    },
  });
  
  return response.data.data?.[0] || null;
}

export async function getFeaturedArticles(limit = 3): Promise<Article[]> {
  const response = await getArticles({ featured: true, pageSize: limit });
  return response.data;
}

// Categories
export async function getCategories(): Promise<Category[]> {
  const response = await api.get('/api/categories', {
    params: {
      sort: 'order:asc',
    },
  });
  
  return response.data.data;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const response = await api.get('/api/categories', {
    params: {
      filters: { slug: { $eq: slug } },
    },
  });
  
  return response.data.data?.[0] || null;
}

// Tags
export async function getTags(type?: string): Promise<Tag[]> {
  const filters: Record<string, unknown> = {};
  
  if (type) {
    filters['type'] = { $eq: type };
  }
  
  const response = await api.get('/api/tags', {
    params: {
      filters,
      sort: 'name:asc',
    },
  });
  
  return response.data.data;
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const response = await api.get('/api/tags', {
    params: {
      filters: { slug: { $eq: slug } },
    },
  });
  
  return response.data.data?.[0] || null;
}

// People (Gente)
export async function getPeople(params?: {
  page?: number;
  pageSize?: number;
}): Promise<StrapiResponse<Person[]>> {
  const { page = 1, pageSize = 10 } = params || {};
  
  const response = await api.get('/api/people', {
    params: {
      populate: ['photo', 'tags', 'author'],
      filters: { status: { $eq: 'published' } },
      sort: 'publishedAt:desc',
      pagination: { page, pageSize },
    },
  });
  
  return response.data;
}

export async function getPersonBySlug(slug: string): Promise<Person | null> {
  const response = await api.get('/api/people', {
    params: {
      filters: { slug: { $eq: slug } },
      populate: ['photo', 'tags', 'author'],
    },
  });
  
  return response.data.data?.[0] || null;
}

// Events
export async function getEvents(params?: {
  page?: number;
  pageSize?: number;
  upcoming?: boolean;
  city?: string;
  format?: string;
}): Promise<StrapiResponse<Event[]>> {
  const { page = 1, pageSize = 10, upcoming, city, format } = params || {};
  
  const filters: Record<string, unknown> = {
    status: { $eq: 'published' },
  };
  
  if (upcoming) {
    filters['start_date'] = { $gte: new Date().toISOString() };
  }
  
  if (city) {
    filters['city'] = { $eq: city };
  }
  
  if (format) {
    filters['format'] = { $eq: format };
  }
  
  const response = await api.get('/api/events', {
    params: {
      populate: ['featured_image', 'tags', 'author'],
      filters,
      sort: 'start_date:asc',
      pagination: { page, pageSize },
    },
  });
  
  return response.data;
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const response = await api.get('/api/events', {
    params: {
      filters: { slug: { $eq: slug } },
      populate: ['featured_image', 'tags', 'author'],
    },
  });
  
  return response.data.data?.[0] || null;
}

export async function getFeaturedEvents(limit = 5): Promise<Event[]> {
  const response = await api.get('/api/events', {
    params: {
      populate: ['featured_image'],
      filters: {
        status: { $eq: 'published' },
        is_featured: { $eq: true },
        start_date: { $gte: new Date().toISOString() },
      },
      sort: 'start_date:asc',
      pagination: { pageSize: limit },
    },
  });
  
  return response.data.data;
}

// Rankings
export async function getRankings(params?: {
  page?: number;
  pageSize?: number;
  year?: number;
}): Promise<StrapiResponse<Ranking[]>> {
  const { page = 1, pageSize = 10, year } = params || {};
  
  const filters: Record<string, unknown> = {
    status: { $eq: 'published' },
  };
  
  if (year) {
    filters['year'] = { $eq: year };
  }
  
  const response = await api.get('/api/rankings', {
    params: {
      populate: ['featured_image', 'author'],
      filters,
      sort: 'year:desc',
      pagination: { page, pageSize },
    },
  });
  
  return response.data;
}

export async function getRankingBySlug(slug: string): Promise<Ranking | null> {
  const response = await api.get('/api/rankings', {
    params: {
      filters: { slug: { $eq: slug } },
      populate: ['featured_image', 'author', 'categories.results', 'jury_members.photo'],
    },
  });
  
  return response.data.data?.[0] || null;
}

// Pages
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const response = await api.get('/api/pages', {
    params: {
      filters: { slug: { $eq: slug } },
    },
  });
  
  return response.data.data?.[0] || null;
}

// Ad Settings
export async function getAdSettings(): Promise<AdSetting[]> {
  const response = await api.get('/api/ad-settings', {
    params: {
      filters: { enabled: { $eq: true } },
    },
  });
  
  return response.data.data;
}

// Newsletter
export async function subscribeNewsletter(data: {
  email: string;
  name?: string;
  segment?: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    await api.post('/api/newsletter-subscribers', { data });
    return { success: true, message: 'Inscrição realizada! Verifique seu email para confirmar.' };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { error?: { message?: string } } } };
    if (err.response?.data?.error?.message?.includes('unique')) {
      return { success: false, message: 'Este email já está cadastrado.' };
    }
    return { success: false, message: 'Erro ao realizar inscrição. Tente novamente.' };
  }
}

// Search
export async function searchContent(query: string): Promise<{
  articles: Article[];
  events: Event[];
  rankings: Ranking[];
}> {
  const [articlesRes, eventsRes, rankingsRes] = await Promise.all([
    api.get('/api/articles', {
      params: {
        filters: {
          $or: [
            { title: { $containsi: query } },
            { excerpt: { $containsi: query } },
          ],
          status: { $eq: 'published' },
        },
        populate: ['featured_image', 'category'],
        pagination: { pageSize: 5 },
      },
    }),
    api.get('/api/events', {
      params: {
        filters: {
          title: { $containsi: query },
          status: { $eq: 'published' },
        },
        populate: ['featured_image'],
        pagination: { pageSize: 5 },
      },
    }),
    api.get('/api/rankings', {
      params: {
        filters: {
          title: { $containsi: query },
          status: { $eq: 'published' },
        },
        populate: ['featured_image'],
        pagination: { pageSize: 5 },
      },
    }),
  ]);

  return {
    articles: articlesRes.data.data,
    events: eventsRes.data.data,
    rankings: rankingsRes.data.data,
  };
}

export default api;
