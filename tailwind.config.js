/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "410px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        lato: '"Lato", sans-serif',
        rubik: '"Rubik Scribble", system-ui',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#2196F3",
          secondary: "teal",
          ".navbarr": {
            "background-color": "#e0dede",
          },

          "--swiper-navigation-color": "#2196F3",
          "--swiper-pagination-color": "#2196F3",
          "--swiper-auto-count-color": "rgb(229 231 235)",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "green",
          secondary: "teal",
          ".navbarr": {
            "background-color": "#242323",
          },

          "--swiper-navigation-color": "green",
          "--swiper-pagination-color": "green",
          "--swiper-auto-count-color": "rgb(229 231 235)",
        },
      },
    ],
  },
};
