// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Existing color palette
        'kick-bg': '#141517',
        'kick-text': '#FFFFFF',
        'kick-highlight': '#53FC18',
        'kick-label': '#929EA6',
        'kick-border': '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // You can add custom keyframes or animations here if you want to
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
  ],
};
