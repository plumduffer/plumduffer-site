const animate = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx,vue}",
        "./components/**/*.{ts,tsx,vue}",
        "./app/**/*.{ts,tsx,vue}",
        "./src/**/*.{ts,tsx,vue}",
    ],
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
                plum: {
                    primary: "#3e2f4f",
                    light: "#b689e7",
                    dark: "#352945",
                    darker: "#261e31",
                    darkest: "#1b1523",
                },
                shirt: {
                    dark: "#cb6b4b",
                    darkest: "#89342b",
                },
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [animate],
};
