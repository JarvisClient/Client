/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // UI Colors
        'border': '#313133',
        'background-sidebar': '#17181B',
        'background-view': '#1C1E21',
        'background-card': '#28292B',
        'background-card-selected': '#313335',
        'text-color': '#FFFFFF',
        'comment-color': '#B4B5B6',
        'icon-color': '#FFFFFF',
        'console-background': '#232628',

        // Jenkins Colors
        'jenkins-job-green': '#84FFB3',
        'jenkins-job-red': '#f22c3d',
        'jenkins-job-orange': '#fe942e',
        'jenkins-job-blue': '#84DBFF',
        'jenkins-job-gray': '#939495',
      },
      class: {
        'big-sidebar': 'bg-red-200',
      }
    },
  },
  plugins: [],
}

