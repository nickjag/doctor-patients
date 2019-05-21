const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

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
    filename: 'static/[name].bundle-[hash:6].js',
  },
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'public/'),
        to: './',
        ignore: ['index.html'],
      },
    ]),
    new CleanWebpackPlugin(['./build']),
    new WriteFilePlugin({
      test: /^(?!.*(hot)).*/,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        REACT_API_URL: JSON.stringify(process.env.REACT_API_URL),
      },
    }),
  ],
};
