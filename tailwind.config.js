/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryDark': '#1F1F21',
        'primaryBrown': '#D6CEC3',
        'primaryGrey': '#8E8E93',
        'primaryPink': '#FFD3E0',
        'primaryBlue': '#5AC8FA',
        'primaryRed': '#FF3A2D',
        'primaryYellow': '#FFCC00',
      }
    },
  },
  plugins: [],
}

