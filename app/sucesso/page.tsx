'use client'

export default function Sucesso() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>✅ Pagamento aprovado!</h1>

      <p style={{ marginTop: 20, fontSize: 18 }}>
        Obrigado pela sua compra 🥖  
        Seu pagamento foi confirmado com sucesso.
      </p>

      <p style={{ marginTop: 10 }}>
        Em breve entraremos em contato para a entrega.
      </p>

      <a href="/" style={{ display: 'inline-block', marginTop: 30 }}>
        Voltar para a loja
      </a>
    </div>
  )
}
