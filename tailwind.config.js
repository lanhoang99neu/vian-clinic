/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#fcf9f8',
          dim: '#dcd9d9',
          bright: '#fcf9f8',
          'container-lowest': '#ffffff',
          'container-low': '#f6f3f2',
          container: '#f0eded',
          'container-high': '#eae7e7',
          'container-highest': '#e4e2e1',
          tint: '#ae2f31',
          variant: '#e4e2e1',
        },
        'on-surface': {
          DEFAULT: '#1b1c1c',
          variant: '#58413f',
        },
        'inverse-surface': '#303030',
        'inverse-on-surface': '#f3f0f0',
        outline: {
          DEFAULT: '#8c706e',
          variant: '#e0bfbc',
        },
        primary: {
          DEFAULT: '#6f000e',
          container: '#921a20',
          fixed: '#ffdad7',
          'fixed-dim': '#ffb3ae',
        },
        'on-primary': {
          DEFAULT: '#ffffff',
          container: '#ffa29c',
          fixed: '#410005',
          'fixed-variant': '#8c151d',
        },
        'inverse-primary': '#ffb3ae',
        secondary: {
          DEFAULT: '#605e5b',
          container: '#e6e2dd',
          fixed: '#e6e2dd',
          'fixed-dim': '#c9c6c1',
        },
        'on-secondary': {
          DEFAULT: '#ffffff',
          container: '#666460',
          fixed: '#1c1c19',
          'fixed-variant': '#484743',
        },
        tertiary: {
          DEFAULT: '#735c00',
          container: '#cca830',
          fixed: '#ffe088',
          'fixed-dim': '#e9c349',
        },
        'on-tertiary': {
          DEFAULT: '#ffffff',
          container: '#4f3e00',
          fixed: '#241a00',
          'fixed-variant': '#574500',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        'on-error': {
          DEFAULT: '#ffffff',
          container: '#93000a',
        },
        background: '#fcf9f8',
        'on-background': '#1b1c1c',
      },
      fontFamily: {
        serif: ['"Noto Serif"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      spacing: {
        'unit': '8px',
        'container-max': '1200px',
        'gutter': '24px',
        'margin-mobile': '16px',
        'margin-desktop': '40px',
      },
      borderRadius: {
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px',
      }
    },
  },
  plugins: [],
}
