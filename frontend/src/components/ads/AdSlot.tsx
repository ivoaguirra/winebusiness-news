'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AdSlotProps {
  placement: 'top_banner' | 'sidebar' | 'in_article_1' | 'in_article_2' | 'footer';
  className?: string;
  keyValues?: Record<string, string>;
}

// Configuração dos slots de anúncios
const AD_CONFIG: Record<string, {
  sizes: { desktop: number[][]; mobile: number[][] };
  divId: string;
}> = {
  top_banner: {
    sizes: {
      desktop: [[970, 90], [728, 90]],
      mobile: [[320, 50], [300, 50]],
    },
    divId: 'div-gpt-ad-top-banner',
  },
  sidebar: {
    sizes: {
      desktop: [[300, 250], [300, 600]],
      mobile: [],
    },
    divId: 'div-gpt-ad-sidebar',
  },
  in_article_1: {
    sizes: {
      desktop: [[300, 250], [336, 280]],
      mobile: [[300, 250]],
    },
    divId: 'div-gpt-ad-in-article-1',
  },
  in_article_2: {
    sizes: {
      desktop: [[300, 250], [336, 280]],
      mobile: [[300, 250]],
    },
    divId: 'div-gpt-ad-in-article-2',
  },
  footer: {
    sizes: {
      desktop: [[970, 90], [728, 90]],
      mobile: [[320, 50]],
    },
    divId: 'div-gpt-ad-footer',
  },
};

interface GoogleTagSlot {
  addService: (service: unknown) => GoogleTagSlot;
  setTargeting: (key: string, value: string) => GoogleTagSlot;
  defineSizeMapping: (mapping: unknown) => GoogleTagSlot;
}

interface GoogleTagSizeMapping {
  addSize: (viewport: number[], sizes: number[][]) => GoogleTagSizeMapping;
  build: () => unknown;
}

interface GoogleTag {
  cmd: Array<() => void>;
  defineSlot: (adUnitPath: string, size: number[][], divId: string) => GoogleTagSlot | null;
  pubads: () => {
    enableSingleRequest: () => void;
    collapseEmptyDivs: () => void;
    setTargeting: (key: string, value: string) => void;
    enableLazyLoad: (config: object) => void;
  };
  sizeMapping: () => GoogleTagSizeMapping;
  enableServices: () => void;
  display: (divId: string) => void;
  destroySlots: (slots?: unknown[]) => void;
}

declare global {
  interface Window {
    googletag: GoogleTag;
  }
}

export default function AdSlot({ placement, className, keyValues }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const slotRef = useRef<unknown>(null);

  const config = AD_CONFIG[placement];
  const networkCode = process.env.NEXT_PUBLIC_GAM_NETWORK_CODE || '12345678';
  const adUnitPath = `/${networkCode}/winebusiness_${placement}`;

  useEffect(() => {
    // Lazy loading com Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || typeof window === 'undefined') return;

    // Carregar GPT script se ainda não carregado
    if (!window.googletag) {
      const script = document.createElement('script');
      script.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
      script.async = true;
      document.head.appendChild(script);
      
      window.googletag = window.googletag || { cmd: [] };
    }

    window.googletag.cmd.push(() => {
      // Criar size mapping para responsividade
      const mapping = window.googletag.sizeMapping()
        .addSize([1024, 0], config.sizes.desktop)
        .addSize([0, 0], config.sizes.mobile)
        .build();

      // Definir slot
      const slot = window.googletag.defineSlot(
        adUnitPath,
        [...config.sizes.desktop, ...config.sizes.mobile],
        config.divId
      );

      if (slot) {
        slot.defineSizeMapping(mapping);
        slot.addService(window.googletag.pubads());

        // Adicionar key-values
        if (keyValues) {
          Object.entries(keyValues).forEach(([key, value]) => {
            slot.setTargeting(key, value);
          });
        }

        slotRef.current = slot;
      }

      // Configurar pubads
      window.googletag.pubads().enableSingleRequest();
      window.googletag.pubads().collapseEmptyDivs();
      window.googletag.pubads().enableLazyLoad({
        fetchMarginPercent: 200,
        renderMarginPercent: 100,
        mobileScaling: 2.0,
      });

      window.googletag.enableServices();
      window.googletag.display(config.divId);
    });

    return () => {
      // Cleanup
      if (slotRef.current && window.googletag) {
        window.googletag.cmd.push(() => {
          window.googletag.destroySlots([slotRef.current]);
        });
      }
    };
  }, [isVisible, adUnitPath, config, keyValues]);

  // Não mostrar sidebar em mobile
  if (placement === 'sidebar') {
    return (
      <div
        ref={containerRef}
        className={cn('hidden lg:block', className)}
      >
        <div
          id={config.divId}
          className="min-h-[250px] bg-gray-50 flex items-center justify-center"
        >
          {!isVisible && (
            <span className="text-xs text-gray-400">Publicidade</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('w-full flex justify-center', className)}
    >
      <div
        id={config.divId}
        className={cn(
          'bg-gray-50 flex items-center justify-center',
          placement === 'top_banner' || placement === 'footer'
            ? 'min-h-[50px] md:min-h-[90px]'
            : 'min-h-[250px]'
        )}
      >
        {!isVisible && (
          <span className="text-xs text-gray-400">Publicidade</span>
        )}
      </div>
    </div>
  );
}
