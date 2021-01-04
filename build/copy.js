const CopyWebpackPlugin = require('copy-webpack-plugin')
const { resolve } = require('path')
const from1 = resolve(
  __dirname,
  '../platforms/android/platform_www'
)
const from2 = resolve(
  __dirname,
  '../platforms/ios/platform_www'
)
const to1 = resolve(
  __dirname,
  '../docs/android/platform_www'
)
const to2 = resolve(
  __dirname,
  '../docs/ios/platform_www'
)

const copy = new CopyWebpackPlugin({
  patterns: [{
    from: from1,
    to: to1,
    force: true
  }, {
    from: from2,
    to: to2,
    force: true
  }]
})
module.exports = copy
