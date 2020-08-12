const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'app/dev'),
  mode: 'development',
  entry: {
    formcheck: ['@babel/polyfill', './js/script.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'app/prod/js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      }
    ]
  }
};
