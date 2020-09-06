const path = require('path');
const webpack = require('webpack');
const uglifyJsPlugin = require("babel-minify-webpack-plugin");
const ExtractTextPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './app/prod/js/checkform.js',
    performance: {
        hints: false
    },
    module: {
        rules: [{
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                test: /\.(sass)$/,
                use: [
                    ExtractTextPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(css)$/,
                use: [
                    ExtractTextPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            }
            // {
            //     test: /\.(svg|eot|woff|woff2|ttf)$/,
            //     loader: 'file-loader'
            // }
        ]
    },
    plugins: [
        new uglifyJsPlugin(),
        new ExtractTextPlugin({
            filename: 'css/main.css'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    resolve: {
        extensions: ['*', '.js']
    },
    output: {
        path: __dirname + '/app/prod',
        publicPath: '/',
        filename: 'js/script.js'
    },
    devServer: {
        contentBase: './'
    }
};
