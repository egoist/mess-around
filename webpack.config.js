var path = require('path')
var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin()

module.exports = {
  entry: ['./src/client/index'],
  output: {
    path: path.resolve('./build'),
    filename: 'bundle.[hash].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.json']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'] },
      {
        test: /\.vue$/,
        loaders: ['vue']
      }
    ]
  },
  vue: {
    loaders: {
      css: 'style!css!postcss',
      html: 'jade'
    }
  },
  postcss: function () {
    return [
      require('postcss-nested')()
    ]
  },
  plugins: [
    assetsPluginInstance
  ]
}
