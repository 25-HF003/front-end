/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}",],
      theme: {
        extend: {
          colors: {
            'white': {
              100: "#FFFFFF",
              200: "#F2F2F2"
            },
            'black': {
              100: "#000000",
              200: "#00060D"
            },
            'green': {
              100: "#50F296",
              200: "#0AA689",
              300: "#01261F",
              400: "#22C55E",
            },
            'gray': {
              50: "#F0F0F0",
              300: "#F3F3F3",
              400: "#6B7280",
              500: "#D9D9D9",
              600: "#4B5563",
              800: "#1F2937",
              900: "#9D9D9D",
            },
            'red': {
              100: "#FF0000",
              200: "#EF4444"
            },
            'orange': {
              100: "#FB923C"
            },
            'blue': {
              100: "#e3f2fd"
            },
          },
          animation: {
            'fade-in': 'fadeIn 3s ease-in-out forwards',
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: 0, transform: 'translateY(20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            }
          },
        },
      },
      plugins: [],
    }