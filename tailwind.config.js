// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // React component files
    './public/index.html',          // Any HTML files in your project
    './src/**/*.{html,js,jsx,ts,tsx}',  // If you have custom HTML or template files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
