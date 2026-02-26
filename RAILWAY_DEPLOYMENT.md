# 🚂 Deploy do Backend (Strapi) no Railway

Este guia explica como fazer o deploy do backend WineBusiness.news (Strapi) no Railway.

## 📋 Pré-requisitos

- Conta no [Railway.app](https://railway.app)
- Conta no GitHub (para conectar o repositório)
- Código do projeto no GitHub

## 🚀 Deploy Passo a Passo

### 1. Prepare o Projeto

O projeto já está configurado para Railway com:
- ✅ `nixpacks.toml` - Configuração de build
- ✅ `config/database.js` - Suporte a DATABASE_URL
- ✅ PostgreSQL como banco de dados

### 2. Crie um Novo Projeto no Railway

1. Acesse https://railway.app
2. Faça login com sua conta GitHub
3. Clique em **"New Project"**
4. Selecione **"Deploy from GitHub repo"**
5. Escolha o repositório `ivoaguirra/winebusiness-news`
6. Railway detectará automaticamente a configuração do Nixpacks

### 3. Configure o Backend

Quando o projeto for criado:

1. **Selecione o serviço do backend:**
   - Railway pode criar múltiplos serviços
   - Certifique-se de configurar apenas a pasta `/backend`

2. **Configure o Root Directory:**
   - Vá em **Settings → Service Settings**
   - Em **Root Directory**, defina: `backend`
   - Clique em **Save**

### 4. Adicione o Banco de Dados PostgreSQL

1. No seu projeto Railway, clique em **"+ New"**
2. Selecione **"Database"**
3. Escolha **"PostgreSQL"**
4. Railway criará automaticamente um banco de dados PostgreSQL
5. A variável `DATABASE_URL` será criada automaticamente

### 5. Configure as Variáveis de Ambiente

No Railway, vá em **Variables** e adicione:

#### Variáveis Obrigatórias:

```bash
# Railway fornece automaticamente
DATABASE_URL=postgresql://... (fornecido automaticamente)
PORT=${{RAILWAY_PORT}} (fornecido automaticamente)

# Você deve adicionar manualmente:
NODE_ENV=production
HOST=0.0.0.0
DATABASE_SSL=true

# Gere chaves seguras com: openssl rand -base64 32
APP_KEYS=chave1,chave2,chave3,chave4
API_TOKEN_SALT=sua_salt_aqui
ADMIN_JWT_SECRET=seu_secret_aqui
TRANSFER_TOKEN_SALT=sua_salt_aqui
JWT_SECRET=seu_secret_aqui
ENCRYPTION_KEY=sua_chave_aqui
```

#### Como Gerar Chaves Seguras:

**Linux/Mac:**
```bash
openssl rand -base64 32
```

**Windows PowerShell:**
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

**Online:**
- Use: https://generate-secret.vercel.app/32

### 6. Configure o Domínio (Opcional)

1. No Railway, vá em **Settings → Networking**
2. Clique em **"Generate Domain"**
3. Railway gerará um domínio gratuito: `seu-app.up.railway.app`
4. Ou configure um domínio customizado se preferir

### 7. Deploy!

1. Após configurar tudo, clique em **"Deploy"**
2. Railway irá:
   - ✅ Instalar dependências com `npm ci`
   - ✅ Buildar o Strapi com `npm run build`
   - ✅ Iniciar o servidor com `npm start`

3. Acompanhe o deploy nos logs:
   - Clique na aba **"Deployments"**
   - Veja os logs em tempo real

### 8. Acesse o Strapi Admin

Após o deploy bem-sucedido:

1. Acesse: `https://seu-dominio.up.railway.app/admin`
2. Na primeira vez, crie sua conta de administrador
3. Configure os Content Types
4. Gere API Tokens para o frontend usar

## 🔐 Variáveis de Ambiente Completas

Copie e cole no Railway Variables:

```bash
# ===== OBRIGATÓRIAS =====

# Banco de Dados (fornecido automaticamente pelo Railway)
DATABASE_URL=${{DATABASE_PRIVATE_URL}}
DATABASE_SSL=true

# Servidor
NODE_ENV=production
HOST=0.0.0.0
PORT=${{RAILWAY_PORT}}

# Secrets (GERE NOVOS VALORES!)
APP_KEYS=chave1,chave2,chave3,chave4
API_TOKEN_SALT=gere_um_valor_unico
ADMIN_JWT_SECRET=gere_um_valor_unico
TRANSFER_TOKEN_SALT=gere_um_valor_unico
JWT_SECRET=gere_um_valor_unico
ENCRYPTION_KEY=gere_um_valor_unico

# ===== OPCIONAIS =====

# AWS S3 para uploads (se usar)
# AWS_ACCESS_KEY_ID=sua_chave
# AWS_SECRET_ACCESS_KEY=seu_secret
# AWS_REGION=us-east-1
# AWS_BUCKET=winebusiness-uploads

# SMTP para emails (se usar)
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_USER=noreply@winebusiness.news
# SMTP_PASSWORD=sua_senha
```

## 📊 Monitoramento

### Ver Logs

1. No Railway, clique no serviço
2. Vá na aba **"Deployments"**
3. Clique no deployment ativo
4. Veja os logs em tempo real

### Métricas

Railway fornece automaticamente:
- 📈 CPU Usage
- 💾 Memory Usage
- 🌐 Network Traffic
- ⏱️ Response Time

## 🔧 Troubleshooting

### Erro: "Build failed"

**Solução:**
1. Verifique se o Root Directory está definido como `backend`
2. Confirme que o `nixpacks.toml` está correto
3. Veja os logs de build para detalhes

### Erro: "Database connection failed"

**Solução:**
1. Verifique se PostgreSQL está adicionado ao projeto
2. Confirme que `DATABASE_SSL=true` está definido
3. Verifique se `DATABASE_URL` está presente nas variáveis

### Erro: "Port already in use"

**Solução:**
1. Não defina manualmente a variável `PORT`
2. Railway fornece automaticamente `${{RAILWAY_PORT}}`
3. O Strapi usará automaticamente a porta do Railway

### App não inicia

**Solução:**
1. Verifique os logs no Railway
2. Confirme que todas as variáveis de ambiente estão definidas
3. Verifique se as chaves de segurança foram geradas

### Erro de memória (OOM)

**Solução:**
1. Railway oferece 512 MB por padrão
2. Considere fazer upgrade do plano se necessário
3. Otimize o build do Strapi com `--minify`

## 🔄 Atualizações e Redeploy

### Deploy Automático

Railway está configurado para deploy automático:
- ✅ Cada push no branch principal faz deploy automaticamente
- ✅ Você pode desabilitar isso em Settings se preferir

### Deploy Manual

Para fazer deploy de uma branch específica:
1. Vá em **Settings → Service Settings**
2. Em **Source**, escolha a branch desejada
3. Clique em **Deploy**

### Rollback

Se algo der errado:
1. Vá em **Deployments**
2. Encontre um deployment anterior que funcionava
3. Clique nos três pontos (**...**)
4. Selecione **"Redeploy"**

## 💰 Custos

### Plano Free (Hobby)
- ✅ $5 de crédito gratuito por mês
- ✅ Suficiente para projetos pequenos
- ✅ Sleep após 30 minutos de inatividade

### Plano Pro ($20/mês)
- ✅ $20 de crédito incluído
- ✅ Sem sleep
- ✅ Melhor para produção

## 🔗 Conectar Frontend

Após o deploy do backend:

1. **Obtenha a URL do Railway:**
   - Ex: `https://winebusiness-backend.up.railway.app`

2. **Configure no Frontend:**
   - No Vercel, Netlify ou onde hospedar o frontend
   - Defina: `NEXT_PUBLIC_STRAPI_URL=https://winebusiness-backend.up.railway.app`

3. **Gere API Token no Strapi:**
   - Acesse o Strapi Admin
   - Settings → API Tokens → Create new API Token
   - Copie o token

4. **Adicione ao Frontend:**
   - `STRAPI_API_TOKEN=seu_token_aqui`

## 📝 Checklist de Deploy

Antes de fazer deploy:

- [ ] Root Directory configurado como `backend`
- [ ] PostgreSQL adicionado ao projeto
- [ ] DATABASE_URL disponível (automático)
- [ ] DATABASE_SSL=true definido
- [ ] Todas as chaves de segurança geradas e definidas
- [ ] NODE_ENV=production definido
- [ ] Domínio gerado ou configurado
- [ ] CORS configurado para permitir frontend

Após o deploy:

- [ ] Logs mostram "Server started" sem erros
- [ ] Consegue acessar /admin
- [ ] Consegue criar conta de administrador
- [ ] API responde em /api
- [ ] Frontend consegue conectar (sem erro CORS)

## 🎓 Recursos Adicionais

- [Documentação Railway](https://docs.railway.app)
- [Documentação Strapi](https://docs.strapi.io)
- [Railway Templates](https://railway.app/templates)
- [Community Discord](https://discord.gg/railway)

## 🆘 Precisa de Ajuda?

1. **Verifique os logs** no Railway primeiro
2. **Consulte** a seção de Troubleshooting acima
3. **Veja** DEPLOYMENT.md para informações gerais
4. **Abra** uma issue no GitHub se o problema persistir

---

## 🎉 Pronto!

Seu backend Strapi está agora rodando no Railway! 🚂

Para fazer deploy do frontend, consulte a documentação do Vercel ou Netlify.

---

_Desenvolvido com 🍷 para o trade de vinhos brasileiro._
