const plugin = require('tailwindcss/plugin');
const autocomplete = plugin(
  function ({ addUtilities, theme, e }) {
    const values = theme('autocomplete');
    let utilities = Object.entries(values).map(([key, value]) => {
      return {
        [`.${e(`${value}`)}`]: {},
      };
    });
    addUtilities(utilities);
  },
  {
    theme: {
      autocomplete: ['default'],
    },
  }
);
module.exports = autocomplete;
