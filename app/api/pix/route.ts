import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const total = body.total

  return NextResponse.json({
    mensagem: 'PIX iniciado com sucesso',
    totalRecebido: total,
  })
}
