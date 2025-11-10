/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#386641',
          700: '#6A994E',
          500: '#A7C957',
        },
        sand: {
          DEFAULT: '#fcfff4ff',
          strong: '#6A994E',
          ink: '#254e2c',
        },
        ink: {
          DEFAULT: '#1b1b1b',
        },
        error: '#d14343',
      },
    },
  },
  plugins: [],
}
