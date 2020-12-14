const CopyWebpackPlugin = require('copy-webpack-plugin')
const { resolve } = require('path')
const from1 = resolve(
  __dirname,
  '../platforms/android/platform_www'
)
const to1 = resolve(
  __dirname,
  '../docs/android/'
)

const copy = new CopyWebpackPlugin({
  patterns: [{
    from: from1,
    to: to1,
    force: true
  }]
})
module.exports = copy
