import type { Article, Event, Category, Ranking } from '@/types';

// =============================================================================
// Categories
// =============================================================================
export const mockCategories: Category[] = [
  { id: 1, documentId: '1', name: 'Notícias', slug: 'noticias', color: '#722f37', order: 1 },
  { id: 2, documentId: '2', name: 'Importadores', slug: 'importadores', color: '#722f37', order: 2 },
  { id: 3, documentId: '3', name: 'Produtores', slug: 'produtores', color: '#722f37', order: 3 },
  { id: 4, documentId: '4', name: 'Varejo', slug: 'varejo', color: '#722f37', order: 4 },
  { id: 5, documentId: '5', name: 'Dados & Insights', slug: 'dados-insights', color: '#722f37', order: 5 },
  { id: 6, documentId: '6', name: 'Opinião & Entrevistas', slug: 'opiniao-entrevistas', color: '#722f37', order: 6 },
  { id: 7, documentId: '7', name: 'Gente', slug: 'gente', color: '#722f37', order: 7 },
];

// =============================================================================
// Articles
// =============================================================================
export const mockArticles: Article[] = [
  {
    id: 1,
    documentId: '1',
    title: 'Importações de vinhos crescem 15% no primeiro trimestre de 2026',
    slug: 'importacoes-vinhos-crescem-15-primeiro-trimestre-2026',
    excerpt: 'O mercado brasileiro de vinhos importados registrou crescimento expressivo nos primeiros três meses do ano, impulsionado pela demanda do varejo e restaurantes.',
    content: `
      <p>O mercado brasileiro de vinhos importados registrou um crescimento de 15% no primeiro trimestre de 2026, segundo dados divulgados pelo Instituto Brasileiro do Vinho (Ibravin). O aumento foi impulsionado principalmente pela demanda do varejo e do setor de restaurantes, que voltaram a apresentar números pré-pandemia.</p>
      <h2>Principais países exportadores</h2>
      <p>A Argentina manteve sua posição de liderança entre os países exportadores para o Brasil, seguida por Chile, Portugal e Itália. Os vinhos argentinos representaram 35% do volume total importado, com destaque para os Malbecs da região de Mendoza.</p>
      <p>Os vinhos chilenos, por sua vez, ganharam participação de mercado, especialmente na faixa de preço entre R$ 50 e R$ 100, segmento que mais cresceu no período.</p>
      <h2>Tendências de consumo</h2>
      <p>Entre as tendências identificadas, destacam-se:</p>
      <ul>
        <li>Crescimento de 25% nas vendas de vinhos orgânicos e biodinâmicos</li>
        <li>Aumento da demanda por vinhos em lata, especialmente entre consumidores mais jovens</li>
        <li>Preferência por rótulos com menor teor alcoólico</li>
        <li>Expansão do e-commerce de vinhos, que já representa 18% das vendas totais</li>
      </ul>
      <h2>Perspectivas para o ano</h2>
      <p>Os especialistas do setor projetam que o crescimento deve se manter ao longo de 2026, com expectativa de aumento de 12% a 15% no volume total importado.</p>
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
    category: { id: 3, documentId: '3', name: 'Produtores', slug: 'produtores', color: '#722f37', order: 3 },
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
    category: { id: 5, documentId: '5', name: 'Dados & Insights', slug: 'dados-insights', color: '#722f37', order: 5 },
    createdAt: '2026-01-04T09:00:00Z',
    updatedAt: '2026-01-04T09:00:00Z',
    publishedAt: '2026-01-04T09:00:00Z',
  },
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
    category: { id: 6, documentId: '6', name: 'Opinião & Entrevistas', slug: 'opiniao-entrevistas', color: '#722f37', order: 6 },
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
    category: { id: 4, documentId: '4', name: 'Varejo', slug: 'varejo', color: '#722f37', order: 4 },
    createdAt: '2026-01-02T11:00:00Z',
    updatedAt: '2026-01-02T11:00:00Z',
    publishedAt: '2026-01-02T11:00:00Z',
  },
];

// =============================================================================
// Events
// =============================================================================
export const mockEvents: Event[] = [
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

// =============================================================================
// Rankings
// =============================================================================
export const mockRankings: Ranking[] = [
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
