/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lokatrack: {
          primary: '#306424', // Main LokaTrack green color
          light: '#4a7d3a',
          dark: '#254d1c',
          50: '#E9F6E5', // Light green background from mobile app
          100: '#d8e6cf',
          200: '#b6d2a7',
          300: '#91bb7e',
          400: '#6ca456',
          500: '#4d8d39',
          600: '#397028',
          700: '#306424', // Original color
          800: '#254d1c',
          900: '#1a3613',
        },
        dashboard: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          pink: '#ec4899',
          orange: '#f97316',
          yellow: '#eab308',
          teal: '#14b8a6',
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'lokatrack': '0 4px 15px rgba(0, 0, 0, 0.05)',
        'lokatrack-hover': '0 8px 25px rgba(0, 0, 0, 0.1)',
        'card': '0 2px 15px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 30px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'lokatrack': '1rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      backdropBlur: {
        'xs': '2px',
      },
      gridTemplateColumns: {
        'auto-fill-cards': 'repeat(auto-fill, minmax(280px, 1fr))',
      },
    },
  },
  plugins: [],
}