const spacingUnits = require('./assets/tailwindcss/units/generateUnitByMultiplicator')(4, 50);
const fontSizeUnit = require('./assets/tailwindcss/units/generateUnitByMultiplicator')(2, 50);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/**/*.{js,ts,vue,jsx,tsx}', './styleguide/components/**/*.twig'],
  theme: {
    autocomplete: ['btn-primary', 'link', 'link-nav', 'link-white', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'wysiwyg-base'],
    spacing: {
      px: '1px',
      0: '0px',
      ...spacingUnits,
    },
    screens: {
      xxs: '320px',
      xs: '375px',
      sm: '500px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    extend: {},
  },
  plugins: [
    require('./assets/tailwindcss/plugins/autocomplete'),
    require('tailwindcss-debug-screens'),
    require('@tailwindcss/typography')({
      className: 'wysiwyg',
    }),
  ],
};
