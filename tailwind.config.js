/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#214268',
          200: '#000066',
        },

        gray: {
          50: '#7A7575',
          100: '#f9f9f9',
          200: '#f5f5f5',
          300: '#eeeeee',
          400: '#d9d9d9',
          500: '#7D7D7D',
          600: '#8c8c8c',
          700: '#414141',
          800: '#1f2937',
          900: '#292929',
        },
        black: {
          50: '#000000',
          100: '#332819',
        },
        yellow: {
          100: '#FEE500',
        },
        secondary: {
          100: '#B5CAE3',
          200: '#96ADD7',
        },
      },
      fontFamily: {
        pretendard: ['Pretendard', 'ui-sans-serif', 'system-ui'],
        montserrat: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
