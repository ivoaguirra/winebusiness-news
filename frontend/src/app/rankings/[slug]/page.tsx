import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Trophy, Calendar, ArrowLeft, Users } from 'lucide-react';
import { getRankingBySlug } from '@/lib/data';
import { getImageUrl } from '@/lib/utils';
import { notFound } from 'next/navigation';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ranking = await getRankingBySlug(slug);
  if (!ranking) return { title: 'Ranking não encontrado' };

  return {
    title: `${ranking.title} – Rankings`,
    description: ranking.description?.replace(/<[^>]*>/g, '').slice(0, 160) || `Ranking: ${ranking.title}`,
    openGraph: {
      title: ranking.title,
      description: ranking.description?.replace(/<[^>]*>/g, '').slice(0, 160),
      type: 'article',
      images: ranking.featured_image?.url ? [getImageUrl(ranking.featured_image.url)] : [],
    },
  };
}

export default async function RankingDetailPage({ params }: Props) {
  const { slug } = await params;
  const ranking = await getRankingBySlug(slug);

  if (!ranking) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link href="/rankings" className="inline-flex items-center gap-2 text-wine-900 hover:text-wine-700 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Rankings
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-gold-500" />
            <span className="text-sm font-semibold text-wine-900 bg-wine-50 px-3 py-1 rounded-full">
              {ranking.year} {ranking.edition && `· ${ranking.edition}`}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            {ranking.title}
          </h1>
        </header>

        {/* Featured Image */}
        {ranking.featured_image && (
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
            <Image
              src={getImageUrl(ranking.featured_image.url)}
              alt={ranking.featured_image.alternativeText || ranking.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Description */}
        {ranking.description && (
          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: ranking.description }}
          />
        )}

        {/* Ranking Categories & Results */}
        {ranking.categories && ranking.categories.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Resultados</h2>
            <div className="space-y-8">
              {ranking.categories.map((category) => (
                <div key={category.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-wine-900 text-white px-6 py-3">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {category.results.map((result) => (
                      <div key={result.id} className="flex items-center gap-4 px-6 py-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                          result.position === 1
                            ? 'bg-gold-500 text-wine-900'
                            : result.position === 2
                            ? 'bg-gray-300 text-gray-800'
                            : result.position === 3
                            ? 'bg-amber-600 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {result.position}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{result.name}</p>
                          {result.company && (
                            <p className="text-sm text-gray-500">{result.company}</p>
                          )}
                        </div>
                        {result.score !== undefined && result.score !== null && (
                          <div className="text-right">
                            <p className="font-bold text-wine-900">{result.score}</p>
                            <p className="text-xs text-gray-500">pontos</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Methodology */}
        {ranking.methodology && (
          <section className="mb-12 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Metodologia</h2>
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: ranking.methodology }}
            />
          </section>
        )}

        {/* Jury Members */}
        {ranking.jury_members && ranking.jury_members.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-wine-900" />
              <h2 className="text-xl font-serif font-bold text-gray-900">Júri</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {ranking.jury_members.map((member) => (
                <div key={member.id} className="text-center">
                  {member.photo ? (
                    <Image
                      src={getImageUrl(member.photo.url)}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-3"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3 flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                  {member.title && <p className="text-xs text-gray-500">{member.title}</p>}
                  {member.company && <p className="text-xs text-gray-500">{member.company}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="flex items-center gap-4 py-6 border-t border-gray-200">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-500">
            Publicado em {new Date(ranking.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </span>
        </div>
      </article>
    </div>
  );
}
