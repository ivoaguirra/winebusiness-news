# 🔧 Railway Deploy Não Funciona - Soluções

## ❌ Problema: URL não está acessível

Se você está vendo este erro ao tentar acessar:
```
https://railwayapp-strapi-production-2c15.up.railway.app/admin
```

Este guia vai te ajudar a resolver o problema passo a passo.

---

## 🔍 DIAGNÓSTICO RÁPIDO

### 1. Verifique o Status do Deploy

**No Railway Dashboard:**

1. Acesse https://railway.app
2. Vá no seu projeto
3. Clique no serviço do backend
4. Veja a aba **"Deployments"**

**O que verificar:**

✅ **Deploy está "Active" (ativo)?**
- Se não: Veja os logs de erro abaixo
- Se sim: Continue para próximo passo

✅ **Build foi concluído?**
- Procure por "Build completed" nos logs
- Se falhou: Veja seção "Erro no Build"

✅ **App está rodando?**
- Procure por "Server started" nos logs
- Se não: Veja seção "Erro ao Iniciar"

---

## 🐛 PROBLEMAS COMUNS E SOLUÇÕES

### Problema 1: Deploy Ainda Não Completou

**Sintoma:** Deploy está "Building" ou "Deploying"

**Solução:** Aguarde! Primeira vez pode levar 5-10 minutos.

**Como acompanhar:**
```
Railway Dashboard → Deployments → View Logs
```

---

### Problema 2: Domínio Não Foi Gerado

**Sintoma:** URL não resolve (erro DNS)

**Solução:**

1. **Vá em Settings → Networking**
2. **Clique em "Generate Domain"**
3. **Aguarde 1-2 minutos** para DNS propagar
4. **Teste a nova URL**

**Alternativa:**
```bash
# Teste se o serviço está rodando internamente
# Na aba Deployments, veja se há erros
```

---

### Problema 3: Variáveis de Ambiente Faltando

**Sintoma:** Build OK, mas app não inicia

**Erro nos logs:**
```
Error: App keys are required
Error: DATABASE_URL is required
```

**Solução:**

1. **Vá em Variables tab**
2. **Adicione TODAS as variáveis obrigatórias:**

```bash
# OBRIGATÓRIAS
NODE_ENV=production
HOST=0.0.0.0
DATABASE_SSL=true

# GERE CHAVES ÚNICAS (openssl rand -base64 32)
APP_KEYS=chave1,chave2,chave3,chave4
API_TOKEN_SALT=sua_salt
ADMIN_JWT_SECRET=seu_secret
TRANSFER_TOKEN_SALT=sua_salt
JWT_SECRET=seu_secret
ENCRYPTION_KEY=sua_chave
```

3. **Clique em "Redeploy"**

---

### Problema 4: PostgreSQL Não Configurado

**Sintoma:** Erro de conexão com banco

**Erro nos logs:**
```
Error: connect ECONNREFUSED
Database connection failed
```

**Solução:**

1. **Adicione PostgreSQL ao projeto:**
   - No projeto, clique em **"+ New"**
   - Selecione **"Database" → "PostgreSQL"**
   - Aguarde criar (1-2 minutos)

2. **Verifique se DATABASE_URL existe:**
   - Vá em **Variables**
   - Deve ter `DATABASE_URL` (criado automaticamente)

3. **Adicione DATABASE_SSL=true:**
   ```bash
   DATABASE_SSL=true
   ```

4. **Redeploy o serviço**

---

### Problema 5: Root Directory Incorreto

**Sintoma:** Build não encontra arquivos

**Erro nos logs:**
```
package.json not found
npm: command not found
```

**Solução:**

1. **Vá em Settings → Service Settings**
2. **Root Directory deve ser:** `backend`
3. **Save e Redeploy**

---

### Problema 6: PORT Configurado Manualmente

**Sintoma:** App inicia mas não responde

**Erro nos logs:**
```
Port 1337 is already in use
EADDRINUSE
```

**Solução:**

1. **NÃO defina a variável PORT manualmente**
2. **Railway fornece automaticamente via ${{RAILWAY_PORT}}**
3. **Remova PORT das variáveis se existir**
4. **Redeploy**

---

### Problema 7: Build Falha

**Sintoma:** Deploy para em "Building"

**Erro nos logs:**
```
npm ERR! code ELIFECYCLE
Build failed
```

**Solução:**

1. **Verifique se nixpacks.toml está correto:**
   ```toml
   [phases.setup]
   nixPkgs = ['nodejs_20']
   
   [phases.install]
   cmds = ['npm ci --omit=dev']
   
   [phases.build]
   cmds = ['npm run build']
   ```

2. **Verifique se package-lock.json existe**

3. **Tente build local primeiro:**
   ```bash
   cd backend
   npm install
   npm run build
   ```

4. **Se funcionar local, force rebuild no Railway:**
   - Settings → Restart → Clear Cache → Redeploy

---

### Problema 8: Memória Insuficiente

**Sintoma:** Build ou app para no meio

**Erro nos logs:**
```
JavaScript heap out of memory
SIGKILL
```

**Solução:**

1. **Plano Hobby tem 512 MB (pode ser insuficiente)**
2. **Considere upgrade para plano Pro**
3. **Ou otimize o build:**
   ```bash
   # Em package.json
   "build": "NODE_OPTIONS=--max-old-space-size=460 strapi build"
   ```

---

### Problema 9: Strapi Admin Não Carrega

**Sintoma:** URL funciona mas /admin não carrega

**Solução:**

1. **Limpe o cache do Strapi:**
   - No Railway, vá em Settings
   - Clear Build Cache
   - Redeploy

