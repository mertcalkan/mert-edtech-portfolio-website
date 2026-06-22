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
        // Yeni Vektörel Temalar
        theme1: {
          bg: "#4318FF", // Görsel 2 (Mor Selam Arka Planı)
          shape: "#5630FF", // Morun biraz daha açık tonu
          text: "#FFFFFF", // Metin Rengi Beyaz
        },
        theme2: {
          bg: "#E34542", // Görsel (Mercan/Kırmızı) - Sabit kaldı
          shape: "#F2B8D1", // Pembe Şekil
        },
        theme3: {
          bg: "#F26322", // Görsel 1 (Turuncu Headspace Arka Planı)
          title: "#FFFFFF", // "The magic of..." beyaz metin
          shape: "#FFE24A", // Sarı Büyük Şekil/Metin
        },
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