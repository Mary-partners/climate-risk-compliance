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
        forest: {
          50: '#f1f7f3',
          100: '#dfeee5',
          200: '#c1ddcc',
          300: '#97c5a7',
          400: '#68a57d',
          500: '#47895f',
          600: '#356d4a',
          700: '#2a573c',
          800: '#234631',
          900: '#1d3a29',
          950: '#0d1f14',
        },
        moss: {
          50: '#f4f6f3',
          100: '#e6ebe3',
          200: '#cdd7c9',
          300: '#aabca4',
          400: '#849c7d',
          500: '#66805f',
          600: '#4f654a',
          700: '#3f503c',
          800: '#354133',
          900: '#2d372d',
        },
        cream: {
          50: '#fdfcfa',
          100: '#f7f4ec',
          200: '#ede7d5',
          300: '#e1d5b4',
          400: '#d0bb8a',
          500: '#c2a56a',
          600: '#b5905d',
          700: '#97754e',
          800: '#7a5f44',
          900: '#644f3a',
        },
        ink: {
          50: '#f6f7f6',
          100: '#e2e4e3',
          200: '#c4c9c6',
          300: '#9fa6a1',
          400: '#7a847f',
          500: '#606a65',
          600: '#4c5450',
          700: '#3f4542',
          800: '#353a37',
          900: '#2e3230',
          950: '#0a0f0c',
        },
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
        sm: '0 1px 2px 0 rgba(10, 15, 12, 0.05)',
        md: '0 4px 6px -1px rgba(10, 15, 12, 0.1), 0 2px 4px -1px rgba(10, 15, 12, 0.06)',
        lg: '0 10px 15px -3px rgba(10, 15, 12, 0.1), 0 4px 6px -2px rgba(10, 15, 12, 0.05)',
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
