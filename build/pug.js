
const copy = require('json-deep-copy').default
const {
  RINGCENTRAL_APP_SERVER_GH,
  RINGCENTRAL_CLIENT_ID,
  RINGCENTRAL_CLIENT_SECRET,
  RINGCENTRAL_SERVER
} = process.env

const { resolve } = require('path')
const cwd = process.cwd()
const callbackUri = encodeURIComponent(RINGCENTRAL_APP_SERVER_GH + '/redirect.html')
const defaultState = '__default_state_'
const pack = require(resolve(cwd, 'package.json'))
const authUrlDefaultRc = `${RINGCENTRAL_SERVER}/restapi/oauth/authorize?redirect_uri=${callbackUri}&client_id=${RINGCENTRAL_CLIENT_ID}&response_type=code&state=${defaultState}&brand_id=&display=&prompt=`

const data = {
  authUrlDefaultRc,
  version: pack.version,
  description: pack.description,
  title: pack.name,
  server: RINGCENTRAL_APP_SERVER_GH,
  cdn: RINGCENTRAL_APP_SERVER_GH,
  defaultState,
  callbackUri,
  appConfigQuery: `?appVersion=${pack.version}&userAgent=${pack.name}_extension%2F${pack.version}&disableActiveCallControl=false&clientId=${RINGCENTRAL_CLIENT_ID}&clientSecret=${RINGCENTRAL_CLIENT_SECRET}&appServer=${encodeURIComponent(RINGCENTRAL_SERVER)}&redirectUri=${callbackUri}&disableLoginPopup=1`
}

function create (view) {
  const d = copy(data)
  d.view = view
  d._global = copy(d)
  return {
    loader: 'pug-html-loader',
    options: {
      data: d
    }
  }
}

exports.pugIndex = create('index')
exports.pugIndexIOS = create('index-ios')

const base = {
  server: RINGCENTRAL_APP_SERVER_GH
}
exports.pugRedirect = {
  loader: 'pug-html-loader',
  options: {
    data: {
      ...base,
      _global: copy(base)
    }
  }
}
