import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Vektörel Temalar
        theme1: {
          bg: "#4318FF", // Mor Selam Arka Planı
          shape: "#5630FF", 
          text: "#FFFFFF", 
        },
        theme2: {
          bg: "#E34542", // Mercan
          shape: "#F2B8D1", 
        },
 theme3: {
  bg: "#6A0DAD",   // Mor Arka Plan
  shape: "#E0B0FF", // Açık Lila Şekil Rengi
  title: "#FFFFFF", // Açık Mor/Lila Metin Rengi (bg’den daha açık)
}


      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'], 
        questrial: ['Questrial', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;