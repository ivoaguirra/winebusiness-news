'use client';

import { useState } from 'react';
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { subscribeNewsletter } from '@/lib/api';
import { cn } from '@/lib/utils';

interface NewsletterFormProps {
  variant?: 'default' | 'compact' | 'full';
  className?: string;
}

export default function NewsletterForm({ variant = 'default', className }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [segment, setSegment] = useState('other');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const result = await subscribeNewsletter({ email, name, segment });
    
    if (result.success) {
      setStatus('success');
      setMessage(result.message);
      setEmail('');
      setName('');
    } else {
      setStatus('error');
      setMessage(result.message);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={cn('bg-wine-900 text-white p-6 rounded-lg', className)}>
        <div className="flex items-center gap-2 mb-3">
          <Mail className="w-5 h-5 text-gold-500" />
          <h3 className="font-semibold">Newsletter</h3>
        </div>
        <p className="text-sm text-gray-300 mb-4">
          Receba as principais notícias do trade de vinhos.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
            required
            className="w-full px-4 py-2 bg-wine-800 border border-wine-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-4 py-2 bg-gold-500 text-wine-900 font-semibold rounded-md hover:bg-gold-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Inscrevendo...
              </>
            ) : (
              'Inscrever-se'
            )}
          </button>
        </form>
        {status === 'success' && (
          <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            {message}
          </div>
        )}
        {status === 'error' && (
          <div className="mt-3 flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            {message}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={cn('bg-gradient-to-br from-wine-900 to-wine-950 text-white p-8 md:p-12 rounded-xl', className)}>
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-12 h-12 text-gold-500 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Fique por dentro do trade de vinhos
          </h2>
          <p className="text-gray-300 mb-8">
            Receba semanalmente as principais notícias, movimentações do mercado, 
            eventos e análises exclusivas diretamente no seu email.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="px-4 py-3 bg-wine-800 border border-wine-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email"
                required
                className="px-4 py-3 bg-wine-800 border border-wine-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Você é:</label>
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                className="w-full md:w-auto px-4 py-3 bg-wine-800 border border-wine-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="importer">Importador</option>
                <option value="retail">Varejo</option>
                <option value="producer">Produtor</option>
                <option value="other">Outro profissional</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-3 bg-gold-500 text-wine-900 font-semibold rounded-md hover:bg-gold-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Inscrevendo...
                </>
              ) : (
                'Inscrever-se gratuitamente'
              )}
            </button>
          </form>
          {status === 'success' && (
            <div className="mt-6 flex items-center justify-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              {message}
            </div>
          )}
          {status === 'error' && (
            <div className="mt-6 flex items-center justify-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              {message}
            </div>
          )}
          <p className="text-xs text-gray-500 mt-4">
            Ao se inscrever, você concorda com nossa política de privacidade. 
            Você pode cancelar a qualquer momento.
          </p>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn('bg-wine-50 border border-wine-100 p-6 rounded-lg', className)}>
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-5 h-5 text-wine-900" />
        <h3 className="font-semibold text-wine-900">Newsletter</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Receba as principais notícias do trade de vinhos diretamente no seu email.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu email"
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-500"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 bg-wine-900 text-white rounded-md hover:bg-wine-800 transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Inscrever'}
        </button>
      </form>
      {status === 'success' && (
        <div className="mt-3 flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle className="w-4 h-4" />
          {message}
        </div>
      )}
      {status === 'error' && (
        <div className="mt-3 flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          {message}
        </div>
      )}
    </div>
  );
}
