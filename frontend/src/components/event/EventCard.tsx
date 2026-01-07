import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Globe, ExternalLink } from 'lucide-react';
import type { Event } from '@/types';
import { getImageUrl, getEventFormatLabel, cn } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'compact' | 'list';
  className?: string;
}

export default function EventCard({ event, variant = 'default', className }: EventCardProps) {
  const eventUrl = `/eventos/${event.slug}`;

  if (variant === 'list') {
    return (
      <article className={cn('group flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-wine-300 transition-colors', className)}>
        <div className="flex-shrink-0 w-16 text-center">
          <div className="text-2xl font-bold text-wine-900">
            {new Date(event.start_date).getDate()}
          </div>
          <div className="text-xs text-gray-500 uppercase">
            {new Date(event.start_date).toLocaleDateString('pt-BR', { month: 'short' })}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <Link href={eventUrl}>
            <h3 className="font-semibold text-gray-900 group-hover:text-wine-900 transition-colors line-clamp-1">
              {event.title}
            </h3>
          </Link>
          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
            {event.city && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {event.city}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {getEventFormatLabel(event.format)}
            </span>
          </div>
        </div>
        {event.external_link && (
          <a
            href={event.external_link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-wine-900 transition-colors"
            aria-label="Link externo"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className={cn('group', className)}>
        <Link href={eventUrl} className="flex gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-wine-100 rounded-lg flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-wine-900 leading-none">
              {new Date(event.start_date).getDate()}
            </span>
            <span className="text-xs text-wine-700 uppercase">
              {new Date(event.start_date).toLocaleDateString('pt-BR', { month: 'short' })}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 group-hover:text-wine-900 transition-colors line-clamp-2">
              {event.title}
            </h4>
            {event.city && (
              <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                {event.city}
              </span>
            )}
          </div>
        </Link>
      </article>
    );
  }

  // Default variant
  return (
    <article className={cn('group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow', className)}>
      <Link href={eventUrl} className="block relative aspect-[16/9]">
        <Image
          src={getImageUrl(event.featured_image?.url)}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {event.is_featured && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-gold-500 text-wine-900 text-xs font-semibold rounded">
            Destaque
          </span>
        )}
        <div className="absolute bottom-3 left-3 px-3 py-2 bg-white/95 rounded-lg shadow">
          <div className="text-lg font-bold text-wine-900 leading-none">
            {new Date(event.start_date).getDate()}
          </div>
          <div className="text-xs text-gray-600 uppercase">
            {new Date(event.start_date).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link href={eventUrl}>
          <h3 className="font-serif font-bold text-lg text-gray-900 group-hover:text-wine-900 transition-colors line-clamp-2">
            {event.title}
          </h3>
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-3">
          {event.city && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {event.city}, {event.country}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Globe className="w-4 h-4" />
            {getEventFormatLabel(event.format)}
          </span>
        </div>
        {event.target_audience && (
          <p className="text-sm text-gray-600 mt-2">
            Público: {event.target_audience}
          </p>
        )}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <Link
            href={eventUrl}
            className="text-sm font-semibold text-wine-900 hover:text-wine-700"
          >
            Ver detalhes
          </Link>
          {event.external_link && (
            <a
              href={event.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-wine-900 flex items-center gap-1"
            >
              Site oficial
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
