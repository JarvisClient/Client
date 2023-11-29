/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  "safelist": [
    { pattern: /bg-.*/, },
    { pattern: /font-.*/, },
    { pattern: /text-.*/, },
  ],
  theme: {
    extend: {
      colors: {
        // UI Colors
        'border': '#313133',
        'background-sidebar': '#0E0E0F',
        'background-view': '#171717',
        'background-card': '#212121',
        'background-card-selected': '#292929',
        'text-color': '#FFFFFF',
        'comment-color': '#B4B5B6',
        'icon-color': '#FFFFFF',
        'console-background': '#212121',
        'property-background': '#252525',
        'property-background-selected': '#2D2D2D',

        // Jenkins Colors
        'jenkins-job-green': '#00B589',
        'jenkins-job-red': '#f22c3d',
        'jenkins-job-orange': '#FD8E32',
        'jenkins-job-blue': '#4657CE',
        'jenkins-job-gray': '#939495',
      },
      class: {
        'big-sidebar': 'bg-red-200',
      }
    },
  },
  plugins: [],
}

