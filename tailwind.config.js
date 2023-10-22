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
      },
      fontFamily: {
        body: ["Poppins", "sans-serif"],
        heading: ["Inter", "sans-serif"],
      },
      keyframes: {
        "show-notification": {
          "65%": { transform: "translateY(-256px)" },
          "100%": { transform: "translateY(-248px)" },
        },
        "hide-notification": {
          "0%": { transform: "translateY(-248px)" },
          "5%": { transform: "translateY(-256px)" },
          "70%": { transform: "translateY(256px)" },
          "100%": { opacity: "0%" },
        },
        "start-progressbar": {
          "0%": { width: "0px" },
          "100%": { width: "100%" },
        },
        "button-clicked": {
          "80%, 100%": { width: "15%" },
        },
      },
      animation: {
        "show-notification": "show-notification .7s ease forwards",
        "hide-notification": "hide-notification 1.25s ease forwards",
        "start-progressbar": "start-progressbar 5s linear forwards",
        "button-clicked": "button-clicked 400ms linear forwards",
      },
    },
  },
  plugins: [],
};
