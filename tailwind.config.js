/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#282932",
        secondary: "#181A1E",
        background: "#1E1F23",
        accent: "#4b4bb4",
        lightAccent: "#6767c9",
        error: "#b91c1c",
        "primary-100": "#282932",
        "primary-200": "#23252B",
        "primary-300": "#1E1F23",
        "primary-400": "#181A1E",
        "accent-300": "#6767c9",
        "accent-400": "#4B4BB4",
        "fade-400": "#CBD5E1",
        "fade-500": "#595959",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      keyframes: {
        "show-notification": {
          "65%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(-6px)" },
        },
        "hide-notification": {
          "20%": { transform: "translateY(60px)" },
          "70%": { transform: "translateY(-200px)" },
          "100%": { opacity: "0%" },
        },
        "start-progressbar": {
          "0%": { width: "0px" },
          "100%": { width: "100%" },
        },
        "button-clicked": {
          "80%, 100%": { width: "20%" },
        },
        shake: {
          "0%": { marginLeft: "0rem" },
          "25%": { marginLeft: "0.5rem" },
          "75%": { marginLeft: "-0.5rem" },
          "100%": { marginLeft: "0rem" },
        },
        "fancy-button": {
          "0%": { opacity: 0 },
          "25%": { opacity: 0.5 },
          "50%": { opacity: 1 },
          "75%": { opacity: 0.5 },
          "100%": { opacity: 0 },
        },
        "animated-underline": {
          "0%": { left: "0", width: "0%" },
          "50%": { left: "0", width: "100%" },
          "51%": { left: "auto" },
          "100%": { right: "0", width: "0%" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "translate-up": {
          "0%": { transform: "translateY(5px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        "show-notification": "show-notification .4s ease forwards",
        "hide-notification": "hide-notification .7s ease forwards",
        "start-progressbar": "start-progressbar 10s linear forwards",
        "button-clicked": "button-clicked 400ms linear forwards",
        "fancy-button": "fancy-button 1200ms ease-in forwards",
        "animated-underline": "animated-underline 3000ms ease infinite",
        shake: "shake 0.2s ease-in-out 0s 2",
        "fade-in": "fade-in .7s ease-in forwards",
        "translate-up": "translate-up .3s ease-in forwards",
      },
    },
  },
  plugins: [],
};
