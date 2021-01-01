module.exports = {
  purge: [
    './pages/*.tsx'
  ],
  theme: {
    fontFamily: {
      'sans': ['Fira Sans']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
