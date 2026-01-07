// Types para o WineBusiness.news

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  order: number;
}

export interface Tag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  type: 'segment' | 'country' | 'channel' | 'content_type' | 'theme';
}

export interface Author {
  id: number;
  username: string;
  email: string;
}

export interface MediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface Media {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
  };
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featured_image?: Media;
  status: 'draft' | 'review' | 'scheduled' | 'published';
  publish_date?: string;
  category?: Category;
  tags?: Tag[];
  author?: Author;
  seo_title?: string;
  seo_description?: string;
  is_featured: boolean;
  is_sponsored: boolean;
  reading_time?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Person {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  photo?: Media;
  previous_position?: string;
  previous_company?: string;
  new_position?: string;
  new_company?: string;
  movement_type: 'hired' | 'promoted' | 'left' | 'other';
  description?: string;
  status: 'draft' | 'review' | 'scheduled' | 'published';
  publish_date?: string;
  author?: Author;
  tags?: Tag[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Event {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  featured_image?: Media;
  start_date: string;
  end_date?: string;
  location?: string;
  city?: string;
  country: string;
  format: 'presential' | 'online' | 'hybrid';
  target_audience?: string;
  event_type?: string;
  external_link?: string;
  is_featured: boolean;
  status: 'draft' | 'review' | 'scheduled' | 'published';
  author?: Author;
  tags?: Tag[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface RankingResult {
  id: number;
  position: number;
  name: string;
  company?: string;
  score?: number;
  notes?: string;
}

export interface RankingCategory {
  id: number;
  name: string;
  results: RankingResult[];
}

export interface JuryMember {
  id: number;
  name: string;
  title?: string;
  company?: string;
  photo?: Media;
}

export interface Ranking {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  year: number;
  edition?: string;
  description?: string;
  methodology?: string;
  featured_image?: Media;
  status: 'draft' | 'review' | 'scheduled' | 'published';
  author?: Author;
  categories?: RankingCategory[];
  jury_members?: JuryMember[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Page {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content?: string;
  seo_title?: string;
  seo_description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface NewsletterSubscriber {
  email: string;
  name?: string;
  segment: 'importer' | 'retail' | 'producer' | 'other';
}

export interface AdSetting {
  id: number;
  placement: 'top_banner' | 'sidebar' | 'in_article_1' | 'in_article_2' | 'footer';
  enabled: boolean;
  ad_unit_id?: string;
  sizes_desktop?: number[][];
  sizes_mobile?: number[][];
  key_values?: Record<string, string>;
  max_per_page: number;
  lazy_load: boolean;
  refresh_enabled: boolean;
  refresh_interval: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
