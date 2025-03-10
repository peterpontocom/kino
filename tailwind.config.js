/** @type {import('tailwindcss').Config} */
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from "@expo-google-fonts/montserrat";
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        body: ["Montserrat_400Regular"],
        heading: ["Montserrat_700Bold"],
      },
      colors: {
        primary: "#F77C00",
        secondary: "#FFF7ED"
      }
    },
  },
  plugins: [],
}