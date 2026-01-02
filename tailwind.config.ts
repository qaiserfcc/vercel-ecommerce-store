import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FDB813', // Dark Yellow
          light: '#FDCC4D',
          dark: '#E5A50D',
        },
        secondary: {
          DEFAULT: '#87CEEB', // Sky Blue
          light: '#B0E0F6',
          dark: '#6BB6D8',
        },
        dark: {
          DEFAULT: '#2D2D2D', // Light Black
          light: '#3D3D3D',
          darker: '#1D1D1D',
        },
      },
    },
  },
  plugins: [],
}
export default config
