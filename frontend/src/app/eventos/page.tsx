import { Metadata } from 'next';
import EventCard from '@/components/event/EventCard';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import AdSlot from '@/components/ads/AdSlot';
import { getEvents } from '@/lib/data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Eventos',
  description: 'Agenda de eventos do mercado de vinhos: feiras, degustações, congressos e encontros do trade.',
};

export default async function EventsPage() {
  const eventsRes = await getEvents(1, 20);
  const allEvents = eventsRes.data;

  const featuredEvents = allEvents.filter((e) => e.is_featured);
  const upcomingEvents = allEvents.filter((e) => !e.is_featured);

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
            {upcomingEvents.length > 0 && (
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
            )}
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
