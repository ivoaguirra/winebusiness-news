#!/bin/bash

# Railway Deployment Diagnostic Script
# Use este script para verificar se o deploy está correto

echo "🔍 DIAGNÓSTICO DE DEPLOY RAILWAY"
echo "=================================="
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# URL do Railway (substitua pela sua)
RAILWAY_URL="${1:-https://railwayapp-strapi-production-2c15.up.railway.app}"

echo "📍 URL testada: $RAILWAY_URL"
echo ""

# Teste 1: DNS Resolution
echo "1️⃣ Testando resolução DNS..."
if host $(echo $RAILWAY_URL | sed 's|https://||' | sed 's|/.*||') > /dev/null 2>&1; then
    echo -e "${GREEN}✅ DNS resolve corretamente${NC}"
else
    echo -e "${RED}❌ DNS não resolve - Domínio não existe ou não foi gerado${NC}"
    echo "   Solução: Railway → Settings → Networking → Generate Domain"
    exit 1
fi
echo ""

# Teste 2: HTTP Response
echo "2️⃣ Testando resposta HTTP..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$RAILWAY_URL" --connect-timeout 10)
if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 404 ]; then
    echo -e "${GREEN}✅ Servidor responde (HTTP $HTTP_CODE)${NC}"
elif [ "$HTTP_CODE" -eq 000 ]; then
    echo -e "${RED}❌ Sem resposta - Servidor não está rodando${NC}"
    echo "   Solução: Verifique logs no Railway Dashboard"
    exit 1
else
    echo -e "${YELLOW}⚠️  Resposta inesperada (HTTP $HTTP_CODE)${NC}"
fi
echo ""

# Teste 3: Health Check
echo "3️⃣ Testando health check..."
HEALTH_RESPONSE=$(curl -s "$RAILWAY_URL/_health" --connect-timeout 10)
if [ -n "$HEALTH_RESPONSE" ]; then
    echo -e "${GREEN}✅ Health check responde:${NC}"
    echo "$HEALTH_RESPONSE" | jq . 2>/dev/null || echo "$HEALTH_RESPONSE"
else
    echo -e "${YELLOW}⚠️  Health check não disponível (normal se não implementado)${NC}"
fi
echo ""

# Teste 4: Admin Panel
echo "4️⃣ Testando /admin..."
ADMIN_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$RAILWAY_URL/admin" --connect-timeout 10)
if [ "$ADMIN_CODE" -eq 200 ]; then
    echo -e "${GREEN}✅ Admin panel acessível (HTTP $ADMIN_CODE)${NC}"
else
    echo -e "${YELLOW}⚠️  Admin panel retornou HTTP $ADMIN_CODE${NC}"
    if [ "$ADMIN_CODE" -eq 404 ]; then
        echo "   Pode ser que o build do admin não completou"
    fi
fi
echo ""

# Teste 5: API
echo "5️⃣ Testando /api..."
API_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$RAILWAY_URL/api" --connect-timeout 10)
if [ "$API_CODE" -eq 200 ] || [ "$API_CODE" -eq 403 ]; then
    echo -e "${GREEN}✅ API responde (HTTP $API_CODE)${NC}"
else
    echo -e "${YELLOW}⚠️  API retornou HTTP $API_CODE${NC}"
fi
echo ""

# Resumo
echo "=================================="
echo "📊 RESUMO"
echo "=================================="
echo ""

if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 404 ]; then
    echo -e "${GREEN}✅ Servidor está ONLINE${NC}"
    echo ""
    echo "Próximos passos:"
    echo "  1. Acesse: $RAILWAY_URL/admin"
    echo "  2. Crie conta de administrador"
    echo "  3. Configure Content Types"
    echo "  4. Gere API Token"
else
    echo -e "${RED}❌ Servidor está OFFLINE ou com problemas${NC}"
    echo ""
    echo "O que fazer:"
    echo "  1. Vá ao Railway Dashboard"
    echo "  2. Clique em Deployments"
    echo "  3. Veja os logs de erro"
    echo "  4. Verifique variáveis de ambiente"
    echo "  5. Consulte RAILWAY_TROUBLESHOOTING.md"
fi

echo ""
echo "📚 Documentação: RAILWAY_TROUBLESHOOTING.md"
echo ""
