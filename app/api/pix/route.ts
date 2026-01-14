import { NextResponse } from 'next/server'

function gerarPixCopiaECola(
  chave: string,
  nome: string,
  cidade: string,
  valor: number
) {
  return `
000201
26580014BR.GOV.BCB.PIX
0136${chave}
52040000
5303986
54${valor.toFixed(2).replace('.', '')}
5802BR
5913${nome}
6009${cidade}
62070503***
6304
`.replace(/\s/g, '')
}

export async function POST(req: Request) {
  const body = await req.json()
  const total = body.total

  const chavePix = process.env.PIX_CHAVE as string

  const copiaECola = gerarPixCopiaECola(
    chavePix,
    'Paes Caseiros',
    'BRASIL',
    total
  )

  return NextResponse.json({
    copiaECola,
    total,
  })
}