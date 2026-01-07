import Link from 'next/link';
import { Mail, Linkedin, Instagram } from 'lucide-react';

const categories = [
  { name: 'Notícias', slug: 'noticias' },
  { name: 'Gente', slug: 'gente' },
  { name: 'Importadores', slug: 'importadores' },
  { name: 'Produtores', slug: 'produtores' },
  { name: 'Varejo', slug: 'varejo' },
  { name: 'Dados & Insights', slug: 'dados-insights' },
  { name: 'Eventos', slug: 'eventos' },
  { name: 'Opinião & Entrevistas', slug: 'opiniao-entrevistas' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wine-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold text-white">
                  WineBusiness
                </span>
                <span className="text-sm text-gold-500 tracking-widest uppercase">
                  .news
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              O portal B2B de referência para o trade de vinhos no Brasil. 
              Notícias, análises, eventos e rankings do mercado.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contato@winebusiness.news"
                className="text-gray-400 hover:text-gold-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Editorias */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-500">Editorias</h3>
            <ul className="space-y-2">
              {categories.slice(0, 4).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/${category.slug}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mais */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-500">Mais</h3>
            <ul className="space-y-2">
              {categories.slice(4).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/${category.slug}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/rankings"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Rankings & Prêmios
                </Link>
              </li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-500">Institucional</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sobre"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Sobre / Manifesto
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-editorial"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Política Editorial
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-patrocinado"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Conteúdo Patrocinado
                </Link>
              </li>
              <li>
                <Link
                  href="/anuncie"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Anuncie
                </Link>
              </li>
              <li>
                <Link
                  href="/newsletter"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-wine-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} WineBusiness.news. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/rss.xml" className="text-gray-400 hover:text-white transition-colors">
              RSS
            </Link>
            <Link href="/sitemap.xml" className="text-gray-400 hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
