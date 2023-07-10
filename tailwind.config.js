/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "header-drawer": "url('/images/bg-menu-min-1.webp')"
      },
      colors: {
        primary: "#293338",
        secondary: "#313E44",
        teal: "#62CAC2",
        "teal-hover": "#76DAD3",
        // "teal-active": "#76DAD3",
        link: "#62CAC2"
      },
      fontFamily: {
        primary: ['"Roboto"', "serif"],
        secondary: ['"Playfair Display"', "serif"]
      },
      boxShadow: {
        sm: "0 8px 10px rgba(0,0,0,.25)",
        md: "0 8px 20px rgba(0,0,0,.25)",
        lg: "0 8px 30px rgba(0,0,0,.25)"
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "10px",
        lg: "16px",
        xl: "24px"
      },
      // screens: {
      //   mobileMx: '639px',
      //   // ...defaultTheme.screens
      // }
      screens: {
        maxMobile: { max: "639px" },
        maxTablet: {max: "767px"},
        maxDesktop: { max: "1400px" },
        ...defaultTheme.screens
      }
    },
  },
  plugins: []
}
