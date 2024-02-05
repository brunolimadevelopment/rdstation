import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      xs: '568px',
      sm: '767px',
      md: '1023px',
      lg: '1440px',
    },
    fontFamily: {
      darker: ['var(--font-darker-grotesque)', 'sans-serif'],
      nunito: ['var(--font-nunito)', 'sans-serif'],
      redhat: ['var(--font-red-hat)', 'sans-serif']
    },
    fontSize: {
      sm: ['0.75rem', '1.125rem'], // 12px | 18px
      base: ['1rem', { lineHeight: '1.5rem' }], // 16px | 24px
      lg: ['1.25rem', '1.75rem'], // 20px | 28px
      xl: ['2.5rem', '3.308rem'], // 40px | 52.92px
      '2xl': ['1.5rem', { lineHeight: '1.625rem' }],
    },
    extend: {
      colors: {
        'gray-light': '#636E7C',
        'gray-light-2x': '#E1E4E8',
        'gray-light-3x': '#D8D9FD',
        'gray-light-4x':  '#97A1AC',
        'gray-light-5x': '#97A1AC',
        'yellow': '#F2BF4E',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require("tailwindcss-animate"),
  ],
} satisfies Config

export default config