2. **Verifique se build completou:**
   ```bash
   # Nos logs, procure por:
   Building admin UI...
   Admin UI built successfully
   ```

3. **Se persistir, force rebuild:**
   ```bash
   # Em Variables, adicione:
   STRAPI_DISABLE_UPDATE_NOTIFICATION=true
   ```

---

### Problema 10: CORS Error no Frontend

**Sintoma:** Frontend não conecta ao backend

**Erro no browser:**
```
Access to fetch has been blocked by CORS policy
```

**Solução:**

1. **Verifique config/middlewares.js:**
   ```javascript
   {
     name: 'strapi::cors',
     config: {
       enabled: true,
       origin: ['https://seu-frontend.vercel.app'],
     },
   }
   ```

2. **Adicione a URL do frontend na lista de origens**

---

## 📊 CHECKLIST DE VERIFICAÇÃO

Use esta lista para garantir que tudo está configurado:

### Configuração do Serviço
- [ ] Root Directory = `backend`
- [ ] Build Command = `npm run build` (automático)
- [ ] Start Command = `npm start` (automático)
- [ ] Região selecionada (qualquer uma serve)

### Banco de Dados
- [ ] PostgreSQL adicionado ao projeto
- [ ] DATABASE_URL presente nas variáveis
- [ ] DATABASE_SSL=true definido

### Variáveis de Ambiente
- [ ] NODE_ENV=production
- [ ] HOST=0.0.0.0
- [ ] APP_KEYS (4 chaves separadas por vírgula)
- [ ] API_TOKEN_SALT
- [ ] ADMIN_JWT_SECRET
- [ ] TRANSFER_TOKEN_SALT
- [ ] JWT_SECRET
- [ ] ENCRYPTION_KEY
- [ ] DATABASE_SSL=true

### Networking
- [ ] Domínio gerado em Settings → Networking
- [ ] URL acessível (teste no navegador)

### Deploy
- [ ] Build completou sem erros
- [ ] App iniciou (logs mostram "Server started")
- [ ] Health check passa (se configurado)

---

## 🔬 COMO DEBUGAR

### 1. Ver Logs Completos

```
Railway Dashboard → Deployments → Clique no deploy → View Logs
```

**O que procurar:**
- ❌ Erros em vermelho
- ⚠️ Warnings em amarelo
- ✅ "Server started" em verde

### 2. Testar Localmente

```bash
cd backend

# Instalar
npm install

# Build
npm run build

# Testar
npm start
```

Se funciona local mas não no Railway, é problema de configuração.

### 3. Verificar Health Check

```bash
# Teste se o servidor responde
curl https://sua-url.up.railway.app/_health

# Ou teste a API
curl https://sua-url.up.railway.app/api
```

### 4. Logs em Tempo Real

```
Railway CLI (se instalado):
railway logs
```

---

## 🆘 SOLUÇÃO DEFINITIVA: RESET COMPLETO

Se nada funcionou, faça reset completo:

### 1. Limpe o Cache
```
Settings → Clear Build Cache
```

### 2. Remova e Recrie PostgreSQL
```
1. Exporte dados se tiver (opcional)
2. Remova PostgreSQL do projeto
3. Adicione novo PostgreSQL
4. DATABASE_URL será recriado automaticamente
```

### 3. Reconfigure Variáveis
```
1. Delete todas as variáveis
2. Adicione uma por uma da lista acima
3. Gere novas chaves de segurança
```

### 4. Force Redeploy
```
Deployments → Latest → ... → Redeploy
```

---

## 📞 COMANDOS ÚTEIS

### Gerar Chaves de Segurança

**Linux/Mac:**
```bash
openssl rand -base64 32
```

**Windows PowerShell:**
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

**Online:**
```
https://generate-secret.vercel.app/32
```

### Testar Conexão

```bash
# Teste se resolve DNS
nslookup sua-url.up.railway.app

# Teste se responde HTTP
curl -I https://sua-url.up.railway.app

# Teste API
curl https://sua-url.up.railway.app/api
```

---

## 📚 RECURSOS ADICIONAIS

- **Railway Docs:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **Strapi Docs:** https://docs.strapi.io
- **Guia Completo:** Ver `RAILWAY_DEPLOYMENT.md`

---

## ✅ PRÓXIMOS PASSOS

Depois de resolver o problema:

1. **Acesse /admin**
2. **Crie conta de administrador**
3. **Configure Content Types**
4. **Gere API Token**
5. **Conecte ao frontend**

---

## 💡 DICAS DE PREVENÇÃO

### Antes de Fazer Deploy:

1. ✅ Teste local primeiro
2. ✅ Gere todas as chaves antes
3. ✅ Tenha PostgreSQL pronto
4. ✅ Configure variáveis antes do deploy
5. ✅ Verifique Root Directory

### Durante o Deploy:

1. ✅ Acompanhe os logs
2. ✅ Aguarde completar (não cancele)
3. ✅ Verifique cada etapa

### Depois do Deploy:

1. ✅ Teste a URL
2. ✅ Acesse /admin
3. ✅ Verifique /api
4. ✅ Teste conexão frontend

---

## 🎯 RESUMO RÁPIDO

**Problema mais comum:** Variáveis de ambiente faltando

**Solução mais rápida:**

1. Adicione PostgreSQL
2. Configure TODAS as variáveis (.env.railway)
3. Gere domínio
4. Redeploy
5. Aguarde 3-5 minutos
6. Teste a URL

**Se ainda não funcionar:** Veja logs no Railway Dashboard → Deployments

---

🍷 **WineBusiness.news - Troubleshooting Railway**
