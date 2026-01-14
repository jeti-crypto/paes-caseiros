import { NextRequest, NextResponse } from 'next/server'
import mercadopago from 'mercadopago'

mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN!)

export async function POST(req: NextRequest) {
  const { total } = await req.json()
  if (!total || total <= 0) return NextResponse.json({ error:'Valor inválido' }, { status:400 })

  const preference = {
    items:[{ title:'Compra Padaria', quantity:1, currency_id:'BRL', unit_price: total }],
    back_urls:{
      success:'https://paes-caseiros.vercel.app/sucesso',
      failure:'https://paes-caseiros.vercel.app/falha',
      pending:'https://paes-caseiros.vercel.app/pendente'
    },
    auto_return:'approved'
  }

  const response = await mercadopago.preferences.create(preference)
  return NextResponse.json({ init_point: response.body.init_point })
}
