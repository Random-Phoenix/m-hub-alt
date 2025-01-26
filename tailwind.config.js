/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      letterSpacing: {
        tight: '-0.015em',
      },
      screens: {
        'xxs': '360px',
        'xs': '400px',
      },
    },
  },
  plugins: [],
};