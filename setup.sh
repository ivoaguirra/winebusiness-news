#!/bin/bash

# WineBusiness.news - Quick Start Script
# Este script facilita o setup inicial do projeto

set -e

echo "🍷 WineBusiness.news - Configuração Inicial"
echo "=========================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

print_success "Docker e Docker Compose encontrados"

# Verificar se .env existe
if [ ! -f .env ]; then
    print_warning "Arquivo .env não encontrado. Criando a partir do .env.example..."
    cp .env.example .env
    print_success "Arquivo .env criado"
    
    echo ""
    print_warning "IMPORTANTE: Edite o arquivo .env e configure:"
    echo "  - Senha do banco de dados (POSTGRES_PASSWORD)"
    echo "  - Chaves de segurança do Strapi (APP_KEYS, JWT_SECRET, etc.)"
    echo ""
    echo "Para gerar chaves seguras, use:"
    echo "  openssl rand -base64 32"
    echo ""
    read -p "Pressione Enter para continuar depois de configurar o .env..."
else
    print_success "Arquivo .env encontrado"
fi

# Perguntar se quer limpar tudo
echo ""
read -p "Deseja limpar containers e volumes existentes? (s/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    print_warning "Parando e removendo containers existentes..."
    docker-compose down -v 2>/dev/null || true
    print_success "Limpeza concluída"
fi

# Build e start dos serviços
echo ""
echo "🏗️  Construindo as imagens Docker..."
docker-compose build

echo ""
echo "🚀 Iniciando os serviços..."
docker-compose up -d

echo ""
echo "⏳ Aguardando serviços ficarem prontos..."
sleep 5

# Verificar status dos serviços
echo ""
echo "📊 Status dos serviços:"
docker-compose ps

# Verificar se os serviços estão respondendo
echo ""
echo "🔍 Verificando conectividade..."

# Esperar Strapi ficar pronto (pode demorar na primeira vez)
echo "Aguardando Strapi iniciar (pode demorar alguns minutos na primeira vez)..."
for i in {1..60}; do
    if curl -s http://localhost:1337/admin > /dev/null 2>&1; then
        print_success "Strapi está respondendo em http://localhost:1337"
        break
    fi
    echo -n "."
    sleep 2
done

echo ""

# Esperar Frontend ficar pronto
echo "Aguardando Frontend iniciar..."
for i in {1..30}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        print_success "Frontend está respondendo em http://localhost:3000"
        break
    fi
    echo -n "."
    sleep 2
done

echo ""
echo "=========================================="
echo "✅ Setup Concluído!"
echo "=========================================="
echo ""
echo "📍 Serviços disponíveis:"
echo "  • Frontend:      http://localhost:3000"
echo "  • Strapi Admin:  http://localhost:1337/admin"
echo "  • Strapi API:    http://localhost:1337/api"
echo ""
echo "🔐 Próximos passos:"
echo "  1. Acesse http://localhost:1337/admin"
echo "  2. Crie a conta de administrador do Strapi"
echo "  3. Gere um API Token em Settings → API Tokens"
echo "  4. Adicione o token ao arquivo .env (STRAPI_API_TOKEN)"
echo "  5. Reinicie o frontend: docker-compose restart frontend"
echo ""
echo "📝 Comandos úteis:"
echo "  • Ver logs:           docker-compose logs -f"
echo "  • Parar serviços:     docker-compose down"
echo "  • Reiniciar:          docker-compose restart"
echo "  • Reconstruir:        docker-compose up -d --build"
echo ""
echo "📚 Para mais informações, veja DEPLOYMENT.md"
echo ""
