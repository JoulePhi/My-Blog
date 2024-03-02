import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
                opensans: ['Open Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                sidebarbg: "#363740",
                bg: "#f5f5f9",
                textDark: "#dde2ff",
                textGray: "#a4a6b3",
                activeMenu: "#3e4049"
            }
        },
    },

    plugins: [forms],
};
