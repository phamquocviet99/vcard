/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      "2xs": "279px",
      xs: "360px",
      ns: "400px",
      "2ns": "500px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      "3xl": "1824px",
      "4xl": "2536px",
      // => @media (min-width: 1536px) { ... }
      //Samsung Custom Screen
    },
  },
  plugins: [],
};
