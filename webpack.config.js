// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const RobotstxtPlugin = require("robotstxt-webpack-plugin");

const options = {}; // see options below

module.exports = {
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    [new RobotstxtPlugin(options)],
    { src: '~/plugins/vue-lazyload.js', mode: 'client' }
  ]
}