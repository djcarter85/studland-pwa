import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      teal: colors.teal,
      sky: colors.sky,
      violet: colors.violet,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      gray: {
        "50": "#f5f6f6",
        "100": "#e4e9e8",
        "200": "#ccd5d4",
        "300": "#a8b8b7",
        "400": "#7d9392",
        "500": "#5c706f",
        "600": "#546666",
        "700": "#485656",
        "800": "#404a4a",
        "900": "#393f40",
        "950": "#232829",
      },
    },
    rotate: {
      N: "0turn",
      NNE: "0.0625turn",
      NE: "0.125turn",
      ENE: "0.1875turn",
      E: "0.25turn",
      ESE: "0.3125turn",
      SE: "0.375turn",
      SSE: "0.4375turn",
      S: "0.5turn",
      SSW: "0.5625turn",
      SW: "0.625turn",
      WSW: "0.6875turn",
      W: "0.75turn",
      WNW: "0.8125turn",
      NW: "0.875turn",
      NNW: "0.9375turn",
    },
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        pwa: { raw: "(display-mode: standalone)" },
      },
    },
  },
  plugins: [require("tailwindcss-safe-area")],
};
export default config;
