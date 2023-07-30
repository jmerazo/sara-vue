/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './index.html',
      './src/**/*.{vue,js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#262f21', // Color para la ruta activa
        greenFooter: '#eaf2ed'
      },
    },
  },
  plugins: [],
}

