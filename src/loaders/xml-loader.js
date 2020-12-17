/**
 * loaders to process xml template to config.xml
 */

const { getOptions } = require('loader-utils')
const { writeFileSync } = require('fs')
const { exec } = require('shelljs')
module.exports = function (src) {
  const opts = getOptions(this)
  const res = src.replace(/\{[\w\d]+\}/g, (s) => {
    const k = s.replace(/\{|\}/g, '')
    const v = opts.dict[k]
    if (v) {
      return v
    } else {
      return s
    }
  })
  writeFileSync(opts.file, res)
  exec('npm run icon && npm run splash')
  return ''
}
