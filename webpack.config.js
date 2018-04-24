const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = [
  {
    entry: {
      global: './src/css/global.css',
      homePage: './src/css/homePage.css',
      joinus: './src/css/joinus.css',
      service: './src/css/service.css',
      aboutus: './src/css/aboutus.css',
      main: './src/js/main.js'
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: '[name].[chunkhash].js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true
                }
              },
              'postcss-loader'
            ]
          })
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: '[name][hash].[ext]',
                publicPath: '/assets',
                outputPath: './assets'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new webpack.HashedModuleIdsPlugin(),
      new ExtractTextPlugin("css/[name].[contenthash].css"),
      new HtmlWebpackPlugin({
        chunks: ['main', 'global', 'homePage'],
        filename: 'index.html',
        template: './src/index.html',
      }),
      new HtmlWebpackPlugin({
        chunks: ['global', 'joinus'],
        filename: 'joinus.html',
        template: './src/joinus.html'
      }),
      new HtmlWebpackPlugin({
        chunks: ['global', 'service'],
        filename: 'service.html',
        template: './src/service.html'
      }),
      new HtmlWebpackPlugin({
        chunks: ['global', 'aboutus'],
        filename: 'aboutus.html',
        template: './src/aboutus.html'
      }),
      new UglifyJsPlugin()
    ]
  }
];