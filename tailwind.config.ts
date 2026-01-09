import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        quest: {
          purple: {
            DEFAULT: '#4A148C',
            50: '#E8D5F9',
            100: '#D4B5F4',
            200: '#AD76EA',
            300: '#8637E0',
            400: '#6318BD',
            500: '#4A148C',
            600: '#3B1070',
            700: '#2C0C54',
            800: '#1D0838',
            900: '#0E041C',
          },
          gold: {
            DEFAULT: '#FFC107',
            50: '#FFF8E1',
            100: '#FFECB3',
            200: '#FFE082',
            300: '#FFD54F',
            400: '#FFCA28',
            500: '#FFC107',
            600: '#FFB300',
            700: '#FFA000',
            800: '#FF8F00',
            900: '#FF6F00',
          },
          dark: '#1A1A1A',
          charcoal: '#2C2C2C',
          cream: '#F5F5DC',
        },
      },
      fontFamily: {
        fantasy: ['Cinzel', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'quest-gradient': 'linear-gradient(135deg, #4A148C 0%, #1A1A1A 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #FFC107 0%, #FFE082 50%, #FFC107 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-gold': 'pulseGold 2s infinite',
        shimmer: 'shimmer 2s infinite linear',
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
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 193, 7, 0.4)' },
          '50%': { boxShadow: '0 0 20px 10px rgba(255, 193, 7, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(255, 193, 7, 0.3)',
        'purple-glow': '0 0 20px rgba(74, 20, 140, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
