import { NextRequest, NextResponse } from 'next/server'
import PixPayload from 'pix-payload'

export async function POST(req: NextRequest) {
  const { total } = await req.json()

  if (!total || total <= 0) return NextResponse.json({ error:'Valor inválido' }, { status:400 })

  // 🔐 CONFIGURE SUA CHAVE PIX REAL AQUI
  const chavePix = process.env.PIX_CHAVE
  if (!chavePix) {
  throw new Error('PIX_CHAVE não definida nas variáveis de ambiente')
}
    function limparTexto(texto: string, max: number) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .slice(0, max)
}

const nomeRecebedor = limparTexto('Tiago Nascimento', 25)
const cidadeRecebedor = limparTexto('Barretos', 15)


  const txid = 'PEDIDO' + Date.now()

  const pix = PixPayload({
    pixKey: chavePix,
    merchantName: nomeRecebedor,
    merchantCity: cidadeRecebedor,
    amount: total,
    txid,
  })

  return NextResponse.json({ copiaECola: pix.getPayload(), txid })
}
