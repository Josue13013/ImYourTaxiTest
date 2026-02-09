/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class', // Activar dark mode
  theme: {
    extend: {
      colors: {
        // === FONDOS (Oscuros) ===
        bg: {
          primary: '#0A0A0A',      // Negro profundo
          secondary: '#1A1A1A',    // Negro carbón
          tertiary: '#2D2D2D',     // Gris pizarra
          elevated: '#1E1E1E',     // Gris grafito
        },

        // === ACENTOS (Azules) ===
        primary: {
          50: '#E8F4F8',
          100: '#D1E9F1',
          200: '#A3D3E3',
          300: '#5BA3D0', // Tu azul principal
          400: '#4A8AB8',
          500: '#3A6F96', // Base para bordes/textos
          600: '#2A5474',
          700: '#1E3A5F', // Tu azul oscuro
          800: '#152945',
          900: '#0C1A2B',
        },
        accent: {
          50: '#FAF7F3',
          100: '#F5EFE7',
          200: '#EBE0CF',
          300: '#E8D5B5',
          400: '#E0C89D',
          500: '#D2B485', // Tu dorado
          600: '#C4A06D',
          700: '#B68C55',
        },
        teal: '#1A4D4D',

        // === TEXTO (Claros) ===
        text: {
          primary: '#F5F5DC',      // Crema elegante
          secondary: '#C0C0C0',    // Plata
          muted: '#808080',        // Gris medio
          accent: '#B8B8B8',       // Gris plata
          dark: '#1A1A1A',         // Para fondos claros
        },

        // === ESTADOS ===
        success: '#0E4D3A',          // Verde oscuro
        warning: '#8B6914',          // Amarillo oscuro
        error: '#8B0000',            // Rojo oscuro
        info: '#1E3A5F',             // Azul medianoche
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        scroll: 'scroll 40s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'blue-sm': '0 4px 6px -1px rgba(91, 163, 208, 0.1), 0 2px 4px -1px rgba(91, 163, 208, 0.06)',
        'glow-primary': '0 0 20px rgba(91, 163, 208, 0.5)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}