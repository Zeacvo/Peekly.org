/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#000000',
          card: '#090909',
          border: '#1A1A1F',
          text: '#FFFFFF',
          muted: '#929292',
          accent: '#FF5500',
        },
        background: '#000000',
        card: '#090909',
        'card-hover': '#111114',
        'card-border': '#1A1A1F',
        accent: {
          DEFAULT: '#FF5500',
          hover: '#FF6A1A',
          muted: 'rgba(255, 85, 0, 0.15)',
          glow: 'rgba(255, 85, 0, 0.4)',
        },
      },
      fontFamily: {
        mono: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', '"SF Pro"', 'sans-serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', '"SF Pro"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4.5s ease-in-out infinite',
        'float-fast': 'float 3.5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(0.8deg)' },
        },
      },
      boxShadow: {
        'brand-orange': '0 0 25px -5px rgba(255, 85, 0, 0.35)',
        'brand-card': '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'brand-active': '0 10px 35px -5px rgba(255, 85, 0, 0.25), inset 0 0 0 1px rgba(255, 85, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
