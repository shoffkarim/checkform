// CONFIG FOR TS========================================

const path = require("path");

module.exports = {
    entry: "./ts/script.ts",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
};


// CONFIG FOR JS========================================

// const path = require('path');
// const webpack = require('webpack');
// const uglifyJsPlugin = require("babel-minify-webpack-plugin");
// const ExtractTextPlugin = require('mini-css-extract-plugin');

// module.exports = {
//     entry: './js/checkform.js',
//     performance: {
//         hints: false
//     },
//     module: {
//         rules: [{
//                 test: /\.(js)$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/preset-env'],
//                     }
//                 }
//             },
//             {
//                 test: /\.(sass)$/,
//                 use: [
//                     ExtractTextPlugin.loader,
//                     'css-loader',
//                     'postcss-loader',
//                     {
//                         loader: 'sass-loader',
//                         options: {
//                             sourceMap: true
//                         }
//                     }
//                 ]
//             },
//             {
//                 test: /\.(css)$/,
//                 use: [
//                     ExtractTextPlugin.loader,
//                     'css-loader',
//                     'postcss-loader',
//                 ]
//             }
//             // {
//             //     test: /\.(svg|eot|woff|woff2|ttf)$/,
//             //     loader: 'file-loader'
//             // }
//         ]
//     },
//     plugins: [
//         new uglifyJsPlugin(),
//         new ExtractTextPlugin({
//             filename: 'css/main.css'
//         }),
//         new webpack.ProvidePlugin({
//             $: "jquery",
//             jQuery: "jquery"
//         })
//     ],
//     resolve: {
//         extensions: ['*', '.js']
//     },
//     output: {
//         path: __dirname + '/js',
//         publicPath: '/',
//         filename: 'prod/script.js'
//     },
//     devServer: {
//         contentBase: './'
//     }
// };
