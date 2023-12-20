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
      },
      fontFamily: {
        body: ["Poppins", "sans-serif"],
        heading: ["Inter", "sans-serif"],
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
      },
      animation: {
        "show-notification": "show-notification .4s ease forwards",
        "hide-notification": "hide-notification .7s ease forwards",
        "start-progressbar": "start-progressbar 10s linear forwards",
        "button-clicked": "button-clicked 400ms linear forwards",
        shake: "shake 0.2s ease-in-out 0s 2",
      },
    },
  },
  plugins: [],
};
