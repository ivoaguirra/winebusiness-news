# 🧪 Teste de Deployment - Checklist

Use este checklist para verificar se o deployment está funcionando corretamente.

## 📋 Pré-requisitos

- [ ] Docker instalado e funcionando
- [ ] Docker Compose instalado
- [ ] Portas 1337, 3000 e 5432 disponíveis
- [ ] Conexão com a internet (para baixar imagens)

## 🔧 Teste 1: Configuração Inicial

### Passos:

1. [ ] Clone o repositório:
   ```bash
   git clone https://github.com/ivoaguirra/winebusiness-news.git
   cd winebusiness-news
   ```

2. [ ] Execute o script de setup:
   ```bash
   # Linux/Mac
   ./setup.sh
   
   # Windows
   setup.bat
   ```

3. [ ] Verifique se os serviços iniciaram:
   ```bash
   docker-compose ps
   ```

### Resultado Esperado:
- ✅ 3 containers rodando: postgres, strapi, frontend
- ✅ Todos com status "Up"

## 🧪 Teste 2: Backend (Strapi)

### Passos:

1. [ ] Acesse http://localhost:1337/admin
   - Deve abrir a página de registro do Strapi

2. [ ] Crie uma conta de administrador:
   - Email: admin@test.com
   - Senha: (mínimo 8 caracteres)

3. [ ] Verifique o painel admin:
   - [ ] Content-Type Builder está acessível
   - [ ] API Tokens está disponível

4. [ ] Teste a API:
   ```bash
   curl http://localhost:1337/api
   ```

### Resultado Esperado:
- ✅ Página admin carrega sem erros
- ✅ Login funciona
- ✅ API responde com JSON

## 🧪 Teste 3: Frontend (Next.js)

### Passos:

1. [ ] Acesse http://localhost:3000
   - Deve abrir a página inicial

2. [ ] Verifique no console do navegador (F12):
   - Não deve ter erros de CORS
   - Não deve ter erros 500

3. [ ] Teste a conexão com Strapi:
   ```bash
   # Nos logs do frontend
   docker-compose logs frontend | grep -i error
   ```

### Resultado Esperado:
- ✅ Página carrega sem erros
- ✅ Sem erros de CORS no console
- ✅ Frontend pode acessar API do Strapi

## 🧪 Teste 4: Conexão Backend-Frontend

### Passos:

1. [ ] No Strapi Admin, crie um API Token:
   - Settings → API Tokens → Create new API Token
   - Name: Frontend
   - Token type: Read-Only
   - Duration: Unlimited
   - Copie o token gerado

2. [ ] Adicione o token ao .env:
   ```bash
   echo "STRAPI_API_TOKEN=seu_token_aqui" >> .env
   ```

3. [ ] Reinicie o frontend:
   ```bash
   docker-compose restart frontend
   ```

4. [ ] Verifique os logs:
   ```bash
   docker-compose logs -f frontend
   ```

### Resultado Esperado:
- ✅ Frontend reinicia sem erros
- ✅ Token é reconhecido
- ✅ Conexão com Strapi funciona

## 🧪 Teste 5: Database

### Passos:

1. [ ] Conecte ao PostgreSQL:
   ```bash
   docker-compose exec postgres psql -U winebusiness -d winebusiness
   ```

2. [ ] Liste as tabelas:
   ```sql
   \dt
   ```

3. [ ] Saia do psql:
   ```sql
   \q
   ```

### Resultado Esperado:
- ✅ Conexão com banco funciona
- ✅ Tabelas do Strapi foram criadas
- ✅ Sem erros de conexão

## 🧪 Teste 6: CORS

### Passos:

1. [ ] No navegador, abra http://localhost:3000

2. [ ] Abra o Console (F12) → Network

3. [ ] Tente fazer uma requisição ao Strapi:
   ```javascript
   fetch('http://localhost:1337/api')
     .then(r => r.json())
     .then(data => console.log('Success:', data))
     .catch(error => console.error('Error:', error))
   ```

### Resultado Esperado:
- ✅ Requisição completa com sucesso
- ✅ Sem erros de CORS
- ✅ Response-header `access-control-allow-origin` presente

## 🧪 Teste 7: Build Production

### Passos:

1. [ ] Pare os serviços:
   ```bash
   docker-compose down
   ```

2. [ ] Reconstrua as imagens:
   ```bash
   docker-compose build --no-cache
   ```

3. [ ] Inicie novamente:
   ```bash
   docker-compose up -d
   ```

### Resultado Esperado:
- ✅ Build completa sem erros
- ✅ Todas as imagens são criadas
- ✅ Serviços iniciam corretamente

## 📊 Resumo dos Testes

| Teste | Status | Notas |
|-------|--------|-------|
| Configuração Inicial | ⬜ |  |
| Backend (Strapi) | ⬜ |  |
| Frontend (Next.js) | ⬜ |  |
| Conexão Backend-Frontend | ⬜ |  |
| Database | ⬜ |  |
| CORS | ⬜ |  |
| Build Production | ⬜ |  |

## 🐛 Problemas Comuns

### Erro: "port is already allocated"
**Solução:** Mude a porta no docker-compose.yml ou pare o serviço que está usando a porta

### Erro: "Cannot connect to Docker daemon"
**Solução:** Inicie o Docker Desktop

### Erro: "Network winebusiness-network not found"
**Solução:** 
```bash
docker-compose down
docker network prune
docker-compose up -d
```

### Erro: Frontend não conecta ao Strapi
**Solução:**
1. Verifique se STRAPI_API_TOKEN está no .env
2. Verifique logs: `docker-compose logs frontend`
3. Verifique CORS em backend/config/middlewares.js

### Erro: "DATABASE_URL is not defined"
**Solução:** Não é necessário. Use as variáveis individuais (POSTGRES_DB, etc.)

## ✅ Todos os Testes Passaram?

Se todos os testes passaram, seu deployment está funcionando corretamente! 🎉

Próximos passos:
1. Configure os Content Types no Strapi
2. Crie conteúdo de teste
3. Veja o conteúdo aparecer no frontend

## 🆘 Precisa de Ajuda?

Se algum teste falhou:
1. Veja `DEPLOYMENT.md` → Seção "Solução de Problemas"
2. Verifique os logs: `docker-compose logs -f`
3. Abra uma issue no GitHub com detalhes dos erros
