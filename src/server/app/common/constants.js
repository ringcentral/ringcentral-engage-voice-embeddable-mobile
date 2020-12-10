import { resolve } from 'path'
const {
  RINGCENTRAL_APP_SERVER,
  RINGCENTRAL_SERVER,
  RINGCENTRAL_CLIENT_ID
} = process.env
const arr = RINGCENTRAL_APP_SERVER.split('/')
const root = arr[0] + arr[1] + arr[2]
const cwd = process.cwd()
export const callbackUri = encodeURIComponent(RINGCENTRAL_APP_SERVER + '/rc-oauth')
export const defaultState = '__default_state_'
export const extraPath = RINGCENTRAL_APP_SERVER.replace(root, '')
export const pack = require(resolve(cwd, 'package.json'))
export const authUrlDefaultRc = `${RINGCENTRAL_SERVER}/restapi/oauth/authorize?redirect_uri=${callbackUri}&client_id=${RINGCENTRAL_CLIENT_ID}&response_type=code&state=${defaultState}&brand_id=&display=&prompt=`
