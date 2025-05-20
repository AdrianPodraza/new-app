import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', 'dark'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          500: '#98908B',
          100: '#F8F4F0',
        },
        grey: {
          900: '#201F24',
          500: '#696868',
          300: '#B3B3B3',
          100: '#F2F2F2',
        },
        green: {
          100: '#277C78',
        },
        yellow: {
          100: '#F2CDAC',
        },
        purple: {
          100: '#826CB0',
          200: '#AF81BA',
        },
        cyan: {
          500: '#82C9D7',
        },
        navy: {
          500: '#626070',
        },
        red: {
          500: '#C94736',
        },
        turquoise: {
          500: '#597C7C',
        },
        brown: {
          500: '#93674F',
        },
        magenta: {
          500: '#934F6F',
        },
        blue: {
          500: '#3F82B2',
        },
        navyGrey: {
          500: '#97A0AC',
        },
        armyGreen: {
          500: '#7F9161',
        },
        gold: {
          500: '#CAB361',
        },
        orange: {
          500: '#BE6C49',
        },
      },
    },
  },

  plugins: [],
}

export default config
