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
        // Kick's color palette
        'kick-bg': '#141517',             // Background color
        'kick-text': '#FFFFFF',           // Text color (white)
        'kick-highlight': '#53FC18',      // Highlight color (links, viewer count)
        'kick-label': '#929EA6',          // Label color (e.g., 'viewers' label)
        'kick-border': '#E5E7EB',         // Border color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],  // Set Inter as the default sans font
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
  ],
};
