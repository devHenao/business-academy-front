/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontSize: {
        '30px': '30px',
      },
      colors: {
        'black': '#000000',
      },
      fontFamily: {
        'times': ['"Times New Roman"', 'Times', 'serif'],
      }
    },  },
  plugins: [],
}

