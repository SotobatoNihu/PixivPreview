const ConcatPlugin = require('webpack-concat-plugin');

module.exports = {
    entry: './dist/bundle.js',
    plugins: [
        new ConcatPlugin({
            uglify: false,
            sourceMap: false,
            name: 'pixivViewUtil',
            fileName: '[name].js',
            filesToConcat: ['./src/header.txt', './dist/bundle.js', './src/footer.txt'],
        }),
    ],
    // ・・・
}
