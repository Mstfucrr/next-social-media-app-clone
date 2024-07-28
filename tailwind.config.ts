import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(240 5.9% 90%)',
        input: 'hsl(240 5.9% 90%)',
        ring: 'hsl(142.1 76.2% 36.3%)',
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(240 10% 3.9%)',
        primary: {
          DEFAULT: 'hsl(142.1 76.2% 36.3%)',
          foreground: 'hsl(355.7 100% 97.3%)'
        },
        secondary: {
          DEFAULT: 'hsl(240 4.8% 95.9%)',
          foreground: 'hsl(240 5.9% 10%)'
        },
        destructive: {
          DEFAULT: 'hsl(0 84.2% 60.2%)',
          foreground: 'hsl(0 0% 98%)'
        },
        muted: {
          DEFAULT: 'hsl(240 4.8% 95.9%)',
          foreground: 'hsl(240 3.8% 46.1%)'
        },
        accent: {
          DEFAULT: 'hsl(240 4.8% 95.9%)',
          foreground: 'hsl(240 5.9% 10%)'
        },
        popover: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(240 10% 3.9%)'
        },
        card: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(240 10% 3.9%)'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },

  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    ({ addUtilities }: { addUtilities: Function }) => {
      addUtilities({
        '.flex-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      })
    }
  ]
} satisfies Config

export default config
