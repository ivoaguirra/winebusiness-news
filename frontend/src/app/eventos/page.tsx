import { Metadata } from 'next';
import EventCard from '@/components/event/EventCard';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import AdSlot from '@/components/ads/AdSlot';
import type { Event } from '@/types';

export const metadata: Metadata = {
  title: 'Eventos',
  description: 'Agenda de eventos do mercado de vinhos: feiras, degustações, congressos e encontros do trade.',
};

// Mock events data
const mockEvents: Event[] = [
  {
    id: 1,
    documentId: '1',
    title: 'ProWein 2026',
    slug: 'prowein-2026',
    description: 'A maior feira de vinhos do mundo reúne produtores, importadores e profissionais de mais de 60 países.',
    featured_image: { id: 1, url: '/placeholder.jpg', width: 1200, height: 630 },
    start_date: '2026-03-15T09:00:00Z',
    end_date: '2026-03-17T18:00:00Z',
    location: 'Messe Düsseldorf',
    city: 'Düsseldorf',
    country: 'Alemanha',
    format: 'presential',
    target_audience: 'Profissionais do trade',
    event_type: 'Feira',
    external_link: 'https://www.prowein.com',
    is_featured: true,
    status: 'published',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 2,
    documentId: '2',
    title: 'Expovinis Brasil 2026',
    slug: 'expovinis-brasil-2026',
    description: 'Principal feira de vinhos da América Latina, reunindo importadores, produtores e varejistas.',
    featured_image: { id: 2, url: '/placeholder.jpg', width: 1200, height: 630 },
    start_date: '2026-04-08T10:00:00Z',
    end_date: '2026-04-10T20:00:00Z',
    location: 'Expo Center Norte',
    city: 'São Paulo',
    country: 'Brasil',
    format: 'presential',
    target_audience: 'Profissionais e consumidores',
    event_type: 'Feira',
    external_link: 'https://www.expovinis.com.br',
    is_featured: true,
    status: 'published',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 3,
    documentId: '3',
    title: 'Wine South America 2026',
    slug: 'wine-south-america-2026',
    description: 'Encontro dos produtores sul-americanos com foco em vinhos de altitude e sustentabilidade.',
    featured_image: { id: 3, url: '/placeholder.jpg', width: 1200, height: 630 },
    start_date: '2026-05-20T09:00:00Z',
    end_date: '2026-05-22T18:00:00Z',
    location: 'Centro de Eventos',
    city: 'Bento Gonçalves',
    country: 'Brasil',
    format: 'presential',
    target_audience: 'Produtores e importadores',
    event_type: 'Congresso',
    is_featured: false,
    status: 'published',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 4,
    documentId: '4',
    title: 'Webinar: Tendências do Mercado de Vinhos 2026',
    slug: 'webinar-tendencias-mercado-vinhos-2026',
    description: 'Especialistas discutem as principais tendências de consumo e oportunidades de negócio.',
    start_date: '2026-02-15T14:00:00Z',
    end_date: '2026-02-15T16:00:00Z',
    city: 'Online',
    country: 'Brasil',
    format: 'online',
    target_audience: 'Profissionais do trade',
    event_type: 'Webinar',
    is_featured: false,
    status: 'published',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];

export default function EventsPage() {
  const featuredEvents = mockEvents.filter((e) => e.is_featured);
  const upcomingEvents = mockEvents.filter((e) => !e.is_featured);

  return (
    <>
      <AdSlot placement="top_banner" className="py-4 bg-gray-100" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
            Eventos
          </h1>
          <p className="text-gray-600 text-lg">
            Agenda de eventos do mercado de vinhos: feiras, degustações, congressos e encontros do trade.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white border border-gray-200 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Formato
            </label>
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-500">
              <option value="">Todos</option>
              <option value="presential">Presencial</option>
              <option value="online">Online</option>
              <option value="hybrid">Híbrido</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cidade
            </label>
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-500">
              <option value="">Todas</option>
              <option value="sao-paulo">São Paulo</option>
              <option value="bento-goncalves">Bento Gonçalves</option>
              <option value="online">Online</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Período
            </label>
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-500">
              <option value="">Todos</option>
              <option value="this-month">Este mês</option>
              <option value="next-month">Próximo mês</option>
              <option value="next-3-months">Próximos 3 meses</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Events */}
            {featuredEvents.length > 0 && (
              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">
                  Eventos em Destaque
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            )}

            <AdSlot
              placement="in_article_1"
              className="py-6"
              keyValues={{ section: 'eventos' }}
            />

            {/* Upcoming Events */}
            <section>
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">
                Próximos Eventos
              </h2>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} variant="list" />
                ))}
              </div>
            </section>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
                  Anterior
                </button>
                <button className="px-4 py-2 bg-wine-900 text-white rounded-md">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Próxima
                </button>
              </nav>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <AdSlot placement="sidebar" keyValues={{ section: 'eventos' }} />
            <NewsletterForm variant="compact" />

            {/* Submit Event CTA */}
            <div className="bg-wine-50 border border-wine-100 rounded-lg p-6">
              <h3 className="font-semibold text-wine-900 mb-2">
                Divulgue seu evento
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Tem um evento do setor de vinhos? Entre em contato para divulgá-lo em nossa agenda.
              </p>
              <a
                href="mailto:eventos@winebusiness.news"
                className="inline-block px-4 py-2 bg-wine-900 text-white text-sm font-semibold rounded-md hover:bg-wine-800 transition-colors"
              >
                Enviar evento
              </a>
            </div>
          </aside>
        </div>
      </div>

      <AdSlot placement="footer" className="py-4 bg-gray-100" />
    </>
  );
}
