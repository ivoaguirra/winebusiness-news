import Link from 'next/link';
import { ArrowRight, Calendar, TrendingUp, Users } from 'lucide-react';
import ArticleCard from '@/components/article/ArticleCard';
import EventCard from '@/components/event/EventCard';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import AdSlot from '@/components/ads/AdSlot';
import type { Article, Event, Category } from '@/types';

// Mock data para demonstração (será substituído por dados do Strapi)
const mockFeaturedArticles: Article[] = [
  {
    id: 1,
    documentId: '1',
    title: 'Importações de vinhos crescem 15% no primeiro trimestre de 2026',
    slug: 'importacoes-vinhos-crescem-15-primeiro-trimestre-2026',
    excerpt: 'O mercado brasileiro de vinhos importados registrou crescimento expressivo nos primeiros três meses do ano, impulsionado pela demanda do varejo e restaurantes.',
    featured_image: { id: 1, url: '/placeholder.jpg', width: 1200, height: 630 },
    status: 'published',
    is_featured: true,
    is_sponsored: false,
    reading_time: 5,
    category: { id: 1, documentId: '1', name: 'Notícias', slug: 'noticias', color: '#722f37', order: 1 },
    tags: [
      { id: 1, documentId: '1', name: 'Importação', slug: 'importacao', type: 'theme' },
      { id: 2, documentId: '2', name: 'Mercado', slug: 'mercado', type: 'theme' },
    ],
    createdAt: '2026-01-06T10:00:00Z',
    updatedAt: '2026-01-06T10:00:00Z',
    publishedAt: '2026-01-06T10:00:00Z',
  },
  {
    id: 2,
    documentId: '2',
    title: 'Vinícola chilena anuncia expansão no mercado brasileiro',
    slug: 'vinicola-chilena-anuncia-expansao-mercado-brasileiro',
    excerpt: 'Concha y Toro planeja dobrar sua presença no Brasil com novos rótulos e estratégia de distribuição.',
    featured_image: { id: 2, url: '/placeholder.jpg', width: 1200, height: 630 },
    status: 'published',
    is_featured: true,
    is_sponsored: false,
    reading_time: 4,
    category: { id: 2, documentId: '2', name: 'Produtores', slug: 'produtores', color: '#722f37', order: 2 },
    createdAt: '2026-01-05T14:00:00Z',
    updatedAt: '2026-01-05T14:00:00Z',
    publishedAt: '2026-01-05T14:00:00Z',
  },
  {
    id: 3,
    documentId: '3',
    title: 'Nova regulamentação de rotulagem entra em vigor em março',
    slug: 'nova-regulamentacao-rotulagem-entra-vigor-marco',
    excerpt: 'Anvisa define novas regras para informações nutricionais em bebidas alcoólicas.',
    featured_image: { id: 3, url: '/placeholder.jpg', width: 1200, height: 630 },
    status: 'published',
    is_featured: true,
    is_sponsored: false,
    reading_time: 6,
    category: { id: 3, documentId: '3', name: 'Dados & Insights', slug: 'dados-insights', color: '#722f37', order: 3 },
    createdAt: '2026-01-04T09:00:00Z',
    updatedAt: '2026-01-04T09:00:00Z',
    publishedAt: '2026-01-04T09:00:00Z',
  },
];

const mockLatestArticles: Article[] = [
  ...mockFeaturedArticles,
  {
    id: 4,
    documentId: '4',
    title: 'Entrevista: CEO da Wine.com.br fala sobre tendências para 2026',
    slug: 'entrevista-ceo-wine-tendencias-2026',
    excerpt: 'Rogério Salume compartilha visão sobre o futuro do e-commerce de vinhos.',
    featured_image: { id: 4, url: '/placeholder.jpg', width: 1200, height: 630 },
    status: 'published',
    is_featured: false,
    is_sponsored: false,
    reading_time: 8,
    category: { id: 4, documentId: '4', name: 'Opinião & Entrevistas', slug: 'opiniao-entrevistas', color: '#722f37', order: 4 },
    createdAt: '2026-01-03T16:00:00Z',
    updatedAt: '2026-01-03T16:00:00Z',
    publishedAt: '2026-01-03T16:00:00Z',
  },
  {
    id: 5,
    documentId: '5',
    title: 'Carrefour amplia seção de vinhos em 50 lojas',
    slug: 'carrefour-amplia-secao-vinhos-50-lojas',
    excerpt: 'Rede varejista investe em experiência de compra com sommeliers e degustações.',
    featured_image: { id: 5, url: '/placeholder.jpg', width: 1200, height: 630 },
    status: 'published',
    is_featured: false,
    is_sponsored: false,
    reading_time: 3,
    category: { id: 5, documentId: '5', name: 'Varejo', slug: 'varejo', color: '#722f37', order: 5 },
    createdAt: '2026-01-02T11:00:00Z',
    updatedAt: '2026-01-02T11:00:00Z',
    publishedAt: '2026-01-02T11:00:00Z',
  },
];

const mockEvents: Event[] = [
  {
    id: 1,
    documentId: '1',
    title: 'ProWein 2026',
    slug: 'prowein-2026',
    description: 'A maior feira de vinhos do mundo.',
    start_date: '2026-03-15T09:00:00Z',
    end_date: '2026-03-17T18:00:00Z',
    city: 'Düsseldorf',
    country: 'Alemanha',
    format: 'presential',
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
    description: 'Principal feira de vinhos da América Latina.',
    start_date: '2026-04-08T10:00:00Z',
    end_date: '2026-04-10T20:00:00Z',
    city: 'São Paulo',
    country: 'Brasil',
    format: 'presential',
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
    description: 'Encontro dos produtores sul-americanos.',
    start_date: '2026-05-20T09:00:00Z',
    end_date: '2026-05-22T18:00:00Z',
    city: 'Bento Gonçalves',
    country: 'Brasil',
    format: 'presential',
    is_featured: false,
    status: 'published',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];

const categories: Category[] = [
  { id: 1, documentId: '1', name: 'Notícias', slug: 'noticias', color: '#722f37', order: 1 },
  { id: 2, documentId: '2', name: 'Importadores', slug: 'importadores', color: '#722f37', order: 2 },
  { id: 3, documentId: '3', name: 'Produtores', slug: 'produtores', color: '#722f37', order: 3 },
  { id: 4, documentId: '4', name: 'Varejo', slug: 'varejo', color: '#722f37', order: 4 },
];

export default function HomePage() {
  const featuredArticle = mockFeaturedArticles[0];
  const secondaryFeatured = mockFeaturedArticles.slice(1, 3);

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
              <ArticleCard article={featuredArticle} variant="featured" />
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
                {mockLatestArticles.slice(0, 4).map((article) => (
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
                  {mockLatestArticles.slice(0, 3).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Sidebar Ad */}
            <AdSlot placement="sidebar" keyValues={{ section: 'home' }} />

            {/* Newsletter */}
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
                {mockEvents.slice(0, 3).map((event) => (
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
