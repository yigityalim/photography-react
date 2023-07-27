/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.ts.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E1E1E',
        'secondary': '#2E2E2E',
        'tertiary': '#3E3E3E',
        'brand': '#FFD700',
      }
    },
  },
  plugins: [],
}

