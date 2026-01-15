'use client'

export default function Pendente() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>⏳ Pagamento pendente</h1>

      <p style={{ marginTop: 20, fontSize: 18 }}>
        Seu pagamento está sendo processado.
      </p>

      <p style={{ marginTop: 10 }}>
        Assim que for confirmado, você será notificado.
      </p>

      <a href="/" style={{ display: 'inline-block', marginTop: 30 }}>
        Voltar para a loja
      </a>
    </div>
  )
}
