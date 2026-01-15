'use client'

export default function Erro() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>❌ Pagamento não concluído</h1>

      <p style={{ marginTop: 20, fontSize: 18 }}>
        O pagamento não foi aprovado.
      </p>

      <p style={{ marginTop: 10 }}>
        Você pode tentar novamente ou escolher outra forma de pagamento.
      </p>

      <a href="/" style={{ display: 'inline-block', marginTop: 30 }}>
        Voltar para a loja
      </a>
    </div>
  )
}
