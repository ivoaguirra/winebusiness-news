import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, Tag, Share2, Linkedin, Twitter, Facebook, ArrowLeft } from 'lucide-react';
import ArticleCard from '@/components/article/ArticleCard';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import AdSlot from '@/components/ads/AdSlot';
import { formatDate, getImageUrl } from '@/lib/utils';
import type { Article } from '@/types';

// Mock article data
const mockArticle: Article = {
  id: 1,
  documentId: '1',
  title: 'Importações de vinhos crescem 15% no primeiro trimestre de 2026',
  slug: 'importacoes-vinhos-crescem-15-primeiro-trimestre-2026',
  excerpt: 'O mercado brasileiro de vinhos importados registrou crescimento expressivo nos primeiros três meses do ano, impulsionado pela demanda do varejo e restaurantes.',
  content: `
    <p>O mercado brasileiro de vinhos importados registrou um crescimento de 15% no primeiro trimestre de 2026, segundo dados divulgados pelo Instituto Brasileiro do Vinho (Ibravin). O aumento foi impulsionado principalmente pela demanda do varejo e do setor de restaurantes, que voltaram a apresentar números pré-pandemia.</p>

    <h2>Principais países exportadores</h2>
    <p>A Argentina manteve sua posição de liderança entre os países exportadores para o Brasil, seguida por Chile, Portugal e Itália. Os vinhos argentinos representaram 35% do volume total importado, com destaque para os Malbecs da região de Mendoza.</p>

    <p>Os vinhos chilenos, por sua vez, ganharam participação de mercado, especialmente na faixa de preço entre R$ 50 e R$ 100, segmento que mais cresceu no período. A proximidade geográfica e os acordos comerciais do Mercosul continuam sendo fatores determinantes para a competitividade dos vinhos sul-americanos.</p>

    <h2>Tendências de consumo</h2>
    <p>Entre as tendências identificadas, destacam-se:</p>
    <ul>
      <li>Crescimento de 25% nas vendas de vinhos orgânicos e biodinâmicos</li>
      <li>Aumento da demanda por vinhos em lata, especialmente entre consumidores mais jovens</li>
      <li>Preferência por rótulos com menor teor alcoólico</li>
      <li>Expansão do e-commerce de vinhos, que já representa 18% das vendas totais</li>
    </ul>

    <h2>Perspectivas para o ano</h2>
    <p>Os especialistas do setor projetam que o crescimento deve se manter ao longo de 2026, com expectativa de aumento de 12% a 15% no volume total importado. A estabilização da economia e a melhora no poder de compra da classe média são apontados como fatores positivos para o mercado.</p>

    <blockquote>
      <p>"O consumidor brasileiro está cada vez mais sofisticado e busca experiências diferenciadas. Isso abre oportunidades para vinhos de regiões menos conhecidas e para produtores que investem em sustentabilidade."</p>
      <cite>— Maria Silva, diretora comercial da Importadora XYZ</cite>
    </blockquote>

    <p>O relatório completo com dados detalhados por região e categoria de vinho será publicado pelo Ibravin no próximo mês.</p>
  `,
  featured_image: { id: 1, url: '/placeholder.jpg', width: 1200, height: 630 },
  status: 'published',
  is_featured: true,
  is_sponsored: false,
  reading_time: 5,
  seo_title: 'Importações de vinhos crescem 15% no primeiro trimestre de 2026',
  seo_description: 'O mercado brasileiro de vinhos importados registrou crescimento expressivo nos primeiros três meses do ano.',
  category: { id: 1, documentId: '1', name: 'Notícias', slug: 'noticias', color: '#722f37', order: 1 },
  tags: [
    { id: 1, documentId: '1', name: 'Importação', slug: 'importacao', type: 'theme' },
    { id: 2, documentId: '2', name: 'Mercado', slug: 'mercado', type: 'theme' },
    { id: 3, documentId: '3', name: 'Brasil', slug: 'brasil', type: 'country' },
  ],
  author: { id: 1, username: 'editor', email: 'editor@winebusiness.news' },
  createdAt: '2026-01-06T10:00:00Z',
  updatedAt: '2026-01-06T10:00:00Z',
  publishedAt: '2026-01-06T10:00:00Z',
};

