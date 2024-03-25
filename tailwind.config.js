import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import scrollbar from "tailwind-scrollbar-hide";
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],
    options: {
        safelist: ["blockquote", "pre"],
    },
    darkMode: "selector",

    theme: {
        screens: {
            sm: "576px",
            // => @media (min-width: 576px) { ... }

            md: "768px",
            // => @media (min-width: 960px) { ... }

            lg: "1280px",

            xl: "1920px",
        },
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
                opensans: ["Open Sans", ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                me: "url('/public/storage/images/me-porto.png')",
            },
            colors: {
                sidebarbg: "#363740",
                bg: "#f5f5f9",
                textDark: "#dde2ff",
                textGray: "#a4a6b3",
                activeMenu: "#3e4049",
                purple: "#6941C6",
                blue: "#3538CD",
                magenta: "#C11574",
                grey: "#667085",
                green: "#3ac78b",
                darkBg: "#0f182a",
                darkContainer: "#1e293b",
            },
        },
    },

    plugins: [forms, scrollbar],
};
