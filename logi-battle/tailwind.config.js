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
        'primary': '#f4b942',
        'background-light': '#f7f3ec',
        'background-dark': '#17314a',
        'midnight': '#17314a',
        'industrial': '#f4b942',
        'geronimo-marine': '#17314a',
        'geronimo-or': '#f4b942',
        'geronimo-creme': '#f7f3ec',
        'geronimo-sage': '#7fa99b',
        'geronimo-coral': '#e87a5d',
        'geronimo-prune': '#6b5b8a',
      },
      fontFamily: {
        'display': ['Fraunces', 'serif'],
        'sans': ['Figtree', 'sans-serif'],
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
          '0%': { boxShadow: '0 0 0 0 rgba(244, 185, 66, 0.7)' },
          '70%': { boxShadow: '0 0 0 20px rgba(244, 185, 66, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(244, 157, 37, 0)' },
        },
      },
    },
  },
  plugins: [],
}
