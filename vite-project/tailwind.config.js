/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        purple:{
          300 : "#DEE8FE",
          500 :"#7C71DE",
          600:"#4941b5",
        },
        gray:{
          300:"#F7F8FA"
        }
      }
    },
  },
  plugins: [],
}

