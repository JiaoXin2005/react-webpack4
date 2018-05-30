const webpack = require('webpack')
const path = require('path')
const baseWebapckConfig = require('./webpack.base')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseWebapckConfig, {
  // devtool: 'eval-source-map',
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      minify: {
        html5: true
      },
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: '8080',
    contentBase: path.join(__dirname, '../public'),
    compress: true,
    // historyApiFallback: true,
    hot: true,
    host: '0.0.0.0'
  }
})