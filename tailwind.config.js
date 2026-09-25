/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAF8F4',
          dim: '#F1EEE6',
        },
        forest: {
          900: '#0F2A20',
          700: '#1B4332',
          600: '#2D6A4F',
        },
        sage: {
          300: '#9FD8B6',
          100: '#E4F3EA',
        },
        charcoal: '#1C1E1B',
        coral: '#E0693F',
        amberColor: '#D98E33',
        lineColor: 'rgba(28,30,27,0.10)',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
