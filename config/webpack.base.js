const path = require('path');
const APP_PATH = path.resolve(__dirname, '../app')
const DIST_PATH = path.resolve(__dirname, '../dist')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: './app/index.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: DIST_PATH
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: APP_PATH
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1,
            name: 'static/img/[name].[hash:8].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      minify: {
        html5: true
      }
    }),
    new CleanWebpackPlugin(['../dist'], { allowExternal: true })
  ]
}