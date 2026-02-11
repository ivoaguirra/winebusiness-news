import { NextRequest, NextResponse } from 'next/server';

// Validação de email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Rate limiting simples (em produção, usar Redis)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Tente novamente em alguns minutos.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, name, segment } = body;

    // Validação
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Email inválido.' },
        { status: 400 }
      );
    }

    // Em produção, salvar no Strapi e/ou enviar para serviço de email
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const strapiToken = process.env.STRAPI_API_TOKEN;

    // Gerar token de confirmação
    const confirmationToken = crypto.randomUUID();

    // Tentar salvar no Strapi
    try {
      const response = await fetch(`${strapiUrl}/api/newsletter-subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(strapiToken && { Authorization: `Bearer ${strapiToken}` }),
        },
        body: JSON.stringify({
          data: {
            email,
            name: name || null,
            segment: segment || 'other',
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Verificar se é erro de email duplicado
        if (errorData.error?.message?.includes('unique')) {
          return NextResponse.json(
            { error: 'Este email já está cadastrado.' },
            { status: 409 }
          );
        }

        throw new Error('Erro ao salvar no CMS');
      }
    } catch (cmsError) {
      console.error('Erro ao salvar no Strapi:', cmsError);
      // Continuar mesmo se falhar (em produção, implementar fallback)
    }

    // Enviar email de confirmação (webhook ou serviço de email)
    const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'newsletter_subscription',
            email,
            name,
            segment,
            confirmationToken,
            confirmationUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/confirmar?token=${confirmationToken}`,
          }),
        });
      } catch (webhookError) {
        console.error('Erro ao enviar webhook:', webhookError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Inscrição realizada! Verifique seu email para confirmar.',
    });
  } catch (error) {
    console.error('Erro na inscrição da newsletter:', error);
    return NextResponse.json(
      { error: 'Erro interno. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}

// Endpoint para confirmar email
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { error: 'Token não fornecido.' },
      { status: 400 }
    );
  }

  // Em produção, validar token no Strapi e atualizar status
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const strapiToken = process.env.STRAPI_API_TOKEN;

  try {
    // Buscar subscriber pelo token
    const searchResponse = await fetch(
      `${strapiUrl}/api/newsletter-subscribers?filters[confirmation_token][$eq]=${token}`,
      {
        headers: {
          ...(strapiToken && { Authorization: `Bearer ${strapiToken}` }),
        },
      }
    );

    if (!searchResponse.ok) {
      throw new Error('Erro ao buscar subscriber');
    }

    const searchData = await searchResponse.json();
    const subscriber = searchData.data?.[0];

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Token inválido ou expirado.' },
        { status: 404 }
      );
    }

    // Atualizar status para confirmed
    await fetch(`${strapiUrl}/api/newsletter-subscribers/${subscriber.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(strapiToken && { Authorization: `Bearer ${strapiToken}` }),
      },
      body: JSON.stringify({
        data: {
          confirmed: true,
          confirmation_token: null,
        },
      }),
    });

    return NextResponse.json({
      success: true,
      message: 'Email confirmado com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao confirmar email:', error);
    return NextResponse.json(
      { error: 'Erro ao confirmar email. Tente novamente.' },
      { status: 500 }
    );
  }
}
