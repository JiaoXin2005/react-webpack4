const path = require('path');
const webpack = require('webpack')
const APP_PATH = path.resolve(__dirname, '../app')
const DIST_PATH = path.resolve(__dirname, '../dist')
const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const os = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

module.exports = {
  entry: {
    app: './app/index.js',
    // vendor: ['react', 'react-dom', 'react-router-dom']
  },
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: DIST_PATH,
    publicPath: process.env.NODE_ENV === 'production' 
      ? paths.prod.publicPath
      : paths.dev.publicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        // use: 'happypack/loader?id=happy-bable-js',
        include: APP_PATH,
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
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
    new AddAssetHtmlPlugin({
      filepath: process.env.NODE_ENV === 'production'
        ? path.resolve(paths.prod.dll, 'vendor.dll.js')
        : path.resolve(paths.dev.dll, 'vendor.dll.js'),

      includeSourcemap: false,
      publicPath: './js/',
      outputPath: '/js/',
      hash: true
    }),
    new webpack.DllReferencePlugin({
      manifest: process.env.NODE_ENV === 'production' 
        ? path.resolve(paths.prod.dll, 'manifest.json')
        : path.resolve(paths.dev.dll, 'manifest.json'),

      context: __dirname
    }),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false,
      width: 200
    }),
    new HappyPack({
      id: 'happy-bable-js',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    })
  ]
}