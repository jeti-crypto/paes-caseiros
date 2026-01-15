'use client'

import React from 'react'
import { easeOut } from 'framer-motion'
import { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { FaBreadSlice, FaCookieBite, FaStar } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

// Preços dos produtos
const precos: Record<string, number> = {
  'Pão Grande': 15,
  'Pão c/ Cinco Fatias': 15,
  'Rosca Tradicional': 15,
  'Rosca Recheada (goiabada)': 18,
  'Rosca Recheada (chocolate)': 18,
  'Fatia Húngara': 18,
}

// Ícones para cada produto
const icones: Record<string, React.ReactNode> = {
  'Pão Grande': <FaBreadSlice className='w-6 h-6 text-yellow-700 dark:text-yellow-400'/>,
  'Pão c/ Cinco Fatias': <FaBreadSlice className='w-6 h-6 text-yellow-700 dark:text-yellow-400'/>,
  'Rosca Tradicional': <FaCookieBite className='w-6 h-6 text-yellow-600 dark:text-yellow-300'/>,
  'Rosca Recheada (goiabada)': <FaCookieBite className='w-6 h-6 text-pink-500 dark:text-pink-400'/>,
  'Rosca Recheada (chocolate)': <FaCookieBite className='w-6 h-6 text-brown-500 dark:text-yellow-200'/>,
  'Fatia Húngara': <FaStar className='w-6 h-6 text-yellow-800 dark:text-yellow-300'/>,
}

export default function Home() {
  const [pixCode, setPixCode] = useState<string | null>(null)
  const [showPix, setShowPix] = useState(false)
  const [quantidades, setQuantidades] = useState<Record<string, number>>({
    'Pão Grande': 0,
    'Pão c/ Cinco Fatias': 0,
    'Rosca Tradicional': 0,
    'Rosca Recheada (goiabada)': 0,
    'Rosca Recheada (chocolate)': 0,
    'Fatia Húngara': 0,
  })

  const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: easeOut,
    },
  }),
}

  function diminuir(item: string) {
    setQuantidades(prev => ({ ...prev, [item]: Math.max(0, prev[item] - 1) }))
  }

  function aumentar(item: string) {
    setQuantidades(prev => ({ ...prev, [item]: prev[item] + 1 }))
  }

  // Total de unidades no carrinho
  const totalUnidades = Object.values(quantidades).reduce((a, b) => a + b, 0)

  // Total sem desconto
  const totalSemDesconto = Object.keys(quantidades).reduce(
    (soma, item) => soma + quantidades[item] * precos[item],
    0
  )

  // Desconto baseado no total de unidades
  let desconto = 0
  if (totalUnidades >= 4 && totalUnidades <= 10) desconto = 5
  else if (totalUnidades > 10) desconto = 10

  const total = Math.max(0, totalSemDesconto - desconto)

  // Função PIX
  async function pagarPix() {
    const response = await fetch('/api/pix', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ total }),
    })
    const data = await response.json()
    if (data.error) { alert('Erro: ' + data.error); return }
    setPixCode(data.copiaECola)
    setShowPix(true)
  }

  // Função Cartão Mercado Pago
  async function pagarCartao() {
    const response = await fetch('/api/cartao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ total }),
    })
    const data = await response.json()
    if (data.error) { alert('Erro: ' + data.error); return }
    window.location.href = data.init_point
  }

  return (
    <motion.div className='min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center py-10 px-4 transition-colors'>
      <motion.h1 className='text-4xl font-extrabold mb-8 text-yellow-900 dark:text-yellow-400 drop-shadow-lg' initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        🥖 Pães Caseiros
      </motion.h1>

      <div className='w-full max-w-md space-y-5'>
        {Object.keys(quantidades).map((item, idx) => (
          <motion.div
            key={item}
            className='flex justify-between items-center p-4 rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-gray-700 dark:to-gray-600'
            custom={idx}
            initial='hidden'
            animate='visible'
            variants={cardVariants}
          >
            <div className='flex items-center gap-3'>
              {icones[item]}
              <div>
                <h2 className='font-semibold text-yellow-900 dark:text-yellow-300'>{item}</h2>
                <p className='text-gray-700 dark:text-gray-300 font-medium'>R$ {precos[item].toFixed(2)}</p>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <motion.button onClick={() => diminuir(item)} whileTap={{ scale: 0.85 }} className='px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition'>➖</motion.button>
              <motion.span key={quantidades[item]} animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 0.35 }} className='w-8 text-center font-bold text-lg text-yellow-900 dark:text-yellow-200'>
                {quantidades[item]}
              </motion.span>
              <motion.button onClick={() => aumentar(item)} whileTap={{ scale: 0.85 }} className='px-3 py-1 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition'>➕</motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mensagem de incentivo e total com desconto */}
      <motion.div className='mt-8 w-full max-w-md flex flex-col items-center'>
        {totalUnidades >= 4 && (
          <p className='text-sm text-blue-700 dark:text-blue-300 font-semibold mb-2'>
            Mais por menos! Você recebeu R$ {desconto.toFixed(2)} de desconto no total.
          </p>
        )}

        <h2 className='text-2xl font-bold text-yellow-900 dark:text-yellow-200'>
          Total:{' '}
          {desconto > 0 ? (
            <>
              <span className='line-through text-red-500 mr-2'>R$ {totalSemDesconto.toFixed(2)}</span>
              <span className='font-bold text-green-600 dark:text-green-400'>R$ {total.toFixed(2)}</span>
            </>
          ) : (
            <>R$ {total.toFixed(2)}</>
          )}
        </h2>

        <div className='flex space-x-3 mt-3'>
          <motion.button onClick={pagarPix} whileTap={{ scale: 0.95 }} className='px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:brightness-110 transition'>💳 PIX</motion.button>
          <motion.button onClick={pagarCartao} whileTap={{ scale: 0.95 }} className='px-5 py-2 bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700 text-white font-semibold rounded-2xl shadow-lg hover:brightness-110 transition'>🏦 Cartão</motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showPix && pixCode && (
          <motion.div className='mt-10 flex flex-col items-center p-8 rounded-3xl shadow-2xl bg-gradient-to-tr from-white to-yellow-50 dark:from-gray-800 dark:to-gray-700' initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5 }}>
            <h2 className='text-2xl font-semibold mb-4 text-yellow-900 dark:text-yellow-200'>Escaneie o QR Code PIX</h2>
            <QRCodeCanvas value={pixCode} size={256} level='H' includeMargin={true}/>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>Ou copie o código PIX:</p>
            <textarea value={pixCode} readOnly className='mt-2 w-72 h-28 p-3 border border-gray-300 dark:border-gray-600 rounded-xl resize-none text-sm shadow-inner bg-white dark:bg-gray-700 text-black dark:text-white transition-colors'/>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
