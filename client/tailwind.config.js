/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9fa',
          100: '#dcf0f3',
          200: '#bee2e8',
          300: '#91ced8',
          400: '#5cb3c3',
          500: '#3a97a9',
          600: '#2d7a8c',
          700: '#1b5b6a',
          800: '#0d5c75', // Deep Teal primary
          900: '#0a4b60', // Darker Teal
          950: '#042e3b'
        },
        emergency: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c'
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(13, 92, 117, 0.08)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 12px 30px -4px rgba(13, 92, 117, 0.12)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
