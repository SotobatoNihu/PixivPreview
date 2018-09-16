const ConcatPlugin = require('webpack-concat-plugin');

module.exports = {
    entry: './dist/bundle.js',
    /*
    output: {
        filename: 'result.js'
    },
    */
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
//const WrapperPlugin = require('wrapper-webpack-plugin');
//const fs = require('fs');
//const headerDoc = require('./src/header.txt', 'utf8');
//const footerDoc = require('./src/footer.txt', 'utf8');

//const webpack = require('webpack');
//const fs = require('fs');
//const headerDoc = fs.readFileSync('./src/header.js', 'utf8');
/*
module.exports = {
   entry: './src/main.js',
   output: {
       path: '/dist',
       filename: 'bundle.js',
   },
   plugins: [
       new UglifyEsPlugin({
           // beautify: {},
       }),

       new ConcatPlugin({
           uglify: false,
           sourceMap: false,
           name: 'result',
           fileName: '[name].js',
           filesToConcat: ['src/header.txt', 'dist/bundle.js', 'src/footer.txt'],
       }),
       */

    /*
    new UglifyEsPlugin({
           // beautify: {},
    }),
    new webpack.BannerPlugin({
        test: /\.js$/,
        banner: headerDoc,
    })

};

 */