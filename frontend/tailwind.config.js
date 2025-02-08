/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      
vio:{default:'rgba(203, 30, 219, 0.85)',},
fontFamily: {
  roboto: ['Roboto', 'sans-serif'], 
},

    },
  },
  plugins: [],
};


