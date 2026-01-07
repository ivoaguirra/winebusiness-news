import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  
  return new Date(date).toLocaleDateString('pt-BR', options || defaultOptions);
}

export function formatDateShort(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getImageUrl(url?: string): string {
  // Usar placeholder local para demonstração
  if (!url || url === '/placeholder.jpg') return '/placeholder.jpg';
  if (url.startsWith('http')) return url;
  // Em produção, usar URL do Strapi
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (strapiUrl) {
    return `${strapiUrl}${url}`;
  }
  return '/placeholder.jpg';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function getMovementTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    hired: 'Contratação',
    promoted: 'Promoção',
    left: 'Saída',
    other: 'Movimentação',
  };
  return labels[type] || type;
}

export function getEventFormatLabel(format: string): string {
  const labels: Record<string, string> = {
    presential: 'Presencial',
    online: 'Online',
    hybrid: 'Híbrido',
  };
  return labels[format] || format;
}

export function getSegmentLabel(segment: string): string {
  const labels: Record<string, string> = {
    importer: 'Importador',
    retail: 'Varejo',
    producer: 'Produtor',
    other: 'Outro',
  };
  return labels[segment] || segment;
}
