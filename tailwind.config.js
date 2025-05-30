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
              300: "#F3F3F3",
              500: "#D9D9D9",
              900: "#9D9D9D",
            }
          }
        },
      },
      plugins: [],
    }