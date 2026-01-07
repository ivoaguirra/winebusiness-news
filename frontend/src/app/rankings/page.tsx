import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Calendar, ArrowRight } from 'lucide-react';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import AdSlot from '@/components/ads/AdSlot';
import { getImageUrl } from '@/lib/utils';
import type { Ranking } from '@/types';

export const metadata: Metadata = {
  title: 'Rankings & Prêmios',
  description: 'Rankings e premiações do mercado de vinhos no Brasil: melhores importadores, varejistas, vinícolas e profissionais do ano.',
};

// Mock rankings data
const mockRankings: Ranking[] = [
  {
    id: 1,
    documentId: '1',
    title: 'Top 50 Importadores de Vinhos do Brasil',
    slug: 'top-50-importadores-vinhos-brasil-2025',
    year: 2025,
    edition: '5ª Edição',
    description: 'Ranking anual dos maiores e mais influentes importadores de vinhos do mercado brasileiro.',
    featured_image: { id: 1, url: '/placeholder.jpg', width: 1200, height: 630 },
    status: 'published',
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2025-12-01T00:00:00Z',
    publishedAt: '2025-12-01T00:00:00Z',
  },
  {
    id: 2,
    documentId: '2',
    title: 'Melhores Vinhos Brasileiros',
    slug: 'melhores-vinhos-brasileiros-2025',
    year: 2025,
    edition: '10ª Edição',
    description: 'Avaliação dos melhores vinhos nacionais por categoria, com notas de especialistas.',
    featured_image: { id: 2, url: '/placeholder.jpg', width: 1200, height: 630 },
    status: 'published',
    createdAt: '2025-11-15T00:00:00Z',
    updatedAt: '2025-11-15T00:00:00Z',
    publishedAt: '2025-11-15T00:00:00Z',
  },
  {
    id: 3,
    documentId: '3',
    title: 'Prêmio Sommelier do Ano',
    slug: 'premio-sommelier-ano-2025',
    year: 2025,
    edition: '8ª Edição',
    description: 'Reconhecimento aos melhores sommeliers do Brasil em diferentes categorias.',
    featured_image: { id: 3, url: '/placeholder.jpg', width: 1200, height: 630 },
    status: 'published',
    createdAt: '2025-10-20T00:00:00Z',
    updatedAt: '2025-10-20T00:00:00Z',
    publishedAt: '2025-10-20T00:00:00Z',
  },
  {
    id: 4,
    documentId: '4',
    title: 'Top 30 Lojas de Vinhos',
    slug: 'top-30-lojas-vinhos-2025',
    year: 2025,
    edition: '3ª Edição',
    description: 'As melhores lojas especializadas em vinhos do Brasil, avaliadas por critérios de curadoria, atendimento e experiência.',
    featured_image: { id: 4, url: '/placeholder.jpg', width: 1200, height: 630 },
    status: 'published',
    createdAt: '2025-09-10T00:00:00Z',
    updatedAt: '2025-09-10T00:00:00Z',
    publishedAt: '2025-09-10T00:00:00Z',
  },
];

export default function RankingsPage() {
  const latestRanking = mockRankings[0];
  const otherRankings = mockRankings.slice(1);

  return (
    <>
      <AdSlot placement="top_banner" className="py-4 bg-gray-100" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-gold-500" />
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
              Rankings & Prêmios
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Rankings e premiações do mercado de vinhos no Brasil: melhores importadores, varejistas, vinícolas e profissionais.
          </p>
        </header>

        {/* Featured Ranking */}
        <section className="mb-12">
          <Link
            href={`/rankings/${latestRanking.slug}`}
            className="group block relative overflow-hidden rounded-xl bg-gradient-to-br from-wine-900 to-wine-950"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="flex flex-col justify-center">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500 text-wine-900 text-sm font-semibold rounded-full w-fit mb-4">
                  <Trophy className="w-4 h-4" />
                  Último Ranking
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4 group-hover:text-gold-300 transition-colors">
                  {latestRanking.title}
                </h2>
                <p className="text-gray-300 mb-4">{latestRanking.description}</p>
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {latestRanking.year}
                  </span>
                  <span>{latestRanking.edition}</span>
                </div>
                <span className="inline-flex items-center gap-2 text-gold-500 font-semibold group-hover:text-gold-400">
                  Ver ranking completo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={getImageUrl(latestRanking.featured_image?.url)}
                  alt={latestRanking.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </Link>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rankings List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">
              Todos os Rankings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherRankings.map((ranking) => (
                <Link
                  key={ranking.id}
                  href={`/rankings/${ranking.slug}`}
                  className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={getImageUrl(ranking.featured_image?.url)}
                      alt={ranking.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-wine-900 text-white text-xs font-semibold rounded">
                      {ranking.year}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-gray-900 group-hover:text-wine-900 transition-colors mb-2">
                      {ranking.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {ranking.description}
                    </p>
                    <span className="text-sm text-wine-900 font-semibold flex items-center gap-1">
                      Ver ranking
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <AdSlot
              placement="in_article_1"
              className="my-8"
              keyValues={{ section: 'rankings' }}
            />

            {/* Archive by Year */}
            <section className="mt-12">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">
                Arquivo por Ano
              </h2>
              <div className="flex flex-wrap gap-3">
                {[2025, 2024, 2023, 2022, 2021].map((year) => (
                  <Link
                    key={year}
                    href={`/rankings?year=${year}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-wine-100 hover:text-wine-900 transition-colors"
                  >
                    {year}
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <AdSlot placement="sidebar" keyValues={{ section: 'rankings' }} />
            <NewsletterForm variant="compact" />

            {/* Methodology */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Metodologia
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Nossos rankings são elaborados com base em critérios transparentes, 
                avaliados por um júri de especialistas do mercado.
              </p>
              <Link
                href="/sobre#metodologia"
                className="text-sm text-wine-900 font-semibold hover:text-wine-700"
              >
                Saiba mais sobre nossa metodologia
              </Link>
            </div>

            {/* Suggest Ranking */}
            <div className="bg-wine-50 border border-wine-100 rounded-lg p-6">
              <h3 className="font-semibold text-wine-900 mb-2">
                Sugira um ranking
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Tem uma ideia para um novo ranking ou premiação? Envie sua sugestão.
              </p>
              <a
                href="mailto:rankings@winebusiness.news"
                className="inline-block px-4 py-2 bg-wine-900 text-white text-sm font-semibold rounded-md hover:bg-wine-800 transition-colors"
              >
                Enviar sugestão
              </a>
            </div>
          </aside>
        </div>
      </div>

      <AdSlot placement="footer" className="py-4 bg-gray-100" />
    </>
  );
}
