/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'dancing': ['Dancing Script', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
        'lora': ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
};
