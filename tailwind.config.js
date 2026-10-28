/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        pearl: { 50: "#FFFAFB", 100: "#FDF1F4", 200: "#F9E2E8", 300: "#F3CFD8" },
        nude: { 100: "#FBE7EC", 200: "#F6D3DB", 300: "#EEB8C5", 400: "#E09AAC" },
        rose: { gold: "#D98C9F", deep: "#B04F69" },
        ink: { DEFAULT: "#40242E", soft: "#6E4A57", mute: "#A58591" },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
        sans: ["var(--font-sans)", "Montserrat", "system-ui", "sans-serif"],
      },
      letterSpacing: { wider2: "0.18em", widest2: "0.32em" },
      backdropBlur: { glass: "20px", "glass-lg": "28px" },
      boxShadow: {
        glass:
          "0 24px 60px -24px rgba(150,62,90,0.35), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(255,255,255,0.12)",
        "glass-lg":
          "0 40px 90px -30px rgba(150,62,90,0.42), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.15)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: { float: "float 5s ease-in-out infinite" },
    },
  },
  plugins: [],
};
