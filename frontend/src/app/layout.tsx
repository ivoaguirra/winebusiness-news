import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/ui/CookieConsent";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "WineBusiness.news - Portal B2B do Trade de Vinhos no Brasil",
    template: "%s | WineBusiness.news",
  },
  description:
    "O portal de referência para profissionais do mercado de vinhos no Brasil. Notícias, análises, eventos e rankings do trade.",
  keywords: [
    "vinho",
    "wine business",
    "importadores de vinho",
    "varejo de vinhos",
    "produtores de vinho",
    "mercado de vinhos brasil",
    "trade de vinhos",
  ],
  authors: [{ name: "WineBusiness.news" }],
  creator: "WineBusiness.news",
  publisher: "WineBusiness.news",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://winebusiness.news"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "WineBusiness.news",
    title: "WineBusiness.news - Portal B2B do Trade de Vinhos no Brasil",
    description:
      "O portal de referência para profissionais do mercado de vinhos no Brasil.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WineBusiness.news",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WineBusiness.news - Portal B2B do Trade de Vinhos no Brasil",
    description:
      "O portal de referência para profissionais do mercado de vinhos no Brasil.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="pt-BR">
      <head>
        {/* Google Fonts - loaded at runtime */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Google Tag Manager - Consent Mode Default */}
        <Script id="gtm-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
          `}
        </Script>

        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        {/* Google Publisher Tag (GPT) para Ad Manager */}
        <Script
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
          strategy="lazyOnload"
        />
        <Script id="gpt-init" strategy="lazyOnload">
          {`
            window.googletag = window.googletag || {cmd: []};
          `}
        </Script>
      </head>
      <body className="font-sans antialiased bg-gray-50">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
