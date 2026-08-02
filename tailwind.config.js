/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Trail Atlas palette — a topographic-map identity rather than a generic
        // cream/terracotta theme. Pine + tan carry the brand; clay is reserved
        // for small "completed" accents so it never competes with the primary hue.
        pine: {
          DEFAULT: '#1F3A2E',
          50: '#EAF0EC',
          100: '#CBDBD1',
          300: '#6E937E',
          500: '#3A6350',
          700: '#1F3A2E',
          900: '#122219',
        },
        moss: {
          DEFAULT: '#4B7455',
          400: '#6B9276',
          500: '#4B7455',
          600: '#3B5D43',
        },
        tan: {
          DEFAULT: '#D9C9A3',
          50: '#FAF7F0',
          100: '#F2EAD8',
          300: '#D9C9A3',
          500: '#B9A374',
        },
        summit: {
          DEFAULT: '#F5F1E6',
        },
        sky: {
          DEFAULT: '#6E97A6',
          600: '#4F7885',
        },
        clay: {
          DEFAULT: '#B5562A',
          600: '#94441F',
        },
        ink: '#1C2420',
      },
      fontFamily: {
        display: ['"Fjalla One"', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        contours: "url(\"/contour-texture.svg\")",
      },
      boxShadow: {
        card: '0 2px 8px rgba(28, 36, 32, 0.06), 0 1px 2px rgba(28, 36, 32, 0.04)',
        'card-hover': '0 12px 24px rgba(28, 36, 32, 0.12), 0 4px 8px rgba(28, 36, 32, 0.06)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
