import { Metadata } from 'next';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import { Mail, CheckCircle, Users, Calendar, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Inscreva-se na newsletter do WineBusiness.news e receba as principais notícias do trade de vinhos no Brasil.',
};

const benefits = [
  {
    icon: TrendingUp,
    title: 'Notícias em primeira mão',
    description: 'Receba as principais notícias do mercado antes de todo mundo.',
  },
  {
    icon: Users,
    title: 'Movimentações do trade',
    description: 'Fique por dentro das contratações e mudanças no setor.',
  },
  {
    icon: Calendar,
    title: 'Agenda de eventos',
    description: 'Não perca nenhum evento importante do mercado de vinhos.',
  },
  {
    icon: CheckCircle,
    title: 'Conteúdo exclusivo',
    description: 'Análises e insights disponíveis apenas para assinantes.',
  },
];

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-wine-900 to-wine-950 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Mail className="w-16 h-16 text-gold-500 mx-auto mb-6" />
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Fique por dentro do trade de vinhos
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Receba semanalmente as principais notícias, movimentações do mercado, 
              eventos e análises exclusivas diretamente no seu email.
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-400">
              <span>✓ Gratuito</span>
              <span>✓ Semanal</span>
              <span>✓ Cancele quando quiser</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16 -mt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
                Inscreva-se agora
              </h2>
              <NewsletterForm variant="full" className="bg-transparent p-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-12 text-center">
            O que você vai receber
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-wine-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-wine-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-12 text-center">
            O que dizem nossos leitores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: 'A newsletter do WineBusiness é minha leitura obrigatória toda segunda-feira. Conteúdo relevante e bem curado.',
                author: 'João Silva',
                role: 'Diretor Comercial, Importadora ABC',
              },
              {
                quote: 'Excelente fonte de informação para quem trabalha no trade. Sempre atualizado com as novidades do mercado.',
                author: 'Maria Santos',
                role: 'Sommelier, Restaurante XYZ',
              },
              {
                quote: 'A melhor newsletter B2B do setor de vinhos no Brasil. Recomendo para todos os profissionais.',
                author: 'Pedro Oliveira',
                role: 'Gerente de Compras, Rede de Varejo',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-12 text-center">
            Perguntas frequentes
          </h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {[
              {
                question: 'Com que frequência vou receber a newsletter?',
                answer: 'Enviamos uma edição principal toda segunda-feira pela manhã, com as principais notícias da semana. Ocasionalmente, enviamos edições especiais com conteúdo exclusivo.',
              },
              {
                question: 'A newsletter é gratuita?',
                answer: 'Sim, a newsletter é completamente gratuita. Não há custos ocultos ou planos pagos obrigatórios.',
              },
              {
                question: 'Como faço para cancelar a inscrição?',
                answer: 'Você pode cancelar a qualquer momento clicando no link "Cancelar inscrição" no rodapé de qualquer email que enviamos.',
              },
              {
                question: 'Meus dados estão seguros?',
                answer: 'Sim, respeitamos sua privacidade. Seus dados são usados apenas para envio da newsletter e nunca são compartilhados com terceiros.',
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-16 bg-wine-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Não fique de fora
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Junte-se a milhares de profissionais do trade de vinhos que já recebem nossa newsletter.
          </p>
          <a
            href="#top"
            className="inline-block px-8 py-3 bg-gold-500 text-wine-900 font-semibold rounded-md hover:bg-gold-400 transition-colors"
          >
            Inscrever-se agora
          </a>
        </div>
      </section>
    </div>
  );
}
