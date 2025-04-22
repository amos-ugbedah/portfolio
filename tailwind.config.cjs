// tailwind.config.js
module.exports = {
  darkMode: 'class', // optional, depending on your dark mode handling
  content: [
    "./index.html",  // this ensures Tailwind will process your HTML
    "./src/**/*.{js,ts,jsx,tsx}", // <-- very important, make sure this matches where you're using Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
