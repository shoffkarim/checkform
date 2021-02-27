const path = require('path');
const webpack = require('webpack');
const uglifyJsPlugin = require("babel-minify-webpack-plugin");
const ExtractTextPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './ts/script.ts',
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
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new uglifyJsPlugin(),
        new ExtractTextPlugin({
            filename: 'style.css'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "demo"),
    },
    devServer: {
        contentBase: './'
    }
};
