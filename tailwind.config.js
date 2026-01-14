/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        yellow: {50:'#FFFBEA',100:'#FFF3C4',200:'#FCE588',300:'#FADB5F',400:'#F7C948',500:'#F0B429',600:'#DE911D',700:'#CB6E17',800:'#B44D12',900:'#8D2B0B'},
        pink: {400:'#F472B6',500:'#EC4899'},
        brown: {500:'#8B4513'},
        gray: {300:'#D1D5DB',400:'#9CA3AF',500:'#6B7280',600:'#4B5563',700:'#374151',800:'#1F2937',900:'#111827'},
        blue: {500:'#3B82F6',600:'#2563EB',700:'#1D4ED8'},
        green: {500:'#10B981',600:'#059669'},
        red: {500:'#EF4444',600:'#DC2626'},
      },
      transitionTimingFunction: {'in-out':'cubic-bezier(0.4,0,0.2,1)'},
    },
  },
  plugins: [],
}
