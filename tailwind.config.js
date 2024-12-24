/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/Components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
