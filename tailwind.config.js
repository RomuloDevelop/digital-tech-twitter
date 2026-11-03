const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      ...colors
    },
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontSize: {
        'md-header': '2.5rem',
        'sm-header': '2rem',
        'xs-header': '1.5rem',
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem'
      },
      purple: {
        '50':  '#fcfbfb',
        '100': '#f7f1f7',
        '200': '#f0d3ee',
        '300': '#dea9d9',
        '400': '#d47abe',
        '500': '#c055a6',
        '600': '#a43a86',
        '700': '#7d2c64',
        '800': '#561e41',
        '900': '#311324',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
