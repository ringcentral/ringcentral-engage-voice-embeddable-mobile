/**
 * rc oauth
 */

import copy from 'json-deep-copy'

const {
  APP_HOME,
  RINGCENTRAL_APP_SERVER
} = process.env

export default async (req, res) => {
  const { code, state } = req.query
  const r = state.includes('ios') ? '/ios-device' : APP_HOME
  const server = RINGCENTRAL_APP_SERVER + r
  const data = {
    server,
    code
  }
  data._global = copy(data)
  res.render('redirect', data)
}
