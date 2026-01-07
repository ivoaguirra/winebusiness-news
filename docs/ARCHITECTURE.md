# WineBusiness.news - Arquitetura do Sistema

## Visão Geral

O WineBusiness.news é um portal B2B de notícias focado no trade de vinhos no Brasil. A arquitetura foi projetada para ser escalável, de fácil manutenção e com deploy self-hosted via Docker.

## Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              INTERNET                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         NGINX (Reverse Proxy)                                │
│                    - SSL Termination                                         │
│                    - Load Balancing                                          │
│                    - Static File Caching                                     │
└─────────────────────────────────────────────────────────────────────────────┘
                    │                                    │
                    ▼                                    ▼
┌───────────────────────────────┐    ┌───────────────────────────────────────┐
│      FRONTEND (Next.js)       │    │         BACKEND (Strapi CMS)          │
│  - SSR/ISR                    │    │  - API REST/GraphQL                   │
│  - TypeScript                 │    │  - Admin Panel                        │
│  - TailwindCSS                │    │  - Workflow Editorial                 │
│  - Google Publisher Tag       │    │  - Gestão de Mídia                    │
│  - Cookie Consent             │    │  - Autenticação/Autorização           │
│  Port: 3000                   │    │  Port: 1337                           │
└───────────────────────────────┘    └───────────────────────────────────────┘
                    │                                    │
                    └────────────────┬───────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         POSTGRESQL (Database)                                │
│                    - Dados do CMS                                            │
│                    - Full-text Search                                        │
│                    - Backups Automáticos                                     │
│                    Port: 5432                                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Stack Técnica

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS
- **Renderização**: SSR (Server-Side Rendering) + ISR (Incremental Static Regeneration)
- **SEO**: next-seo, sitemap.xml, robots.txt, RSS feeds

### Backend/CMS
- **CMS**: Strapi v4
- **Database**: PostgreSQL 15
- **Upload**: Local storage (configurável para S3)
- **API**: REST + GraphQL

### Infraestrutura
- **Containerização**: Docker + Docker Compose
- **Proxy Reverso**: Nginx
- **CI/CD**: GitHub Actions

## Modelo de Dados

### Content Types (Strapi)

#### 1. Article (Post/Notícia)
```
- id: integer (PK)
- title: string (required)
- slug: string (unique)
- excerpt: text
- content: richtext
- featured_image: media
- status: enum [draft, review, scheduled, published]
- publish_date: datetime
- author: relation (User)
- category: relation (Category)
- tags: relation (Tag) [many-to-many]
- seo_title: string
- seo_description: text
- is_featured: boolean
- is_sponsored: boolean
- created_at: datetime
- updated_at: datetime
```

#### 2. Person (Gente - Movimentações)
```
- id: integer (PK)
- name: string (required)
- slug: string (unique)
- photo: media
- previous_position: string
- previous_company: string
- new_position: string
- new_company: string
- movement_type: enum [hired, promoted, left, other]
- description: richtext
- status: enum [draft, review, scheduled, published]
- publish_date: datetime
- author: relation (User)
- tags: relation (Tag) [many-to-many]
- created_at: datetime
- updated_at: datetime
```

#### 3. Event (Evento)
```
- id: integer (PK)
- title: string (required)
- slug: string (unique)
- description: richtext
- featured_image: media
- start_date: datetime
- end_date: datetime
- location: string
- city: string
- country: string
- format: enum [presential, online, hybrid]
- target_audience: string
- event_type: string
- external_link: string
- is_featured: boolean
- status: enum [draft, review, scheduled, published]
- author: relation (User)
- tags: relation (Tag) [many-to-many]
- created_at: datetime
- updated_at: datetime
```

#### 4. Ranking (Rankings/Prêmios)
```
- id: integer (PK)
- title: string (required)
- slug: string (unique)
- year: integer
- edition: string
- description: richtext
- methodology: richtext
- featured_image: media
- status: enum [draft, review, scheduled, published]
- author: relation (User)
- categories: relation (RankingCategory) [one-to-many]
- jury_members: relation (JuryMember) [one-to-many]
- created_at: datetime
- updated_at: datetime
```

#### 5. RankingCategory
```
- id: integer (PK)
- name: string
- ranking: relation (Ranking)
- results: relation (RankingResult) [one-to-many]
```

