# 🚂 Railway - Guia Rápido

## 🚀 Deploy Rápido

### 1. Criar Projeto
```
1. Acesse railway.app
2. New Project → Deploy from GitHub
3. Escolha: ivoaguirra/winebusiness-news
4. Configure Root Directory: backend
```

### 2. Adicionar PostgreSQL
```
1. + New → Database → PostgreSQL
2. Railway cria DATABASE_URL automaticamente
```

### 3. Variáveis de Ambiente

**Copie e cole no Railway:**

```bash
NODE_ENV=production
HOST=0.0.0.0
DATABASE_SSL=true
APP_KEYS=chave1,chave2,chave3,chave4
API_TOKEN_SALT=gere_um_valor
ADMIN_JWT_SECRET=gere_um_valor
TRANSFER_TOKEN_SALT=gere_um_valor
JWT_SECRET=gere_um_valor
ENCRYPTION_KEY=gere_um_valor
```

**Gerar chaves:**
```bash
openssl rand -base64 32
```

### 4. Deploy
```
Railway faz deploy automaticamente! 🎉
Acesse: https://seu-app.up.railway.app/admin
```

## 📋 Checklist

- [ ] Root Directory = `backend`
- [ ] PostgreSQL adicionado
- [ ] DATABASE_SSL=true
- [ ] Todas as chaves definidas
- [ ] Deploy concluído
- [ ] Admin acessível

## 🔗 URLs Importantes

- Admin: `https://seu-app.up.railway.app/admin`
- API: `https://seu-app.up.railway.app/api`
- Logs: Railway Dashboard → Deployments

## 🐛 Problemas Comuns

### Build falha
→ Verifique Root Directory = `backend`

### Database error
→ Adicione DATABASE_SSL=true

### Port error
→ Não defina PORT manualmente

### App não inicia
→ Verifique todas as variáveis de ambiente

## 💡 Dicas

- ✅ Deploy automático em cada push
- ✅ Logs em tempo real no dashboard
- ✅ Rollback fácil para deploys anteriores
- ✅ $5 crédito gratuito por mês

## 📚 Documentação Completa

Veja `RAILWAY_DEPLOYMENT.md` para instruções detalhadas.

---

🍷 _WineBusiness.news no Railway!_
