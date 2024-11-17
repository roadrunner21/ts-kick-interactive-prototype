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
        // Kick branding colors
        'kick-bg': '#141517',
        'kick-text': '#FFFFFF',
        'kick-highlight': '#53FC18',
        'kick-highlight-hover': '#42c514',
        'kick-label': '#929EA6',
        'kick-border': '#E5E7EB',
        // Additional colors
        'kick-accent': '#1DB954', // For text highlights
        'kick-gradient-start': '#141517',
        'kick-gradient-end': '#53FC18',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        kickPixel: ['KickPixel', 'sans-serif'],
      },
      backgroundImage: theme => ({
        'inspiration-bg': "url('https://i.ibb.co/VHFkJB5/kick-bg.jpg')",
        'vhs-noise': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NgYGBgAAAABQABDQottAAAAABJRU5ErkJggg==')",
        // Additional background images
      }),
      animation: {
        'gradientShift': 'gradientShift 5s linear infinite',
        'glowAnimation': 'glowAnimation 1s ease-out',
        'vhsColorShift': 'vhsColorShift 30s linear infinite',
        'vhsScanLines': 'vhsScanLines 15s linear infinite',
        'fadeIn': 'fadeIn 1s ease-out',
        'pulseSlow': 'pulse 2s infinite',
        'bounceSlow': 'bounce 2s infinite',
      },
      keyframes: {
        gradientShift: {
          '0%': { 'background-position': '0% 50%' },
          '100%': { 'background-position': '200% 50%' },
        },
        glowAnimation: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        vhsColorShift: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '50%': { filter: 'hue-rotate(360deg)' },
          '100%': { filter: 'hue-rotate(0deg)' },
        },
        vhsScanLines: {
          'from': { 'background-position': '0 0, 0 0' },
          'to': { 'background-position': '0 3px, 0 3px' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Additional keyframes if needed
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
  ],
};
