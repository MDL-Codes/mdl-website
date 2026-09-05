/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // One palette, from Figma variables. `navy` is Figma's navy/base.
        navy: '#2B3455',
        'navy-950': '#12162B',
        'navy-900': '#1B2140',
        'navy-800': '#232B4D',
        'navy-600': '#465184',
        'navy-400': '#7883AB',
        'navy-200': '#B7BEDB',
        paper: '#F6F4EE',
        'paper-dim': '#ECE9DF',
        redline: '#C0392B',
      },
      fontFamily: {
        mono: ['"Courier New"', 'Courier', 'monospace'],
        plex: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        display: ['Roboto', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
      },
    },
  },
  plugins: [],
}
