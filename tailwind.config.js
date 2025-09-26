/** @type {import('tailwindcss').Config} */
export default {
  // content: ["./src/**/*.{js,ts,jsx,tsx}"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        ternary: "var(--color-ternary)",
        primary_2: "var(--color-primary_2)",
        primary_3: "var(--color-primary_3)",
        primary_4: "var(--color-primary_4)",
        secondary_2: "var(--color-secondary_2)",
      },
      screens: {
        "max-xl": { max: "1329px" }, // equivalent to max-width: 1329px
        "max-lg": { max: "1023px" }, // equivalent to max-width: 1023px
        "max-md": { max: "767px" }, // equivalent to max-width: 767px
        "max-sm": { max: "641px" }, // equivalent to max-width: 639px
        "max-xs": { max: "425px" }, // equivalent to max-width: 425px
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        /* width/height of scrollbar */
        ".custom-scrollbar::-webkit-scrollbar": {
          width: "8px",
          height: "1px",
        },
        /* Track (background) */
        ".custom-scrollbar::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        /* Thumb (scroll handle) */
        ".custom-scrollbar::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "9999px",
        },
        /* Thumb on hover */
        ".custom-scrollbar::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      });
    },
  ],
};
