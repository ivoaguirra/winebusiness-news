import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, Tag, Share2, Linkedin, Twitter, Facebook, ArrowLeft } from 'lucide-react';
import ArticleCard from '@/components/article/ArticleCard';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import AdSlot from '@/components/ads/AdSlot';
import { formatDate, getImageUrl } from '@/lib/utils';
import { getArticleBySlug, getRelatedArticles } from '@/lib/data';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: 'Artigo não encontrado' };
  }

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
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">Artigo não encontrado</h1>
        <Link href="/" className="text-wine-900 hover:underline">Voltar para a home</Link>
      </div>
    );
  }

  const related = await getRelatedArticles(article.id, article.category?.slug, 2);

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
              <Link href="/" className="hover:text-wine-900">Home</Link>
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

            <div className="mt-8">
              <NewsletterForm />
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                  Artigos Relacionados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {related.map((relatedArticle) => (
                    <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                  ))}
                </div>
              </section>
            )}
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
