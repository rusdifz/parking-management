/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
      },
    },
  },
  plugins: [],
};

// module.exports = {
//   content: [
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   // ... rest of the config
// };
