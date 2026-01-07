import Link from 'next/link';
import Image from 'next/image';
import { Clock, Tag } from 'lucide-react';
import type { Article } from '@/types';
import { formatDate, getImageUrl, truncateText, cn } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
  className?: string;
}

export default function ArticleCard({ article, variant = 'default', className }: ArticleCardProps) {
  const categorySlug = article.category?.slug || 'noticias';
  const articleUrl = `/${categorySlug}/${article.slug}`;

  if (variant === 'featured') {
    return (
      <article className={cn('group relative overflow-hidden rounded-xl', className)}>
        <Link href={articleUrl} className="block aspect-[16/9] md:aspect-[21/9]">
          <Image
            src={getImageUrl(article.featured_image?.url)}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            {article.category && (
              <span className="inline-block px-3 py-1 bg-gold-500 text-wine-900 text-xs font-semibold rounded-full mb-3">
                {article.category.name}
              </span>
            )}
            <h2 className="text-xl md:text-3xl font-serif font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
              {article.title}
            </h2>
            {article.excerpt && (
              <p className="text-gray-300 text-sm md:text-base line-clamp-2 mb-3">
                {article.excerpt}
              </p>
            )}
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span>{formatDate(article.publishedAt || article.createdAt)}</span>
              {article.reading_time && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.reading_time} min
                </span>
              )}
            </div>
          </div>
          {article.is_sponsored && (
            <span className="absolute top-4 right-4 px-2 py-1 bg-gray-900/80 text-gray-300 text-xs rounded">
              Patrocinado
            </span>
          )}
        </Link>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className={cn('group flex gap-4', className)}>
        <Link href={articleUrl} className="relative w-32 h-24 md:w-48 md:h-32 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={getImageUrl(article.featured_image?.url)}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="flex-1 min-w-0">
          {article.category && (
            <Link
              href={`/${article.category.slug}`}
              className="text-xs font-semibold text-wine-700 hover:text-wine-900 uppercase tracking-wide"
            >
              {article.category.name}
            </Link>
          )}
          <Link href={articleUrl}>
            <h3 className="font-serif font-bold text-gray-900 group-hover:text-wine-900 transition-colors line-clamp-2 mt-1">
              {article.title}
            </h3>
          </Link>
          <div className="flex items-center gap-3 text-gray-500 text-xs mt-2">
            <span>{formatDate(article.publishedAt || article.createdAt)}</span>
            {article.reading_time && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.reading_time} min
              </span>
            )}
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className={cn('group', className)}>
        <Link href={articleUrl} className="flex gap-3">
          <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
            <Image
              src={getImageUrl(article.featured_image?.url)}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 group-hover:text-wine-900 transition-colors line-clamp-2">
              {article.title}
            </h4>
            <span className="text-xs text-gray-500 mt-1 block">
              {formatDate(article.publishedAt || article.createdAt)}
            </span>
          </div>
        </Link>
      </article>
    );
  }

  // Default variant
  return (
    <article className={cn('group', className)}>
      <Link href={articleUrl} className="block relative aspect-[16/10] rounded-lg overflow-hidden mb-3">
        <Image
          src={getImageUrl(article.featured_image?.url)}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {article.is_sponsored && (
          <span className="absolute top-2 right-2 px-2 py-1 bg-gray-900/80 text-gray-300 text-xs rounded">
            Patrocinado
          </span>
        )}
      </Link>
      <div>
        {article.category && (
          <Link
            href={`/${article.category.slug}`}
            className="text-xs font-semibold text-wine-700 hover:text-wine-900 uppercase tracking-wide"
          >
            {article.category.name}
          </Link>
        )}
        <Link href={articleUrl}>
          <h3 className="font-serif font-bold text-lg text-gray-900 group-hover:text-wine-900 transition-colors mt-1 line-clamp-2">
            {article.title}
          </h3>
        </Link>
        {article.excerpt && (
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {truncateText(article.excerpt, 120)}
          </p>
        )}
        <div className="flex items-center gap-3 text-gray-500 text-xs mt-3">
          <span>{formatDate(article.publishedAt || article.createdAt)}</span>
          {article.reading_time && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.reading_time} min
            </span>
          )}
        </div>
        {article.tags && article.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <Tag className="w-3 h-3 text-gray-400" />
            {article.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag.id}
                href={`/tag/${tag.slug}`}
                className="text-xs text-gray-500 hover:text-wine-900"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
