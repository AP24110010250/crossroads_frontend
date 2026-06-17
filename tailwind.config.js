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
          red: '#A21C26',      // Royal Crimson Red (Appetizing & Luxury)
          brown: '#2A1A12',    // Deep Espresso Brown (Text & Primary)
          gold: '#B58E3D',     // Antique Brass Gold (Metal Highlights)
          beige: '#F3EDE0',    // Silk Sand (Secondary Background)
          lightBg: '#FAF6EE',  // Ivory Champagne (Primary Background)
          text: '#2A1A12',     // Text color alias
          muted: '#5C4A42',    // Muted Espresso Text
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        telugu: ['NTR', 'sans-serif'], // Authentic Telugu accent font
      },
      fontSize: {
        // clamp(6rem, 10vw, 11rem) for massive luxury hero branding
        'hero': 'clamp(6rem, 10vw, 11rem)',
        'subheadline': 'clamp(1.25rem, 2.5vw, 1.75rem)',
      },
      animation: {
        'steam': 'steam 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        steam: {
          '0%, 100%': { transform: 'translateY(0) scaleX(1) opacity(0.3)' },
          '50%': { transform: 'translateY(-10px) scaleX(1.1) opacity(0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(181, 142, 61, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(181, 142, 61, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
