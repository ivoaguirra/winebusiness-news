import Link from 'next/link';
import { ArrowRight, Calendar, TrendingUp, Users } from 'lucide-react';
import ArticleCard from '@/components/article/ArticleCard';
import EventCard from '@/components/event/EventCard';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import AdSlot from '@/components/ads/AdSlot';
import {
  getFeaturedArticles,
  getLatestArticles,
  getUpcomingEvents,
  getCategories,
} from '@/lib/data';

export const revalidate = 60;

export default async function HomePage() {
  const [featuredArticles, latestRes, events, categories] = await Promise.all([
    getFeaturedArticles(3),
    getLatestArticles(1, 5),
    getUpcomingEvents(3),
    getCategories(),
  ]);

  const latestArticles = latestRes.data;
  const featuredArticle = featuredArticles[0];
  const secondaryFeatured = featuredArticles.slice(1, 3);

  return (
    <>
      {/* Top Banner Ad */}
      <AdSlot placement="top_banner" className="py-4 bg-gray-100" />

      <div className="container mx-auto px-4 py-8">
        {/* Featured Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Featured */}
            <div className="lg:col-span-2">
              {featuredArticle && (
                <ArticleCard article={featuredArticle} variant="featured" />
              )}
            </div>

            {/* Secondary Featured */}
            <div className="space-y-6">
              {secondaryFeatured.map((article) => (
                <ArticleCard key={article.id} article={article} variant="horizontal" />
              ))}
            </div>
          </div>
        </section>

        {/* Main Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Últimas do Trade */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-wine-900" />
                  Últimas do Trade
                </h2>
                <Link
                  href="/noticias"
                  className="text-wine-900 hover:text-wine-700 text-sm font-semibold flex items-center gap-1"
                >
                  Ver todas
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestArticles.slice(0, 4).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>

            {/* In-Article Ad */}
            <AdSlot
              placement="in_article_1"
              className="py-6"
              keyValues={{ section: 'home' }}
            />

            {/* Blocos por Editoria */}
            {categories.slice(0, 2).map((category) => (
              <section key={category.id}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif font-bold text-gray-900">
                    {category.name}
                  </h2>
                  <Link
                    href={`/${category.slug}`}
                    className="text-wine-900 hover:text-wine-700 text-sm font-semibold flex items-center gap-1"
                  >
                    Ver mais
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {latestArticles.slice(0, 3).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <AdSlot placement="sidebar" keyValues={{ section: 'home' }} />
            <NewsletterForm variant="compact" />

            {/* Eventos */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-wine-900" />
                  Próximos Eventos
                </h3>
                <Link
                  href="/eventos"
                  className="text-wine-900 hover:text-wine-700 text-xs font-semibold"
                >
                  Ver todos
                </Link>
              </div>
              <div className="space-y-4">
                {events.slice(0, 3).map((event) => (
                  <EventCard key={event.id} event={event} variant="compact" />
                ))}
              </div>
            </div>

            {/* Rankings */}
            <div className="bg-gradient-to-br from-wine-900 to-wine-950 text-white rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gold-500" />
                Rankings & Prêmios
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                Confira os rankings mais recentes do mercado de vinhos.
              </p>
              <Link
                href="/rankings"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500 text-wine-900 text-sm font-semibold rounded-md hover:bg-gold-400 transition-colors"
              >
                Ver Rankings
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Gente */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-wine-900" />
                  Gente
                </h3>
                <Link
                  href="/gente"
                  className="text-wine-900 hover:text-wine-700 text-xs font-semibold"
                >
                  Ver mais
                </Link>
              </div>
              <p className="text-sm text-gray-600">
                Acompanhe as movimentações de profissionais do mercado.
              </p>
            </div>
          </aside>
        </div>

        {/* Newsletter Full */}
        <section className="mt-12">
          <NewsletterForm variant="full" />
        </section>
      </div>

      {/* Footer Ad */}
      <AdSlot placement="footer" className="py-4 bg-gray-100" />
    </>
  );
}
