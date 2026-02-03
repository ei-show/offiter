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
    themes: [
      {
        light: {
          primary: '#f3f4f6',
          secondary: '#3b82f6',
          accent: '#6b7280',
          neutral: '#93c5fd',
          'base-100': '#dbeafe',
          info: '#374151',
          success: '#6ee7b7',
          warning: '#fde047',
          error: '#fda4af',
        },
      },
    ],
    base: true,
    utils: true,
    logs: false,
  },
}
