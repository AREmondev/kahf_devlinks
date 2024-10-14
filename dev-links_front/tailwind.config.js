/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // use root color here
        primary: "var(--primary)",
        background: "var(--background)",
        bgSecondary: "var(--bgSecondary)",
        text: {
          primary: "var(--text-primary)",
          dark: "var(--text-dark)",
          muted: "var(--text-muted)",
        },
      },
    },
  },
  plugins: [],

  darkMode: "class", // or 'class' if you want to toggle dark mode manually
  // darkMode: "media", // or 'class' if you want to toggle dark mode manually
};
