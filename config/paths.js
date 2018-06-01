const path = require('path')

module.exports = {
  dev: {
    publicPath: '/',
    dll: path.resolve(__dirname, '../.dll/dev')
  },
  prod: {
    publicPath: 'http://localhost:8080',
    dll: path.resolve(__dirname, '../.dll/prod')    
  }
}