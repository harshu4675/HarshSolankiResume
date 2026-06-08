/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ━━━ Core Premium Palette ━━━
        background: "#F8F7F4", // Warm paper
        primary: "#0F0F12", // Deep ink (blue undertone)
        accent: "#E94B3C", // Refined coral
        "accent-indigo": "#5B5FC7", // Linear indigo
        secondary: "#F1EFEA",
        card: "#FFFFFF",

        // ━━━ Extended Accents ━━━
        "accent-light": "#F26B5E",
        "accent-dark": "#C73A2D",
        "indigo-light": "#7679D3",
        "indigo-dark": "#4346A8",
        teal: "#0F766E",
        "teal-light": "#14B8A6",
        amber: "#B45309",
        "amber-light": "#D97706",
        violet: "#7C3AED",
        "violet-light": "#8B5CF6",
        forest: "#10B981",
        rose: "#DB2777",

        // ━━━ Primary Variants ━━━
        "primary-soft": "#1F1F24",
        "primary-softer": "#2D2D33",

        // ━━━ Borders ━━━
        "border-soft": "rgba(15,15,18,0.05)",
        "border-medium": "rgba(15,15,18,0.10)",
        "border-strong": "rgba(15,15,18,0.15)",

        // ━━━ Text Hierarchy ━━━
        "text-primary": "#0F0F12",
        "text-secondary": "#3F3F47",
        "text-tertiary": "#6B6B76",
        "text-quaternary": "#9999A5",

        // ━━━ Surface Scale ━━━
        "surface-1": "#FFFFFF",
        "surface-2": "#F8F7F4",
        "surface-3": "#F1EFEA",
        "surface-4": "#E9E7E1",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Cal Sans", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },

      fontSize: {
        "display-2xl": [
          "4.5rem",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "display-xl": [
          "3.75rem",
          { lineHeight: "1.08", letterSpacing: "-0.025em", fontWeight: "700" },
        ],
        "display-lg": [
          "3rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "display-md": [
          "2.25rem",
          { lineHeight: "1.15", letterSpacing: "-0.018em", fontWeight: "600" },
        ],
        "display-sm": [
          "1.875rem",
          { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
      },

      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
        38: "9.5rem",
        42: "10.5rem",
        46: "11.5rem",
        50: "12.5rem",
        54: "13.5rem",
        58: "14.5rem",
        62: "15.5rem",
        66: "16.5rem",
        70: "17.5rem",
        76: "19rem",
        84: "21rem",
        88: "22rem",
        92: "23rem",
        96: "24rem",
        100: "25rem",
        112: "28rem",
        128: "32rem",
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },

      boxShadow: {
        // ━━━ Refined Premium Elevation ━━━
        "elevation-1":
          "0 1px 2px rgba(15,15,18,0.04), 0 1px 1px rgba(15,15,18,0.03)",
        "elevation-2":
          "0 2px 6px rgba(15,15,18,0.05), 0 1px 3px rgba(15,15,18,0.04)",
        "elevation-3":
          "0 4px 12px rgba(15,15,18,0.06), 0 2px 4px rgba(15,15,18,0.04)",
        "elevation-4":
          "0 8px 24px rgba(15,15,18,0.07), 0 4px 8px rgba(15,15,18,0.04)",
        "elevation-5":
          "0 16px 40px rgba(15,15,18,0.08), 0 8px 16px rgba(15,15,18,0.05)",
        "elevation-6":
          "0 24px 56px rgba(15,15,18,0.09), 0 12px 24px rgba(15,15,18,0.06)",

        // ━━━ Premium Glows ━━━
        "card-hover":
          "0 24px 56px rgba(15,15,18,0.09), 0 8px 24px rgba(15,15,18,0.05)",
        "accent-glow":
          "0 8px 28px rgba(233,75,60,0.22), 0 2px 8px rgba(233,75,60,0.14)",
        "accent-hover":
          "0 14px 40px rgba(233,75,60,0.30), 0 4px 12px rgba(233,75,60,0.20)",
        "indigo-glow":
          "0 8px 28px rgba(91,95,199,0.22), 0 2px 8px rgba(91,95,199,0.14)",
        "profile-card":
          "0 32px 80px rgba(15,15,18,0.10), 0 16px 40px rgba(15,15,18,0.06)",
      },

      backgroundImage: {
        "gradient-paper":
          "linear-gradient(135deg, #F8F7F4 0%, #F1EFEA 50%, #E9E7E1 100%)",
        "gradient-card": "linear-gradient(145deg, #FFFFFF 0%, #FBFAF7 100%)",
        "gradient-accent": "linear-gradient(135deg, #E94B3C 0%, #F26B5E 100%)",
        "gradient-indigo": "linear-gradient(135deg, #5B5FC7 0%, #7679D3 100%)",
        "gradient-dark": "linear-gradient(135deg, #0F0F12 0%, #1F1F24 100%)",
        "gradient-hero":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(91,95,199,0.07) 0%, transparent 60%)",
        "gradient-premium":
          "linear-gradient(135deg, rgba(91,95,199,0.05) 0%, rgba(233,75,60,0.03) 100%)",
      },

      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "scale-in": "scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-right": "slideRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 2s infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },

      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },

      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      transitionDuration: {
        250: "250ms",
        350: "350ms",
        400: "400ms",
        600: "600ms",
        800: "800ms",
        1000: "1000ms",
      },

      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },

      screens: {
        xs: "475px",
        "3xl": "1920px",
      },

      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
    },
  },
  plugins: [],
};
