/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-teal": "rgb(1 68 81 / 1)",
        "light-white": "rgba(255,255,255,0.18)",
        "highlight": "#38b2ac"
      }
    },
  },
  plugins: [
    // require('flowbite/plugin')
  ],
}
