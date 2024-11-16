/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [
        ({ addUtilities }) => {
            addUtilities({
                '.base-btn': {
                    '@apply border-2 border-black rounded-full font-bold px-4 py-2 hover:bg-black hover:text-white transition duration-150':
                        '',
                },
                '.green-btn': {
                    '@apply bg-green-500 text-white rounded-full font-bold px-4 py-2 hover:bg-green-400 transition duration-150':
                        '',
                },
            });
        },
    ],
};
