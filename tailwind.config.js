/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Poppins',
      },
      boxShadow: {
        'theme': '1px 1px 10px 1px rgba(0, 0, 0, 0.23)'
      }
    },
  },
  plugins: [],
};
