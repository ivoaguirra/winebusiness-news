'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/busca?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-wine-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <span>O portal B2B do trade de vinhos no Brasil</span>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/sobre" className="hover:text-gold-400 transition-colors">
              Sobre
            </Link>
            <Link href="/newsletter" className="hover:text-gold-400 transition-colors">
              Newsletter
            </Link>
            <Link href="/anuncie" className="hover:text-gold-400 transition-colors">
              Anuncie
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-serif font-bold text-wine-900">
                WineBusiness
              </span>
              <span className="text-xs md:text-sm text-gold-600 tracking-widest uppercase">
                .news
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-wine-900 hover:bg-wine-50 rounded-md transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-wine-900 hover:bg-wine-50 rounded-md transition-colors flex items-center gap-1">
                Mais
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {categories.slice(6).map((category) => (
                  <Link
                    key={category.slug}
                    href={`/${category.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-wine-50 hover:text-wine-900"
                  >
                    {category.name}
                  </Link>
                ))}
                <hr className="my-1" />
                <Link
                  href="/rankings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-wine-50 hover:text-wine-900"
                >
                  Rankings & Prêmios
                </Link>
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-600 hover:text-wine-900 hover:bg-wine-50 rounded-md transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-wine-900 hover:bg-wine-50 rounded-md transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            searchOpen ? 'max-h-20 pb-4' : 'max-h-0'
          )}
        >
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar notícias, eventos, rankings..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-wine-900 text-white rounded-md hover:bg-wine-800 transition-colors"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-200',
          mobileMenuOpen ? 'max-h-screen' : 'max-h-0'
        )}
      >
        <nav className="container mx-auto px-4 py-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="block py-3 text-gray-700 hover:text-wine-900 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {category.name}
            </Link>
          ))}
          <Link
            href="/rankings"
            className="block py-3 text-gray-700 hover:text-wine-900 border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Rankings & Prêmios
          </Link>
          <div className="pt-4 flex flex-col gap-2">
            <Link
              href="/sobre"
              className="text-sm text-gray-600 hover:text-wine-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              href="/newsletter"
              className="text-sm text-gray-600 hover:text-wine-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Newsletter
            </Link>
            <Link
              href="/anuncie"
              className="text-sm text-gray-600 hover:text-wine-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Anuncie
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