const relatedArticles: Article[] = [
  {
    id: 2,
    documentId: '2',
    title: 'Vinícola chilena anuncia expansão no mercado brasileiro',
    slug: 'vinicola-chilena-anuncia-expansao-mercado-brasileiro',
    excerpt: 'Concha y Toro planeja dobrar sua presença no Brasil.',
    featured_image: { id: 2, url: '/placeholder.jpg', width: 1200, height: 630 },
    status: 'published',
    is_featured: false,
    is_sponsored: false,
    reading_time: 4,
    category: { id: 1, documentId: '1', name: 'Notícias', slug: 'noticias', color: '#722f37', order: 1 },
    createdAt: '2026-01-05T14:00:00Z',
    updatedAt: '2026-01-05T14:00:00Z',
    publishedAt: '2026-01-05T14:00:00Z',
  },
  {
    id: 3,
    documentId: '3',
    title: 'Nova regulamentação de rotulagem entra em vigor em março',
    slug: 'nova-regulamentacao-rotulagem-entra-vigor-marco',
    excerpt: 'Anvisa define novas regras para bebidas alcoólicas.',
    featured_image: { id: 3, url: '/placeholder.jpg', width: 1200, height: 630 },
    status: 'published',
    is_featured: false,
    is_sponsored: false,
    reading_time: 6,
    category: { id: 1, documentId: '1', name: 'Notícias', slug: 'noticias', color: '#722f37', order: 1 },
    createdAt: '2026-01-04T09:00:00Z',
    updatedAt: '2026-01-04T09:00:00Z',
    publishedAt: '2026-01-04T09:00:00Z',
  },
];

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Em produção, buscar artigo do Strapi usando o slug
  void params; // Usar params em produção para buscar artigo
  const article = mockArticle;

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author?.username || 'WineBusiness.news'],
      images: article.featured_image ? [
        {
          url: getImageUrl(article.featured_image.url),
          width: article.featured_image.width,
          height: article.featured_image.height,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { category, slug } = await params;
  const article = mockArticle;

  // JSON-LD para SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image ? getImageUrl(article.featured_image.url) : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author?.username || 'WineBusiness.news',
    },
    publisher: {
      '@type': 'Organization',
      name: 'WineBusiness.news',
      logo: {
        '@type': 'ImageObject',
        url: 'https://winebusiness.news/logo.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AdSlot placement="top_banner" className="py-4 bg-gray-100" />

      <article className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-wine-900">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${category}`} className="hover:text-wine-900">
                {article.category?.name}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 truncate max-w-[200px]">{article.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <header className="mb-8">
              {article.category && (
                <Link
                  href={`/${article.category.slug}`}
                  className="inline-block px-3 py-1 bg-wine-100 text-wine-900 text-sm font-semibold rounded-full mb-4 hover:bg-wine-200 transition-colors"
                >
                  {article.category.name}
                </Link>
              )}

              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-200">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.publishedAt || article.createdAt)}
                </span>
                {article.reading_time && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.reading_time} min de leitura
                  </span>
                )}
                {article.author && (
                  <span>Por {article.author.username}</span>
                )}
              </div>
            </header>

            {/* Featured Image */}
            {article.featured_image && (
              <figure className="mb-8">
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                  <Image
                    src={getImageUrl(article.featured_image.url)}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {article.featured_image.caption && (
                  <figcaption className="text-sm text-gray-500 mt-2 text-center">
                    {article.featured_image.caption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-a:text-wine-900 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-wine-500 prose-blockquote:bg-wine-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg"
              dangerouslySetInnerHTML={{ __html: article.content || '' }}
            />

            {/* In-Article Ad */}
            <AdSlot
              placement="in_article_2"
              className="my-8"
              keyValues={{
                category: article.category?.slug || '',
                tags: article.tags?.map((t) => t.slug).join(',') || '',
              }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-5 h-5 text-gray-400" />
                  {article.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/tag/${tag.slug}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-gray-600">
                  <Share2 className="w-5 h-5" />
                  Compartilhar:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://winebusiness.news/${category}/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-[#0077b5] hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Compartilhar no LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://winebusiness.news/${category}/${slug}`)}&text=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-[#1da1f2] hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Compartilhar no Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://winebusiness.news/${category}/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-[#1877f2] hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Compartilhar no Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="mt-8">
              <NewsletterForm />
            </div>

            {/* Related Articles */}
            <section className="mt-12">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Artigos Relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="sticky top-24">
              <AdSlot
                placement="sidebar"
                keyValues={{
                  category: article.category?.slug || '',
                  article_id: String(article.id),
                }}
              />

              <div className="mt-8">
                <NewsletterForm variant="compact" />
              </div>

              {/* Back to category */}
              <div className="mt-8">
                <Link
                  href={`/${category}`}
                  className="flex items-center gap-2 text-wine-900 hover:text-wine-700 font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar para {article.category?.name}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <AdSlot placement="footer" className="py-4 bg-gray-100" />
    </>
  );
}
