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
        'darkRed': '#1A0E0F', // Extremely dark red
        'darkRedHover': '#241416', // Slightly lighter dark red for hover
        'darkKickGreen': '#0E1A0F', // Extremely dark green
        'darkKickGreenHover': '#162418', // Slightly lighter dark green for hover
        'section-bg-pattern': '#1A1A1A', // Dark background pattern color
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
        'glow': 'glowAnimation 1s ease-in-out infinite',
      },
      keyframes: {
        gradientShift: {
          '0%': { 'background-position': '0% 50%' },
          '100%': { 'background-position': '200% 50%' },
        },
        glowAnimation: {
          '0%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '100%': { opacity: '0.7', transform: 'scale(1)' },
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
