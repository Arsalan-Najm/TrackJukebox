/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: {
          100: '#1C2331',
          200: '#222C3C',
          300: '#1E2022',
        },
        secondary: {
          100: '#F2F2F2',
          200: '#F2F2F280',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      fontFamily: {
        main: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
