const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx,}', './src/**/*.{js,ts,jsx,tsx,css,scss,}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: '"Hachi Maru Pop"', // Title
      head: '"Kosugi Maru"', // 見出し
      body: '"Noto Sans JP"', // 文章
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      cyan: colors.cyan,
      gray: colors.gray,
      indigo: colors.indigo,
      purple: colors.purple,
      pink: colors.pink,
      white: colors.white,
      blue: colors.blue,
    },
    extend: {},
  },
  variants: {
    extend: {
      translate: ['group-hover'],
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    styled: false,
    themes: false
  }
}
