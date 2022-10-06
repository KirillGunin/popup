/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
      'sm': '350px-499px',
      'lg': '500px'
    },
  },
},
  plugins: [],
}
