/** @type {import('tailwindcss').Config} */
export default {
  content: ["./client/index.html", "./client/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F6F2E9",
        sand: "#E9E1D0",
        stone: "#CFC6B1",
        ink: "#1B201A",
        moss: "#38402F",
        gold: "#B89A62",
        goldDeep: "#7C6234",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
