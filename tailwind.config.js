/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          600: '#7c3aed',
          900: '#1e0a3c',
        }
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.10), 0 0 1px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}