#### 6. RankingResult
```
- id: integer (PK)
- position: integer
- name: string
- company: string
- score: decimal
- notes: text
- category: relation (RankingCategory)
```

#### 7. Category (Editoria)
```
- id: integer (PK)
- name: string (required)
- slug: string (unique)
- description: text
- color: string
- order: integer
```

#### 8. Tag
```
- id: integer (PK)
- name: string (required)
- slug: string (unique)
- type: enum [segment, country, channel, content_type, theme]
```

#### 9. Newsletter Subscriber
```
- id: integer (PK)
- email: string (unique)
- name: string
- segment: enum [importer, retail, producer, other]
- confirmed: boolean
- confirmation_token: string
- subscribed_at: datetime
- unsubscribed_at: datetime
```

#### 10. Ad Settings
```
- id: integer (PK)
- placement: enum [top_banner, sidebar, in_article_1, in_article_2, footer]
- enabled: boolean
- ad_unit_id: string
- sizes: json
- key_values: json
```

#### 11. Page (Páginas Estáticas)
```
- id: integer (PK)
- title: string
- slug: string (unique)
- content: richtext
- seo_title: string
- seo_description: text
```

## Fluxo Editorial

```
┌─────────┐    ┌──────────┐    ┌───────────┐    ┌───────────┐
│ RASCUNHO│───▶│ EM REVISÃO│───▶│ AGENDADO  │───▶│ PUBLICADO │
└─────────┘    └──────────┘    └───────────┘    └───────────┘
     │              │               │                │
     │              │               │                │
     ▼              ▼               ▼                ▼
  Autor          Editor         Sistema          Público
  cria           revisa         publica          acessa
```

## Papéis e Permissões

| Papel      | Criar | Editar Próprio | Editar Todos | Publicar | Ads | Admin |
|------------|-------|----------------|--------------|----------|-----|-------|
| Admin      | ✓     | ✓              | ✓            | ✓        | ✓   | ✓     |
| Editor     | ✓     | ✓              | ✓            | ✓        | ✗   | ✗     |
| Autor      | ✓     | ✓              | ✗            | ✗        | ✗   | ✗     |
| Colunista  | ✓     | ✓              | ✗            | ✗        | ✗   | ✗     |
| Comercial  | ✗     | ✗              | ✗            | ✗        | ✓   | ✗     |

## Estrutura de URLs

```
/                           # Home
/noticias                   # Editoria: Notícias
/gente                      # Editoria: Gente
/importadores               # Editoria: Importadores
/produtores                 # Editoria: Produtores
/varejo                     # Editoria: Varejo
/dados-insights             # Editoria: Dados & Insights
/eventos                    # Editoria: Eventos
/opiniao-entrevistas        # Editoria: Opinião & Entrevistas
/[categoria]/[slug]         # Artigo individual
/eventos/[slug]             # Evento individual
/rankings                   # Hub de Rankings
/rankings/[slug]            # Ranking individual
/tag/[slug]                 # Página de tag
/sobre                      # Sobre/Manifesto
/politica-editorial         # Política editorial
/politica-patrocinado       # Política de conteúdo patrocinado
/newsletter                 # Inscrição newsletter
/sitemap.xml                # Sitemap
/robots.txt                 # Robots
/rss.xml                    # RSS Feed
```

## Slots de Anúncios

| Placement     | Posição                    | Tamanhos Desktop      | Tamanhos Mobile |
|---------------|----------------------------|-----------------------|-----------------|
| top_banner    | Abaixo do header           | 970x90, 728x90        | 320x50, 300x50  |
| sidebar       | Lateral direita            | 300x250, 300x600      | -               |
| in_article_1  | Após 2º parágrafo          | 300x250, 336x280      | 300x250         |
| in_article_2  | Após 5º parágrafo          | 300x250, 336x280      | 300x250         |
| footer        | Antes do footer            | 970x90, 728x90        | 320x50          |

## Variáveis de Ambiente

```env
# Database
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=winebusiness
DATABASE_USERNAME=winebusiness
DATABASE_PASSWORD=secure_password

# Strapi
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token
JWT_SECRET=your_jwt_secret
ADMIN_JWT_SECRET=your_admin_jwt_secret
APP_KEYS=key1,key2,key3,key4

# Frontend
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=https://winebusiness.news
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GAM_NETWORK_CODE=12345678

# Newsletter
NEWSLETTER_WEBHOOK_URL=https://your-webhook.com
```
