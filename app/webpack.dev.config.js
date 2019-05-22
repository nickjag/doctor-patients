const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('@babel/polyfill');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  entry: {
    polyfill: '@babel/polyfill',
    app: path.join(__dirname, 'src', 'index.js'),
  },
  output: {
    path: `${__dirname}/build`,
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff2?|otf)$/,
        use: 'file-loader',
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        REACT_API_URL: JSON.stringify(process.env.REACT_API_URL),
      },
    }),
  ],
};
