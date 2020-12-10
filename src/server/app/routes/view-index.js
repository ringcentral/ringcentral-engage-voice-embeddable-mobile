/**
 * view index
 */

import copy from 'json-deep-copy'
import { pack, callbackUri, defaultState, authUrlDefaultRc } from '../common/constants'

const {
  RINGCENTRAL_APP_SERVER, CDN, SERVER_HOME, SERVICE_NAME,
  RINGCENTRAL_CLIENT_ID,
  RINGCENTRAL_CLIENT_SECRET,
  RINGCENTRAL_SERVER
} = process.env

const data = {
  authUrlDefaultRc,
  version: pack.version,
  description: pack.description,
  title: pack.name,
  home: SERVER_HOME,
  server: RINGCENTRAL_APP_SERVER,
  cdn: CDN || RINGCENTRAL_APP_SERVER,
  serviceName: SERVICE_NAME,
  defaultState,
  callbackUri,
  appConfigQuery: `?appVersion=${pack.version}&userAgent=${SERVICE_NAME}_extension%2F${pack.version}&disableActiveCallControl=false&clientId=${RINGCENTRAL_CLIENT_ID}&clientSecret=${RINGCENTRAL_CLIENT_SECRET}&appServer=${encodeURIComponent(RINGCENTRAL_SERVER)}&redirectUri=${encodeURIComponent(RINGCENTRAL_APP_SERVER + '/rc-oauth')}&disableLoginPopup=1`
}
data._global = copy(data)

export default (view) => {
  return (req, res) => {
    // const list = 'https://*.hubspot.com;'
    // if (view === 'index') {
    //   res.set(
    //     'Content-Security-Policy',
    //     `frame-ancestors ${list}`
    //   )
    // }
    const dd = copy(data)
    const { c = '' } = req.query
    dd.appConfigQuery = dd.appConfigQuery + `&authorizationCode=${c}`
    dd._global.appConfigQuery = dd.appConfigQuery
    dd.c = c
    dd._global.c = c
    res.render(view, dd)
  }
}
