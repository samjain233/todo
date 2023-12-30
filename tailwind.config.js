/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple1: 'rgba(229, 228, 255, 1)',
        gray1: 'rgba(115, 115, 116, 1)',
        purple2: 'rgba(172, 167, 213, 1)',
      },
    },
  },
  plugins: [],
}