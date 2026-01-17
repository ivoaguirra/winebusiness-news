# 🚄 Deploy no Railway (Next.js + Strapi)

Este guia explica como publicar o **WineBusiness.news** no Railway separando os serviços em **Frontend (Next.js)**, **Backend (Strapi)** e **Postgres**.

## ✅ Pré-requisitos

- Conta no Railway
- Repositório conectado ao Railway (GitHub/GitLab)

## 1) Criar o projeto e o banco

1. Crie um projeto no Railway.
2. Adicione um serviço **PostgreSQL** pelo menu **New ➜ Database ➜ PostgreSQL**.
3. Copie a variável **DATABASE_URL** gerada pelo Railway.

> ℹ️ O Strapi já está preparado para usar `DATABASE_URL`.【F:backend/config/database.js†L1-L30】

## 2) Subir o Backend (Strapi)

1. No Railway, clique em **New ➜ Service ➜ Deploy from GitHub**.
2. Selecione o repositório e, nas **Settings** do serviço, configure:
   - **Root Directory**: `backend`
   - **Build Command**: automático (Nixpacks)
   - **Start Command**: automático (Nixpacks)

O `backend/nixpacks.toml` já define as fases de build/start para o Strapi.【F:backend/nixpacks.toml†L1-L12】

### Variáveis de ambiente do backend

Defina no serviço **backend**:

```bash
DATABASE_URL=postgresql://...
DATABASE_SSL=true
APP_KEYS=chave1,chave2,chave3,chave4
ADMIN_JWT_SECRET=uma_chave_segura
API_TOKEN_SALT=uma_chave_segura
TRANSFER_TOKEN_SALT=uma_chave_segura
ENCRYPTION_KEY=uma_chave_segura
PUBLIC_URL=https://seu-backend.up.railway.app
HOST=0.0.0.0
```

> 🔐 Para gerar secrets:
> `openssl rand -base64 32`

**Notas importantes**
- `PUBLIC_URL` é usado pelo Strapi para gerar URLs corretas e assets em produção.【F:backend/config/server.js†L1-L9】
- `DATABASE_SSL=true` atende o padrão do Railway (SSL obrigatório).【F:backend/config/database.js†L1-L14】

## 3) Subir o Frontend (Next.js)

1. Crie um novo serviço no Railway com o mesmo repositório.
2. Em **Settings** do serviço, configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `pnpm build`
   - **Start Command**: `node server.js`

O Dockerfile do frontend já suporta build com as variáveis `NEXT_PUBLIC_*`.【F:frontend/Dockerfile†L1-L43】

### Variáveis de ambiente do frontend

```bash
NEXT_PUBLIC_STRAPI_URL=https://seu-backend.up.railway.app
NEXT_PUBLIC_STRAPI_API_URL=https://seu-backend.up.railway.app/api
NEXT_PUBLIC_SITE_URL=https://seu-site.up.railway.app
NEXT_PUBLIC_GA_ID=G-XXXXXXX
NEXT_PUBLIC_GAM_NETWORK_CODE=12345678
```

> `NEXT_PUBLIC_STRAPI_API_URL` é usado nas chamadas REST do frontend.【F:frontend/lib/strapi.ts†L5-L34】

## 4) Ajustar CORS (se necessário)

Se o frontend estiver em outro domínio, configure o CORS no Strapi.
Por padrão, o middleware `strapi::cors` está ativo.【F:backend/config/middlewares.js†L1-L10】

## 5) Verificações finais

1. **Admin do Strapi**: `https://seu-backend.up.railway.app/admin`
2. **Site**: `https://seu-site.up.railway.app`
3. Confirme que o frontend consome o backend via `NEXT_PUBLIC_STRAPI_URL`.

---

## 🔎 Dicas de troubleshooting

- **Erro de porta no Railway**: garanta que o app usa `PORT` fornecido pelo Railway (não configure um valor fixo).【F:backend/nixpacks.toml†L1-L12】
- **Assets quebrados no Strapi**: confirme `PUBLIC_URL`.
- **Erro de SSL no banco**: confirme `DATABASE_SSL=true`.

## ♻️ Reaproveitar banco antigo (mantendo dados)

Quando o banco já foi usado por uma instalação antiga, o schema pode ficar incompatível. A forma mais segura de manter **somente os dados corretos** é:

1. **Criar um banco novo** no Railway.
2. Apontar o Strapi para o banco novo e fazer **redeploy** (isso cria o schema correto).
3. **Exportar apenas os dados válidos** do banco antigo (por exemplo, artigos publicados).
4. **Importar os dados** no banco novo.

Exemplo de exportação filtrada (ajuste a tabela e o filtro):

```sql
COPY (
  SELECT * FROM articles WHERE status = 'published'
) TO STDOUT WITH CSV HEADER;
```

> ✅ Essa abordagem evita erros de migração como `relation does not exist` em índices antigos.
