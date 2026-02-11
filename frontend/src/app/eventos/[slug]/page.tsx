import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Globe, ExternalLink, ArrowLeft, Share2 } from 'lucide-react';
import { getEventBySlug } from '@/lib/data';
import { getImageUrl, getEventFormatLabel, formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: 'Evento não encontrado' };

  return {
    title: event.title,
    description: event.description?.replace(/<[^>]*>/g, '').slice(0, 160) || `Evento: ${event.title}`,
    openGraph: {
      title: event.title,
      description: event.description?.replace(/<[^>]*>/g, '').slice(0, 160),
      type: 'article',
      images: event.featured_image?.url ? [getImageUrl(event.featured_image.url)] : [],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  const startDate = new Date(event.start_date);
  const endDate = event.end_date ? new Date(event.end_date) : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link href="/eventos" className="inline-flex items-center gap-2 text-wine-900 hover:text-wine-700 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Eventos
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-wine-900" />
              {formatDate(event.start_date)}
              {endDate && ` – ${formatDate(event.end_date!)}`}
            </span>
            {event.city && (
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-wine-900" />
                {event.city}, {event.country}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-wine-900" />
              {getEventFormatLabel(event.format)}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        {event.featured_image && (
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
            <Image
              src={getImageUrl(event.featured_image.url)}
              alt={event.featured_image.alternativeText || event.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Info Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Informações do Evento</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Data:</span>
              <p className="font-medium text-gray-900">
                {startDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                {endDate && ` a ${endDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}`}
              </p>
            </div>
            {event.location && (
              <div>
                <span className="text-gray-500">Local:</span>
                <p className="font-medium text-gray-900">{event.location}</p>
              </div>
            )}
            {event.city && (
              <div>
                <span className="text-gray-500">Cidade:</span>
                <p className="font-medium text-gray-900">{event.city}, {event.country}</p>
              </div>
            )}
            <div>
              <span className="text-gray-500">Formato:</span>
              <p className="font-medium text-gray-900">{getEventFormatLabel(event.format)}</p>
            </div>
            {event.target_audience && (
              <div>
                <span className="text-gray-500">Público-alvo:</span>
                <p className="font-medium text-gray-900">{event.target_audience}</p>
              </div>
            )}
            {event.event_type && (
              <div>
                <span className="text-gray-500">Tipo:</span>
                <p className="font-medium text-gray-900">{event.event_type}</p>
              </div>
            )}
          </div>
          {event.external_link && (
            <a
              href={event.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-wine-900 text-white text-sm font-semibold rounded-md hover:bg-wine-800 transition-colors"
            >
              Site oficial do evento
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Content */}
        {event.description && (
          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        )}

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 pt-6 border-t border-gray-200">
            {event.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Share */}
        <div className="flex items-center gap-4 py-6 border-t border-gray-200">
          <Share2 className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-500">Compartilhar:</span>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://winebusiness.news/eventos/${event.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-wine-900"
          >
            LinkedIn
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://winebusiness.news/eventos/${event.slug}`)}&text=${encodeURIComponent(event.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-wine-900"
          >
            Twitter
          </a>
        </div>
      </article>
    </div>
  );
}
