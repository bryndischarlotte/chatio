var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
        ]
    }
    // plugins: [
    //     // Minifies the code
    //     new webpack.optimize.UglifyJsPlugin()
    // ],
    // watchOptions: {
    //     // Enables watch mode
    //     watch: true,
    //     ignored: /node_modules/
    // }
};