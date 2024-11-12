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
        'kick-highlight-hover': '#42c514',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'gradientShift': 'gradientShift 5s linear infinite',
      },
      keyframes: {
        gradientShift: {
          '0%': { 'background-position': '0% 50%' },
          '100%': { 'background-position': '200% 50%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
  ],
};
