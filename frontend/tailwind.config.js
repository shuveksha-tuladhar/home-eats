/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7AC943",
        "primary-dark": "#6bb839",
        base: "#F2F1FA",
        muted: "#767494",
        secondary: "#504F4F",
        "gray-line": "#EEEEEE",
      },
      boxShadow: {
        highlight:
          "0px 5px 10px rgba(122, 201, 67, 0.26), 0px 20px 40px rgba(122, 201, 67, 0.29)",
      },
    },
  },
  plugins: [],
};
