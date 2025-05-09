module.exports = {
    plugins: [
        require('@tailwindcss/postcss'), // Use the Tailwind CSS PostCSS plugin
        require('autoprefixer'), // For adding vendor prefixes
        require('postcss-preset-env')({
            stage: 1, // Enable modern CSS features
            features: {
                'color-mod-function': true, // Enable color manipulation
            },
        }),
    ],
};