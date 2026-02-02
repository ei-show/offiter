module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,}', './src/**/*.{js,ts,jsx,tsx,css,scss,}'],
  darkMode: 'media',
  theme: {
    fontFamily: {
      title: '"Hachi Maru Pop"',
      head: '"Kosugi Maru"',
      body: '"Noto Sans JP"',
    },
    extend: {},
  },
  variants: {
    extend: {
      translate: ['group-hover'],
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    styled: true,
    themes: ['winter'],
    base: true,
    utils: true,
    logs: true,
  },
}
