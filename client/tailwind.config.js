/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      },
      height: {
        '10p': '10%',
        '20p': '20%',
        '30p': '30%',
        '40p': '40%',
        '50p': '50%',
        '60p': '60%',
        '70p': '70%',
        '75p': '75%',
        '80p': '80%',
        '90p': '90%',
        '100p': '100%',
      },
      width: {
        '10p': '10%',
        '20p': '20%',
        '30p': '30%',
        '40p': '40%',
        '50p': '50%',
        '60p': '60%',
        '70p': '70%',
        '75p': '75%',
        '80p': '80%',
        '90p': '90%',
        '100p': '100%',
      },
      gap: {
        '10p': '10%',
        '20p': '20%',
        '30p': '30%',
        '40p': '40%',
        '50p': '50%',
        '60p': '60%',
        '70p': '70%',
        '75p': '75%',
        '80p': '80%',
        '90p': '90%',
        '100p': '100%',
      },
      backgroundImage: {
        'delete-icon': "url('assets/trash-icon.svg')",
        'edit-icon': "url('assets/edit-icon.svg')",
        'info-icon': "url('assets/info-icon.svg')",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',  // IE and Edge
          'scrollbar-width': 'none',     // Firefox
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',  // Chrome, Safari, and Opera
        },
        '.scrollbar-thin::-webkit-scrollbar': {
          width: '8px',
        },
        '.scrollbar-thin::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          'border-radius': '10px',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          background: '#888',
          'border-radius': '10px',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
      }, ['responsive', 'hover']);
    },
  ],
}
