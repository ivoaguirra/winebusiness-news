import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://winebusiness.news';

// Em produção, buscar do Strapi
async function getLatestArticles() {
  return [
    {
      title: 'Importações de vinhos crescem 15% no primeiro trimestre de 2026',
      slug: 'noticias/importacoes-vinhos-crescem-15-primeiro-trimestre-2026',
      excerpt: 'O mercado brasileiro de vinhos importados registrou crescimento expressivo nos primeiros três meses do ano.',
      publishedAt: '2026-01-06T10:00:00Z',
      category: 'Notícias',
      author: 'Redação',
    },
    {
      title: 'Vinícola chilena anuncia expansão no mercado brasileiro',
      slug: 'noticias/vinicola-chilena-anuncia-expansao-mercado-brasileiro',
      excerpt: 'Concha y Toro planeja dobrar sua presença no Brasil com novos rótulos.',
      publishedAt: '2026-01-05T14:00:00Z',
      category: 'Produtores',
      author: 'Redação',
    },
    {
      title: 'Nova regulamentação de rotulagem entra em vigor em março',
      slug: 'noticias/nova-regulamentacao-rotulagem-entra-vigor-marco',
      excerpt: 'Anvisa define novas regras para informações nutricionais em bebidas alcoólicas.',
      publishedAt: '2026-01-04T09:00:00Z',
      category: 'Dados & Insights',
      author: 'Redação',
    },
  ];
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const articles = await getLatestArticles();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>WineBusiness.news</title>
    <link>${BASE_URL}</link>
    <description>O portal B2B de referência para profissionais do mercado de vinhos no Brasil.</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/logo.png</url>
      <title>WineBusiness.news</title>
      <link>${BASE_URL}</link>
    </image>
    ${articles
      .map(
        (article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${BASE_URL}/${article.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/${article.slug}</guid>
      <description>${escapeXml(article.excerpt)}</description>
      <category>${escapeXml(article.category)}</category>
      <author>redacao@winebusiness.news (${escapeXml(article.author)})</author>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
