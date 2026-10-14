/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#08090c',
        card: '#11141b',
        'card-hover': '#161a24',
        'card-border': '#1e2433',
        accent: {
          DEFAULT: '#ff5500',
          hover: '#ff6a1a',
          muted: 'rgba(255, 85, 0, 0.15)',
          glow: 'rgba(255, 85, 0, 0.4)',
        },
        tactical: {
          dark: '#0b0d13',
          panel: '#131620',
          border: 'rgba(255, 255, 255, 0.08)',
          highlight: 'rgba(255, 85, 0, 0.25)',
          green: '#10b981',
          red: '#ef4444',
          yellow: '#f59e0b',
          blue: '#3b82f6',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', 'Inter', '"PingFang SC"', '"Hiragino Sans"', '"Noto Sans"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4.5s ease-in-out infinite',
        'float-fast': 'float 3.5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(0.8deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      },
      boxShadow: {
        'tactical-orange': '0 0 25px -5px rgba(255, 85, 0, 0.35)',
        'tactical-card': '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'tactical-active': '0 10px 35px -5px rgba(255, 85, 0, 0.25), inset 0 0 0 1px rgba(255, 85, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
