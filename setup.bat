@echo off
REM WineBusiness.news - Quick Start Script for Windows
REM Este script facilita o setup inicial do projeto no Windows

echo.
echo WineBusiness.news - Configuracao Inicial
echo ==========================================
echo.

REM Verificar se Docker esta instalado
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] Docker nao esta instalado. Por favor, instale o Docker Desktop primeiro.
    pause
    exit /b 1
)

where docker-compose >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] Docker Compose nao esta instalado. Por favor, instale o Docker Compose primeiro.
    pause
    exit /b 1
)

echo [OK] Docker e Docker Compose encontrados
echo.

REM Verificar se .env existe
if not exist .env (
    echo [AVISO] Arquivo .env nao encontrado. Criando a partir do .env.example...
    copy .env.example .env
    echo [OK] Arquivo .env criado
    echo.
    echo IMPORTANTE: Edite o arquivo .env e configure:
    echo   - Senha do banco de dados ^(POSTGRES_PASSWORD^)
    echo   - Chaves de seguranca do Strapi ^(APP_KEYS, JWT_SECRET, etc.^)
    echo.
    echo Para gerar chaves seguras no PowerShell, use:
    echo   [Convert]::ToBase64String^([System.Security.Cryptography.RandomNumberGenerator]::GetBytes^(32^)^)
    echo.
    pause
) else (
    echo [OK] Arquivo .env encontrado
)

REM Perguntar se quer limpar tudo
echo.
set /p CLEAN="Deseja limpar containers e volumes existentes? (s/N): "
if /i "%CLEAN%"=="s" (
    echo [AVISO] Parando e removendo containers existentes...
    docker-compose down -v 2>nul
    echo [OK] Limpeza concluida
)

REM Build e start dos servicos
echo.
echo Construindo as imagens Docker...
docker-compose build

echo.
echo Iniciando os servicos...
docker-compose up -d

echo.
echo Aguardando servicos ficarem prontos...
timeout /t 5 /nobreak >nul

REM Verificar status dos servicos
echo.
echo Status dos servicos:
docker-compose ps

echo.
echo Aguardando Strapi iniciar ^(pode demorar alguns minutos na primeira vez^)...
for /l %%i in (1,1,60) do (
    curl -s http://localhost:1337/admin >nul 2>&1
    if %errorlevel% equ 0 (
        echo [OK] Strapi esta respondendo em http://localhost:1337
        goto :frontend_check
    )
    echo|set /p="."
    timeout /t 2 /nobreak >nul
)

:frontend_check
echo.
echo Aguardando Frontend iniciar...
for /l %%i in (1,1,30) do (
    curl -s http://localhost:3000 >nul 2>&1
    if %errorlevel% equ 0 (
        echo [OK] Frontend esta respondendo em http://localhost:3000
        goto :done
    )
    echo|set /p="."
    timeout /t 2 /nobreak >nul
)

:done
echo.
echo ==========================================
echo Setup Concluido!
echo ==========================================
echo.
echo Servicos disponiveis:
echo   - Frontend:      http://localhost:3000
echo   - Strapi Admin:  http://localhost:1337/admin
echo   - Strapi API:    http://localhost:1337/api
echo.
echo Proximos passos:
echo   1. Acesse http://localhost:1337/admin
echo   2. Crie a conta de administrador do Strapi
echo   3. Gere um API Token em Settings -^> API Tokens
echo   4. Adicione o token ao arquivo .env ^(STRAPI_API_TOKEN^)
echo   5. Reinicie o frontend: docker-compose restart frontend
echo.
echo Comandos uteis:
echo   - Ver logs:           docker-compose logs -f
echo   - Parar servicos:     docker-compose down
echo   - Reiniciar:          docker-compose restart
echo   - Reconstruir:        docker-compose up -d --build
echo.
echo Para mais informacoes, veja DEPLOYMENT.md
echo.
pause
