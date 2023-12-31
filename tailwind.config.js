/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

		"./imports/ui/**/*.{js,jsx,ts,tsx}",
		"./imports/ui/**/**/*.{js,jsx,ts,tsx}",
		"./imports/ui/**/*.html",
		"./imports/ui/**/**/*.html",
    "./client/*.html"

	],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#cccccc',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [

		require('@tailwindcss/forms')

	],
}
