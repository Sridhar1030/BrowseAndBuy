/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'ring': 'ring 0.5s ease-in-out',
      },
      keyframes: {
        ring: {
          '0%': { transform: 'translateX(-2px)' },
          '25%': { transform: 'translateX(2px)' },
          '50%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' },
          '100%': { transform: 'translateX(-2px)' },
        },
      },
    },
  },
  plugins: [],
};
