/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1DB496',
          hover: '#21CAA8',
          light: '#1388700D',
          'most-light': '#F2FDFB',
        },
        text: {
          DEFAULT: '#26292D',
          secondary: '#42454C',
        },
        'state-bg': '#F6F6F7',
      },
      fontFamily: {
        sans: ['Gilroy', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

