'use client';

import { useState, useEffect } from 'react';
import { X, Cookie, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp?: string;
}

const CONSENT_KEY = 'winebusiness_cookie_consent';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Verificar se já existe consentimento
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    if (!savedConsent) {
      setIsVisible(true);
    } else {
      const parsed = JSON.parse(savedConsent);
      setConsent(parsed);
      applyConsent(parsed);
    }
  }, []);

  const applyConsent = (consentState: ConsentState) => {
    // Aplicar consentimento ao Google Tag Manager / Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: consentState.analytics ? 'granted' : 'denied',
        ad_storage: consentState.marketing ? 'granted' : 'denied',
        ad_user_data: consentState.marketing ? 'granted' : 'denied',
        ad_personalization: consentState.marketing ? 'granted' : 'denied',
      });
    }
  };

  const saveConsent = (consentState: ConsentState) => {
    const withTimestamp = {
      ...consentState,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(withTimestamp));
    setConsent(consentState);
    applyConsent(consentState);
    setIsVisible(false);
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const rejectNonEssential = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const savePreferences = () => {
    saveConsent(consent);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-start gap-4">
          <Cookie className="w-8 h-8 text-wine-900 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">
              Utilizamos cookies
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Usamos cookies para melhorar sua experiência, analisar o tráfego do site e 
              personalizar conteúdo e anúncios. Você pode escolher quais cookies aceitar.
            </p>

            {/* Detalhes dos cookies */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1 text-sm text-wine-900 hover:text-wine-700 mb-4"
            >
              {showDetails ? 'Ocultar detalhes' : 'Ver detalhes'}
              {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                showDetails ? 'max-h-96 mb-4' : 'max-h-0'
              )}
            >
              <div className="space-y-3 border border-gray-200 rounded-lg p-4">
                {/* Necessários */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={consent.necessary}
                    disabled
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-sm text-gray-900">
                      Cookies Necessários
                      <span className="ml-2 text-xs text-gray-500">(sempre ativos)</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Essenciais para o funcionamento do site. Incluem preferências de sessão e segurança.
                    </p>
                  </div>
                </div>

                {/* Analíticos */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-sm text-gray-900">
                      Cookies Analíticos
                    </div>
                    <p className="text-xs text-gray-500">
                      Nos ajudam a entender como os visitantes interagem com o site, 
                      permitindo melhorar a experiência.
                    </p>
                  </div>
                </div>

                {/* Marketing */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={consent.marketing}
                    onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-sm text-gray-900">
                      Cookies de Marketing
                    </div>
                    <p className="text-xs text-gray-500">
                      Usados para exibir anúncios relevantes e medir a eficácia das campanhas publicitárias.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={acceptAll}
                className="px-6 py-2 bg-wine-900 text-white text-sm font-semibold rounded-md hover:bg-wine-800 transition-colors"
              >
                Aceitar todos
              </button>
              <button
                onClick={rejectNonEssential}
                className="px-6 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-300 transition-colors"
              >
                Apenas necessários
              </button>
              {showDetails && (
                <button
                  onClick={savePreferences}
                  className="px-6 py-2 border border-wine-900 text-wine-900 text-sm font-semibold rounded-md hover:bg-wine-50 transition-colors"
                >
                  Salvar preferências
                </button>
              )}
            </div>
          </div>
          <button
            onClick={rejectNonEssential}
            className="p-1 text-gray-400 hover:text-gray-600"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Declaração global para gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, params: object) => void;
  }
}
