/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#f49d25',
        'background-light': '#f8f7f5',
        'background-dark': '#221a10',
        'midnight': '#1e293b',
        'industrial': '#f49d25',
      },
      fontFamily: {
        'display': ['Lexend', 'sans-serif'],
      },
      borderRadius: {
        'DEFAULT': '0.5rem',
        'lg': '1rem',
        'xl': '1.5rem',
        'full': '9999px',
      },
      animation: {
        'vibrate': 'vibrate 0.3s cubic-bezier(0.36, 0, 0.66, 1) infinite',
        'pulse-glow': 'pulse-glow 0.6s ease-in-out',
      },
      keyframes: {
        vibrate: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 0 0 rgba(244, 157, 37, 0.7)' },
          '70%': { boxShadow: '0 0 0 20px rgba(244, 157, 37, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(244, 157, 37, 0)' },
        },
      },
    },
  },
  plugins: [],
}
