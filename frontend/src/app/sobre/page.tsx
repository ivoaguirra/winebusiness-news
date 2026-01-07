import { Metadata } from 'next';
import Link from 'next/link';
import { Target, Eye, Users, Shield, Award, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça o WineBusiness.news, o portal B2B de referência para o trade de vinhos no Brasil.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-wine-900 to-wine-950 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Sobre o WineBusiness.news
            </h1>
            <p className="text-xl text-gray-300">
              O portal B2B de referência para profissionais do mercado de vinhos no Brasil.
            </p>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Nosso Manifesto
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                O mercado de vinhos no Brasil vive um momento de transformação. Com o crescimento 
                do consumo, a profissionalização do trade e a entrada de novos players, nunca foi 
                tão importante ter acesso a informação de qualidade.
              </p>
              <p>
                O <strong>WineBusiness.news</strong> nasceu para preencher essa lacuna. Somos um 
                portal jornalístico independente, focado exclusivamente no trade de vinhos brasileiro. 
                Nossa missão é informar, conectar e fortalecer o ecossistema do vinho no país.
              </p>
              <p>
                Acreditamos que um mercado mais informado é um mercado mais forte. Por isso, 
                investimos em jornalismo de qualidade, com reportagens aprofundadas, análises 
                de mercado e cobertura de eventos.
              </p>
              <p>
                Nosso compromisso é com a verdade, a transparência e a relevância. Não fazemos 
                publi-reportagens disfarçadas de notícias. Quando um conteúdo é patrocinado, 
                isso é claramente indicado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <Target className="w-10 h-10 text-wine-900 mb-4" />
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Missão</h3>
              <p className="text-gray-600">
                Informar e conectar profissionais do trade de vinhos no Brasil, contribuindo 
                para o desenvolvimento do mercado.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <Eye className="w-10 h-10 text-wine-900 mb-4" />
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Visão</h3>
              <p className="text-gray-600">
                Ser a principal fonte de informação B2B do mercado de vinhos no Brasil, 
                reconhecida pela qualidade e credibilidade.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <Shield className="w-10 h-10 text-wine-900 mb-4" />
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Valores</h3>
              <p className="text-gray-600">
                Independência editorial, transparência, qualidade jornalística e compromisso 
                com o desenvolvimento do mercado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Policy */}
      <section className="py-12 md:py-16" id="politica-editorial">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Política Editorial
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                O WineBusiness.news segue princípios rígidos de independência editorial. 
                Nossa redação opera de forma autônoma, sem interferência de anunciantes 
                ou parceiros comerciais.
              </p>
              <h3>Nossos princípios:</h3>
              <ul>
                <li>
                  <strong>Independência:</strong> Decisões editoriais são tomadas exclusivamente 
                  pela redação, sem influência comercial.
                </li>
                <li>
                  <strong>Transparência:</strong> Conteúdos patrocinados são sempre identificados 
                  de forma clara e visível.
                </li>
                <li>
                  <strong>Precisão:</strong> Verificamos informações com múltiplas fontes antes 
                  de publicar.
                </li>
                <li>
                  <strong>Correção:</strong> Erros são corrigidos de forma rápida e transparente.
                </li>
                <li>
                  <strong>Pluralidade:</strong> Buscamos ouvir diferentes vozes e perspectivas 
                  do mercado.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-12 md:py-16 bg-gray-50" id="metodologia">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-gold-500" />
              Metodologia dos Rankings
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Nossos rankings são elaborados com base em metodologias transparentes e 
                critérios objetivos, avaliados por um júri de especialistas independentes.
              </p>
              <h3>Critérios gerais:</h3>
              <ul>
                <li>Volume de negócios e participação de mercado</li>
                <li>Qualidade do portfólio e curadoria</li>
                <li>Inovação e diferenciação</li>
                <li>Sustentabilidade e responsabilidade social</li>
                <li>Reputação e reconhecimento do mercado</li>
              </ul>
              <p>
                Cada ranking possui critérios específicos detalhados em sua página. 
                O júri é composto por profissionais reconhecidos do mercado, sem 
                conflitos de interesse com os avaliados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsored Content Policy */}
      <section className="py-12 md:py-16" id="patrocinado">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Política de Conteúdo Patrocinado
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                O WineBusiness.news aceita conteúdos patrocinados como forma de 
                financiamento, mas com regras claras:
              </p>
              <ul>
                <li>
                  Todo conteúdo patrocinado é identificado com a tag &quot;Patrocinado&quot; 
                  de forma visível.
                </li>
                <li>
                  O patrocinador não tem controle editorial sobre o conteúdo, 
                  apenas sobre o tema geral.
                </li>
                <li>
                  Não aceitamos conteúdos que possam induzir o leitor a erro ou 
                  que sejam contrários aos nossos valores.
                </li>
                <li>
                  A proporção de conteúdo patrocinado é limitada para não 
                  comprometer a experiência do leitor.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Users className="w-12 h-12 text-wine-900 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Nossa Equipe
            </h2>
            <p className="text-gray-600 mb-8">
              Somos uma equipe de jornalistas e profissionais apaixonados pelo mercado 
              de vinhos, com experiência em veículos de comunicação e no trade.
            </p>
            <Link
              href="mailto:redacao@winebusiness.news"
              className="inline-flex items-center gap-2 px-6 py-3 bg-wine-900 text-white font-semibold rounded-md hover:bg-wine-800 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Fale com a redação
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Contato
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Redação</h3>
                <p className="text-gray-600">
                  Para pautas, sugestões e informações:<br />
                  <a href="mailto:redacao@winebusiness.news" className="text-wine-900 hover:underline">
                    redacao@winebusiness.news
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Comercial</h3>
                <p className="text-gray-600">
                  Para anúncios e parcerias:<br />
                  <a href="mailto:comercial@winebusiness.news" className="text-wine-900 hover:underline">
                    comercial@winebusiness.news
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
