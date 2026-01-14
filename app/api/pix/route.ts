import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const total = Number(body.total)

    if (!total || total <= 0) {
      return NextResponse.json(
        { error: 'Total inválido' },
        { status: 400 }
      )
    }

    const chavePix = process.env.PIX_CHAVE || 'PIX_TESTE'

    const copiaECola = `PIX REAL\nChave: ${chavePix}\nValor: R$ ${total.toFixed(
      2
    )}`

    return NextResponse.json({
      copiaECola,
      total,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao gerar PIX' },
      { status: 500 }
    )
  }
}
