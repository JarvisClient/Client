const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        // UI Colors
        'border': '#313133',
        'background-sidebar': '#17181B',
        'background-view': '#171717',
        'background-card': '#28292B',
        'background-card-selected': '#313335',
        'text-color': '#FFFFFF',
        'comment-color': '#B4B5B6',
        'icon-color': '#FFFFFF',
        'console-background': '#232628',
        "badge-background": "#17181B",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          primary: {
            DEFAULT: "#17181B",
            foreground: "#000000",
          },
        },
      }
    }
  })]
}

