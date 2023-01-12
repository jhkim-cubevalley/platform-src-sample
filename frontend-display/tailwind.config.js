/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        tempItemBg1: "url('/images/bg1.png')",
        socialKakao: "url('/images/tmp/kakao.png')",
        gridTemp: "url('/images/tmp/gridTemp.png')",
        profileTemp: "url('/images/tmp/tmpProfile.png')",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwind-scrollbar-hide")],
};
