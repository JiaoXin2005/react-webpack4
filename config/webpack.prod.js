const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: 'vendor',
          name: 'vendor'
        }
      }
    }
  }
})