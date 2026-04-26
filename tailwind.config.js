/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        campfire: {
          charcoal: '#1a1614',
          ember: '#ff5f1f',
          glow: '#ffbd3f',
          smoke: '#4a4440',
        },
      },
      boxShadow: {
        'fire': '0 0 20px 2px rgba(255, 95, 31, 0.3)',
      }
    },
  },
  plugins: [],
}