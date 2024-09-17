/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#75e7db' }, // Your secondary color
        },
      },
      animation: {
        blink: 'blink 1s infinite', // Adjust the duration as needed
      },
    },
  },
  plugins: [],
}

