/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
  ],
  theme: {
    extend: {
      maxHeight: {
        '96': '24rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 