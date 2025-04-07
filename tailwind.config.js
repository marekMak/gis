import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        baseBlue: "#3645B2",
        baseBlueDarker: "#182891",
        baseYellow: "#FFE100",
        baseYellowDarker: "#dbbe04",
        baseRed: "#ea5156",
      },
      fontFamily: {
        kamerik: ["Kamerik", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
};
