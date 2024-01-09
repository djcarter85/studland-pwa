import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      teal: colors.teal,
      sky: colors.sky,
      violet: colors.violet,
      orange: colors.orange,
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
      screens: {
        pwa: { raw: "(display-mode: standalone)" },
      },
    },
  },
  plugins: [require("tailwindcss-safe-area")],
};
export default config;
