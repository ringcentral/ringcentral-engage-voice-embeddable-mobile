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
const {
  GH,
  RINGCENTRAL_APP_SERVER_GH,
  RINGCENTRAL_APP_SERVER
} = process.env

const server = GH
  ? RINGCENTRAL_APP_SERVER_GH
  : RINGCENTRAL_APP_SERVER
const path = GH
  ? 'docs'
  : 'deploy'
async function run () {
  rm('-rf', `${path}/embeddable`)
  rm('-rf', 'gh-pages.zip')
  exec('wget https://github.com/ringcentral/engage-voice-embeddable/archive/gh-pages.zip')
  exec('unzip -a gh-pages.zip')
  cp('-r', 'engage-voice-embeddable-gh-pages', `${path}/embeddable`)
  rm('-rf', 'engage-voice-embeddable-gh-pages')
  rm(`${path}/embeddable/index.html`)
  rm('-rf', 'gh-pages.zip')
  const htmlPath = resolve(__dirname, `../${path}/embeddable/app.html`)
  let html = readFileSync(htmlPath).toString()
  html = html.replace('<script src="app.js"></script>', `<script src="${server}/ios/platform_www/cordova.js"></script><script src="${server}/js/work.bundle.js"></script>`)
  writeFileSync(htmlPath, html)
}

run()
