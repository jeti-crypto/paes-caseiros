'use client'

import { useState } from 'react'

const precos: Record<string, number> = {
  'Pão Grande': 10,
  'Pão c/ Cinco Fatias': 8,
  'Rosca Tradicional': 12,
  'Rosca Recheada (goiabada)': 15,
  'Rosca Recheada (chocolate)': 16,
  'Fatia Húngara': 6,
}

export default function Home() {
  const [quantidades, setQuantidades] = useState<Record<string, number>>({
    'Pão Grande': 0,
    'Pão c/ Cinco Fatias': 0,
    'Rosca Tradicional': 0,
    'Rosca Recheada (goiabada)': 0,
    'Rosca Recheada (chocolate)': 0,
    'Fatia Húngara': 0,
  })

  function diminuir(item: string) {
    setQuantidades(prev => ({
      ...prev,
      [item]: Math.max(0, prev[item] - 1),
    }))
  }

  function aumentar(item: string) {
    setQuantidades(prev => ({
      ...prev,
      [item]: prev[item] + 1,
    }))
  }

  // ✅ TOTAL PRECISA VIR ANTES
  const total = Object.keys(quantidades).reduce((soma, item) => {
    return soma + quantidades[item] * precos[item]
  }, 0)

  // ✅ FUNÇÃO PIX DEPOIS DO TOTAL
  async function pagarPix() {
    const response = await fetch('/api/pix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ total }),
    })

    const data = await response.json()
    alert(`API respondeu: ${data.mensagem}\nTotal: R$ ${data.totalRecebido}`)
  }

  function pagarCartao() {
    alert('Pagamento com cartão em breve 💳')
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>🥖 Pães Caseiros</h1>

      {Object.keys(quantidades).map(item => (
        <div key={item} style={{ marginBottom: 12 }}>
          <strong>{item}</strong> — R$ {precos[item].toFixed(2)}
          <br />
          <button onClick={() => diminuir(item)}>-</button>
          <span style={{ margin: '0 10px' }}>
            {quantidades[item]}
          </span>
          <button onClick={() => aumentar(item)}>+</button>
        </div>
      ))}

      <hr />

      <h2>Total: R$ {total.toFixed(2)}</h2>

      <button onClick={pagarPix}>PIX</button>
      <button onClick={pagarCartao} style={{ marginLeft: 10 }}>
        Cartão
      </button>
    </div>
  )
}
