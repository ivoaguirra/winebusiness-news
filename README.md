# WineBusiness.news

Portal B2B de notícias do trade de vinhos no Brasil, desenvolvido com **Next.js 15** (frontend) e **Strapi 5** (CMS headless).

## 🍷 Sobre o Projeto

O WineBusiness.news é um portal jornalístico focado no mercado B2B de vinhos no Brasil, oferecendo:

- **Notícias e análises** do trade de vinhos
- **Seção Gente** com movimentações de profissionais
- **Agenda de Eventos** do setor
- **Rankings e Prêmios** anuais
- **Newsletter** segmentada com double opt-in
- **Monetização** via Google Ad Manager

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                         NGINX                                │
│              (Reverse Proxy + SSL + Cache)                   │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│      NEXT.JS 15         │     │       STRAPI 5          │
│       (Frontend)        │────▶│     (Headless CMS)      │
│                         │     │                         │
│  • SSR/SSG              │     │  • Content Types        │
│  • App Router           │     │  • REST API             │
│  • Google Ad Manager    │     │  • Admin Panel          │
│  • SEO otimizado        │     │  • Media Library        │
└─────────────────────────┘     └─────────────────────────┘
                                          │
                                          ▼
                              ┌─────────────────────────┐
                              │      POSTGRESQL         │
                              │       (Database)        │
                              └─────────────────────────┘
```

## 📁 Estrutura do Projeto

```
winebusiness-news/
├── frontend/                 # Next.js 15 application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # React components
│   │   ├── lib/             # Utilities and API client
│   │   └── types/           # TypeScript definitions
│   ├── public/              # Static assets
│   └── Dockerfile
├── backend/                  # Strapi 5 CMS
│   ├── src/
│   │   ├── api/             # Content Types
│   │   └── components/      # Strapi components
│   ├── config/              # Strapi configuration
│   └── Dockerfile
├── nginx/                    # Nginx configuration
├── docs/                     # Documentation
├── docker-compose.yml        # Docker orchestration
└── README.md
```

## 🚀 Quick Start

### Pré-requisitos

- Docker e Docker Compose
- Node.js 20+ (para desenvolvimento local)
- pnpm (frontend) / yarn (backend)

### Desenvolvimento Local

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/winebusiness-news.git
   cd winebusiness-news
   ```

2. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

3. **Inicie com Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Acesse os serviços**
   - Frontend: http://localhost:3000
   - Strapi Admin: http://localhost:1337/admin

### Desenvolvimento sem Docker

**Backend (Strapi):**
```bash
cd backend
yarn install
yarn develop
```

**Frontend (Next.js):**
```bash
cd frontend
pnpm install
pnpm dev
```

## 📝 Content Types

### Article (Artigo)
- Título, slug, conteúdo (rich text)
- Imagem destacada, excerpt
- Categoria, tags multi-dimensão
- Status: rascunho → revisão → agendado → publicado
- SEO: meta title, description, canonical

### Person (Gente)
- Nome, cargo atual, empresa
- Foto, biografia
- Movimentações de carreira
- Links sociais

### Event (Evento)
- Título, descrição, datas
- Local, cidade, país
- Formato: presencial/online/híbrido
- Link externo, público-alvo

### Ranking
- Título, ano, edição
- Metodologia, júri
- Categorias e resultados
- Patrocinadores

## 🎨 Editorias (Categorias)

| Editoria | Slug | Descrição |
|----------|------|-----------|
| Notícias | `noticias` | Hard news do trade |
| Gente | `gente` | Movimentações de profissionais |
| Importadores | `importadores` | Cobertura de importadores |
| Produtores | `produtores` | Vinícolas e produtores |
| Varejo | `varejo` | Supermercados, lojas, e-commerce |
| Dados & Insights | `dados-insights` | Análises e pesquisas |
| Opinião & Entrevistas | `opiniao-entrevistas` | Artigos de opinião |

## 📊 Monetização

### Google Ad Manager

Slots de anúncios configurados:

| Slot | Tamanhos Desktop | Tamanhos Mobile |
|------|------------------|-----------------|
| Top Banner | 970x90, 728x90 | 320x50, 300x50 |
| Sidebar | 300x250, 300x600 | - |
| In-Article | 300x250, 336x280 | 300x250 |
| Footer | 970x90, 728x90 | 320x50 |

### Key-Values para Segmentação

- `category`: editoria do artigo
- `tags`: tags do artigo
- `section`: seção do site (home, eventos, rankings)
- `article_id`: ID do artigo

## 📧 Newsletter

Sistema de newsletter com:

- **Double opt-in** para conformidade LGPD
- **Segmentação** por interesse
- **Integração** via webhook (Mailchimp, Brevo, etc.)
- **Rate limiting** para proteção contra spam

## 🔒 Segurança

- Headers de segurança via Nginx
- Rate limiting em APIs
- HTTPS obrigatório em produção
- Consent Mode para cookies (LGPD)
- Sanitização de inputs

## 🐳 Deploy em Produção

### Com Docker Compose

```bash
# Build das imagens
docker-compose build

# Iniciar em produção (com Nginx)
docker-compose --profile production up -d
```

### Variáveis de Ambiente Obrigatórias

```bash
# Gerar secrets
openssl rand -base64 32  # Para cada STRAPI_*_SECRET

# Configurar no .env
POSTGRES_PASSWORD=senha_segura
STRAPI_APP_KEYS=chave1,chave2,chave3,chave4
STRAPI_ADMIN_JWT_SECRET=secret_jwt
# ... demais variáveis
```

### SSL/TLS

1. Coloque seus certificados em `nginx/ssl/`:
   - `fullchain.pem`
   - `privkey.pem`

2. Ou use Let's Encrypt com Certbot:
   ```bash
   certbot certonly --webroot -w /var/www/certbot -d winebusiness.news
   ```

## 📈 SEO

- **Sitemap dinâmico** em `/sitemap.xml`
- **RSS Feed** em `/rss.xml`
- **robots.txt** configurado
- **Schema.org** (JSON-LD) para artigos
- **Open Graph** e Twitter Cards
- **Canonical URLs** automáticas

## 🧪 Testes

```bash
# Frontend
cd frontend
pnpm test
pnpm test:e2e

# Backend
cd backend
yarn test
```

## 📚 Documentação Adicional

- [Arquitetura Detalhada](./docs/ARCHITECTURE.md)
- [Guia de Contribuição](./docs/CONTRIBUTING.md)
- [API Reference](./docs/API.md)

## 📄 Licença

Este projeto é proprietário. Todos os direitos reservados.

---

Desenvolvido com 🍷 para o trade de vinhos brasileiro.
