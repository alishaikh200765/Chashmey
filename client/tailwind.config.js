/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0F1B2B",   // deep navy — logo mark, CTAs, prices, active nav state
          gold: "#B8912F",      // premium gold accent — "Premium" badge, highlights
          dark: "#0A0C10",      // footer background, near-black
          cream: "#F5F0E6",     // warm ivory section backgrounds
          green: "#1F5D4B",     // "New" badge — deep emerald
          blue: "#33506B",      // "Hot selling" / "Polarized" badge — steel navy
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
