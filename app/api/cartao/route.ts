import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

export async function POST(req: Request) {
  try {
    // 🔐 Token do Mercado Pago via variável de ambiente
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN

    if (!accessToken) {
      return NextResponse.json(
        { error: 'MERCADOPAGO_ACCESS_TOKEN não definido' },
        { status: 500 }
      )
    }

    const body = await req.json()
    const { total } = body

    if (!total || total <= 0) {
      return NextResponse.json(
        { error: 'Valor total inválido' },
        { status: 400 }
      )
    }

    // ✅ Configuração do cliente Mercado Pago
    const client = new MercadoPagoConfig({
      accessToken,
    })

    const preference = new Preference(client)

    // 🌐 URLs finais (PRODUÇÃO)
    const baseUrl = 'https://paes-caseiros.vercel.app'

    // 🛒 Criação da preferência de pagamento
    const result = await preference.create({
      body: {
        items: [
          {
            title: 'Compra de Pães Caseiros',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: Number(total),
          },
        ],
        back_urls: {
          success: `${baseUrl}/sucesso`,
          failure: `${baseUrl}/erro`,
          pending: `${baseUrl}/pendente`,
        },
        auto_return: 'approved',
      },
    })

    return NextResponse.json({
      init_point: result.init_point,
    })
  } catch (error) {
    console.error('Erro Mercado Pago:', error)

    return NextResponse.json(
      { error: 'Erro ao criar pagamento com cartão' },
      { status: 500 }
    )
  }
}
