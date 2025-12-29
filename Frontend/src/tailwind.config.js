/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight-blue': '#0a0e17',
        'pastel-pink': '#ffb8d9',
        'pastel-lavender': '#d8b4fe',
        'pastel-purple': '#a78bfa',
        'golden-glow': '#ffd700',
        'golden-light': '#fff3b0',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'handwriting': ['"Dancing Script"', 'cursive'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 184, 217, 0.6)' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}