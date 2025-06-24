import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      // "light",
      {
        black: {
          "primary": "#1d9bf0", // Twitter blue
          "secondary": "#181818",
          "accent": "#373737",
          "neutral": "#1c1c1c",
          "base-100": "#000000",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272"
        },
      },
    ],
  },
};
