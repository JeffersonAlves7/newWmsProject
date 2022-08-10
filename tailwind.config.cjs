/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wmsPink: '#c171f2',
        wmsLightPink: '#cf8ff5',
        wmsPurple: '#61377a',
        wmsGrey: '#d4d4d4',
        wmsBlack: "#4B4848"
      },
      fontFamily: {
        serif: ['Abhaya Libre', 'serif']
      }
    },
  },
  plugins: [],
}
