import type { Config } from 'tailwindcss'

// C&E Advisory brand palette — navy blue (primary), gold (accent), cream (surface).
// `forest` is kept as an alias of `navy` and `moss` as an alias of `gold` so that
// the many existing className references continue to resolve to the new brand colours.
const navy = {
  50: '#eef3fa',
  100: '#d6e2f2',
  200: '#aec6e4',
  300: '#7ba2d1',
  400: '#4d7cb8',
  500: '#305d99',
  600: '#24497c',
  700: '#1d3a63',
  800: '#182f4f',
  900: '#122340',
  950: '#0a1526',
}

const gold = {
  50: '#fdf8ec',
  100: '#f9edc7',
  200: '#f1d98a',
  300: '#e7c153',
  400: '#dcaa30',
  500: '#c28f22',
  600: '#a3741d',
  700: '#7f581b',
  800: '#69481b',
  900: '#5a3d1a',
  950: '#38260f',
}

const cream = {
  50: '#fdfcf8',
  100: '#f8f4ea',
  200: '#f0e8d6',
  300: '#e5d7ba',
  400: '#d5be92',
  500: '#c4a56c',
  600: '#b28f57',
  700: '#94744a',
  800: '#775f41',
  900: '#624e39',
}

const ink = {
  50: '#f5f7fa',
  100: '#e7eaf0',
  200: '#ccd2de',
  300: '#a6b0c2',
  400: '#7c889f',
  500: '#5d6a82',
  600: '#48546a',
  700: '#3b4557',
  800: '#2a303d',
  900: '#1e2430',
  950: '#0b0f17',
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy,
        gold,
        cream,
        ink,
        // Backwards-compatible aliases used throughout the existing components.
        forest: navy,
        moss: gold,
        signal: {
          amber: {
            50: '#fffbeb',
            100: '#fef3c7',
            500: '#f59e0b',
            700: '#b45309',
          },
          red: {
            50: '#fef2f2',
            100: '#fee2e2',
            500: '#ef4444',
            700: '#b91c1c',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(10, 21, 38, 0.05)',
        md: '0 4px 6px -1px rgba(10, 21, 38, 0.1), 0 2px 4px -1px rgba(10, 21, 38, 0.06)',
        lg: '0 10px 15px -3px rgba(10, 21, 38, 0.1), 0 4px 6px -2px rgba(10, 21, 38, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
