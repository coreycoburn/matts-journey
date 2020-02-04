module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#C5DAF9',
          200: '#40ADBC',
          300: '#00A5BD',
          500: '#183868',
        },
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
}
