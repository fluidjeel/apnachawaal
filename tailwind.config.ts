import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#F7F7EE",
        ink: "#292919",
        clay: "#C47A5A",
        sage: "#7C8573",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
