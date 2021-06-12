module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: '"Hachi Maru Pop"', // Title
      head: '"Kosugi Maru"',     // 見出し
      body: '"Noto Sans JP"',    // 文章
    },
    extend: {},
  },
  variants: {
    extend: {
      translate: ['group-hover'],
    },
  },
  plugins: [],
}
