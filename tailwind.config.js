/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'spotify-green': '#1DB954',
                'spotify-black': '#191414',
                'spotify-white': '#FFFFFF',
                'spotify-gray': '#535353',
            }
        },
    },
    plugins: [],
}
