# 🚀 Guia de Deploy - WineBusiness.news

Este guia explica como implantar o projeto WineBusiness.news com Strapi (backend) e Next.js (frontend).

## 📋 Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 20+ (para desenvolvimento local)
- npm (backend) e pnpm (frontend)

## 🔧 Configuração Rápida com Docker

### 1. Configure as Variáveis de Ambiente

Copie o arquivo de exemplo e edite com suas configurações:

```bash
cp .env.example .env
```

**Importante:** Gere chaves seguras para produção:

```bash
# Gere uma chave aleatória
openssl rand -base64 32
```

Use o comando acima para gerar valores únicos para:
- `APP_KEYS` (4 chaves separadas por vírgula)
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`
- `ENCRYPTION_KEY`

### 2. Inicie os Serviços com Docker Compose

```bash
# Construir e iniciar todos os serviços
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f strapi
docker-compose logs -f frontend
```

### 3. Acesse os Serviços

- **Frontend**: http://localhost:3000
- **Strapi Admin**: http://localhost:1337/admin
- **Strapi API**: http://localhost:1337/api

### 4. Configure o Strapi (Primeira Vez)

1. Acesse http://localhost:1337/admin
2. Crie a conta de administrador
3. Configure os Content Types (já estão pré-configurados)
4. Gere um API Token:
   - Vá em Settings → API Tokens → Create new API Token
   - Tipo: Read-Only ou Full Access
   - Copie o token gerado
5. Adicione o token ao arquivo `.env`:
   ```
   STRAPI_API_TOKEN=seu_token_aqui
   ```
6. Reinicie o frontend:
   ```bash
   docker-compose restart frontend
   ```

## 🛠️ Desenvolvimento Local (Sem Docker)

### Backend (Strapi)

```bash
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# Iniciar em modo desenvolvimento
npm run develop

# Build para produção
npm run build
npm start
```

O Strapi estará disponível em http://localhost:1337

### Frontend (Next.js)

```bash
cd frontend

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Edite o .env.local com suas configurações

# Iniciar em modo desenvolvimento
pnpm dev

# Build para produção
pnpm build
pnpm start
```

O frontend estará disponível em http://localhost:3000

## 🐛 Solução de Problemas

### Erro de Conexão Backend-Frontend

Se o frontend não conseguir conectar ao Strapi:

1. Verifique se o Strapi está rodando: `curl http://localhost:1337/api`
2. Verifique as configurações de CORS em `backend/config/middlewares.js`
3. Confirme a variável `NEXT_PUBLIC_STRAPI_URL` no `.env` do frontend
4. Verifique os logs do Strapi: `docker-compose logs strapi`

### Erro no Build do Backend

```bash
# Limpe o cache e reconstrua
cd backend
rm -rf dist node_modules
npm install
npm run build
```

### Erro no Build do Frontend

```bash
# Limpe o cache e reconstrua
cd frontend
rm -rf .next node_modules
pnpm install
pnpm build
```

### Erro de Permissão em Uploads

```bash
# No Docker
docker-compose exec strapi chmod -R 777 /app/public/uploads
```

### Reset do Banco de Dados

```bash
# Pare os serviços
docker-compose down

# Remova o volume do banco de dados
docker volume rm winebusiness-news_postgres_data

# Inicie novamente
docker-compose up -d
```

## 📦 Deploy em Produção

### Opção 1: Docker Compose com Nginx

1. Configure o SSL em `nginx/ssl/`
2. Atualize as variáveis de ambiente para produção
3. Inicie com o perfil de produção:

```bash
docker-compose --profile production up -d
```

### Opção 2: Serviços Separados

#### Backend (Strapi) - Railway/Heroku/AWS

1. Configure DATABASE_URL para seu banco PostgreSQL
2. Configure todas as variáveis de ambiente
3. Execute o build e deploy:

```bash
cd backend
npm run build
npm start
```

#### Frontend (Next.js) - Vercel/Netlify

1. Configure as variáveis de ambiente no painel do serviço
2. Conecte seu repositório GitHub
3. O deploy será automático a cada push

## 🔒 Segurança em Produção

✅ **Checklist de Segurança:**

- [ ] Gere novas chaves seguras (não use os defaults)
- [ ] Configure DATABASE_SSL=true para bancos em cloud
- [ ] Use HTTPS obrigatório (via Nginx ou CDN)
- [ ] Configure backups automáticos do PostgreSQL
- [ ] Limite o acesso ao painel admin do Strapi
- [ ] Configure rate limiting
- [ ] Use variáveis de ambiente seguras (não commite .env)
- [ ] Configure CORS apenas para domínios conhecidos

## 📊 Monitoramento

```bash
# Ver status dos containers
docker-compose ps

# Ver uso de recursos
docker stats

# Ver logs em tempo real
docker-compose logs -f --tail=100
```

## 🔄 Atualizações

### Atualizar Backend

```bash
cd backend
npm install
npm run build
docker-compose restart strapi
```

### Atualizar Frontend

```bash
cd frontend
pnpm install
pnpm build
docker-compose restart frontend
```

## 📚 Recursos Adicionais

- [Documentação do Strapi 5](https://docs.strapi.io/dev-docs/intro)
- [Documentação do Next.js 14](https://nextjs.org/docs)
- [Docker Compose Reference](https://docs.docker.com/compose/)

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs: `docker-compose logs`
2. Verifique a documentação em `docs/`
3. Abra uma issue no GitHub

---

Desenvolvido com 🍷 para o trade de vinhos brasileiro.
