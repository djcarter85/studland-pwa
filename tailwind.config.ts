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

