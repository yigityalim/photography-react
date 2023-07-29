/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './index.ts.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontFamily: {
            'anonymous': ['Anonymous Pro', 'monospace'],
        },
        extend: {
            colors: {
                'primary': '#1D1D1D',
                'secondary': '#2E2E2E',
                'tertiary': '#3E3E3E',
                'gray': '#F2F2F2',
                'dark-gray': '#D1D1D1',
                'brand': '#FFD700',
            },
            keyframes: {
                loader: {
                    '0%': {
                        left: '0',
                        transform: 'translateX(-100%)',
                    },
                    '100%': {
                        left: '100%',
                        transform: 'translateX(0)',
                    },
                },
            },
            animation: {
                loader: 'loader 1s linear infinite',
            },
        },
    },
    plugins: [],
}

