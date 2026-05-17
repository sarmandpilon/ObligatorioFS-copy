/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eefaff',
          100: '#d8f2ff',
          200: '#b0e9ff',
          300: '#78daff',
          400: '#38c3f9',
          500: '#0ea8e6',
          600: '#0286c3',
          700: '#036c9e',
          800: '#075b82',
          900: '#0c4c6d',
          950: '#08314a',
        },
        surface: {
          900: '#0b0f1a',
          800: '#111827',
          700: '#1a2235',
          600: '#1e2a3d',
          500: '#253046',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
