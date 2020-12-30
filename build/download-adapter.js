/**
 * download adapter.js of embeddable
 */
require('dotenv').config()
const {
  exec,
  cp,
  rm
} = require('shelljs')
const { writeFileSync, readFileSync } = require('fs')
const { resolve } = require('path')

async function run () {
  rm('-rf', 'deploy/embeddable')
  rm('-rf', 'gh-pages.zip')
  exec('wget https://github.com/ringcentral/engage-voice-embeddable/archive/gh-pages.zip')
  exec('unzip -a gh-pages.zip')
  cp('-r', 'engage-voice-embeddable-gh-pages', 'deploy/embeddable')
  rm('-rf', 'engage-voice-embeddable-gh-pages')
  rm('deploy/embeddable/index.html')
  rm('-rf', 'gh-pages.zip')
  const htmlPath = resolve(__dirname, '../deploy/embeddable/app.html')
  let html = readFileSync(htmlPath).toString()
  html = html.replace('<script src="app.js"></script>', '<script src="/ios/platform_www/cordova.js"></script><script src="/js/work.bundle.js"></script>')
  writeFileSync(htmlPath, html)
}

run()
