const path = require('path')
const webpack = require('webpack')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const utils = {
  path: process.env.NODE_ENV === 'production' 
    ? path.resolve(__dirname,  '../.dll/prod') 
    : path.resolve(__dirname, '../.dll/dev'),
}

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom']
  },
  output: {
    path: utils.path,
    filename: '[name].dll.js',
    library: '_dll_[name]'// 全局变量名，其他模块会从此变量上获取里面模块
  },
   // manifest是描述文件
   plugins: [
     new webpack.DllPlugin({
       path: path.resolve(utils.path, 'manifest.json'),
       name: '_dll_[name]',
       context: __dirname
     })
   ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = module.exports.plugins.concat([
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false, //不需要格式化
          comments: false //不保留注释
        },
        compress: {
          warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
          drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
          collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    })
  ])
}
