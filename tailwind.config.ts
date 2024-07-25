import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        '112': '28rem',  // 448px
        '128': '32rem',  // 512px
        '144': '36rem',  // 576px
        '160': '40rem',  // 640px
        '176': '44rem',  // 704px
        '192': '48rem',  // 768px
        '208': '52rem',  // 832px
        '224': '56rem',  // 896px
        '240': '60rem',  // 960px
        '256': '64rem',  // 1024px
        '272': '68rem',  // 1088px
        '288': '72rem',  // 1152px
        '304': '76rem',  // 1216px
        '320': '80rem',  // 1280px
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
