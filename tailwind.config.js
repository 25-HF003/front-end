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
              300: "#01261F"
            },
            'gray': {
              50: "#F0F0F0",
              300: "#F3F3F3",
              500: "#D9D9D9",
              900: "#9D9D9D",
            },
            'red': {
              100: "#FF0000",
            },
            'blue': {
              100: "#e3f2fd"
            },
          }
        },
      },
      plugins: [],
    }