import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/article/ArticleCard';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import AdSlot from '@/components/ads/AdSlot';
import { getArticlesByCategory } from '@/lib/data';

export const revalidate = 60;

const validCategories: Record<string, { name: string; description: string }> = {
  noticias: {
    name: 'Notícias',
    description: 'As últimas notícias do mercado de vinhos no Brasil e no mundo.',
  },
  gente: {
    name: 'Gente',
    description: 'Movimentações de profissionais do trade de vinhos.',
  },
  importadores: {
    name: 'Importadores',
    description: 'Notícias e análises sobre importadores de vinhos.',
  },
  produtores: {
    name: 'Produtores',
    description: 'Cobertura de vinícolas e produtores nacionais e internacionais.',
  },
  varejo: {
    name: 'Varejo',
    description: 'Novidades do varejo de vinhos: supermercados, lojas especializadas e e-commerce.',
  },
  'dados-insights': {
    name: 'Dados & Insights',
    description: 'Análises de mercado, pesquisas e dados do setor.',
  },
  'opiniao-entrevistas': {
    name: 'Opinião & Entrevistas',
    description: 'Entrevistas exclusivas e artigos de opinião.',
  },
};

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryInfo = validCategories[category];

  if (!categoryInfo) {
    return { title: 'Página não encontrada' };
  }

  return {
    title: categoryInfo.name,
    description: categoryInfo.description,
    openGraph: {
      title: `${categoryInfo.name} | WineBusiness.news`,
      description: categoryInfo.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryInfo = validCategories[category];

  if (!categoryInfo) {
    notFound();
  }

  const articlesRes = await getArticlesByCategory(category, 1, 10);
  const articles = articlesRes.data;

  return (
    <>
      <AdSlot placement="top_banner" className="py-4 bg-gray-100" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
            {categoryInfo.name}
          </h1>
          <p className="text-gray-600 text-lg">{categoryInfo.description}</p>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <div key={article.id}>
                  <ArticleCard article={article} />
                  {index === 3 && (
                    <div className="md:col-span-2 my-6">
                      <AdSlot
                        placement="in_article_1"
                        keyValues={{ category }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {articlesRes.meta.pagination && articlesRes.meta.pagination.pageCount > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
                    Anterior
                  </button>
                  <button className="px-4 py-2 bg-wine-900 text-white rounded-md">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    Próxima
                  </button>
                </nav>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <AdSlot placement="sidebar" keyValues={{ category }} />
            <NewsletterForm variant="compact" />
          </aside>
        </div>
      </div>

      <AdSlot placement="footer" className="py-4 bg-gray-100" />
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(validCategories).map((category) => ({
    category,
  }));
}
