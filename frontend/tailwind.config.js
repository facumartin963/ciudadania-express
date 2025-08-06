module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#005c99',
          600: '#004d82',
          700: '#003d6b'
        },
        success: {
          50: '#f0fdf4',
          500: '#28a745',
          600: '#22c55e'
        },
        danger: {
          50: '#fef2f2',
          500: '#dc3545',
          600: '#ef4444'
        },
        spanish: {
          red: '#c60b1e',
          yellow: '#ffc400'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}