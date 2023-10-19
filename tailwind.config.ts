import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      maxHeight: {
        '0': '0',
        full: '100%',
      },
      transitionProperty: {
        'max-height': 'max-height',
      },
      transitionDuration: {
        '300': '0.3s',
      },
      transitionTimingFunction: {
        ease: 'ease',
      },
    },
    colors: {
      byzantium: '#820263',
      mardiGras: '#911e77',
      plum: '#a0398a',
      skyMagenta: '#bd70b1',
      palePurple: '#F8DEFF',
      lightPurple: '#FCEFFF',
      white: '#fff',
      black: '#000',
      blue: '#2ca5ff',
      darkBlue: '#2c3dd3',
    },
  },
  plugins: [],
};
export default config;
