import { Component } from 'react'
import { wait } from '../../app/common'

export default class App extends Component {
  state = {
    loggedIn: false,
    fetchingUser: false,
    loginning: false
  }

  isIOS = window.rc.isIOS

  componentDidMount () {
    console.log('isios', this.isIOS)
    this.initEvent()
    if (!this.isIOS) {
      this.requirePermissions()
    }
  }

  waitUntilLoad = async () => {
    let inited = false
    while (!inited) {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.permissions) {
        inited = true
      } else {
        await wait(50)
      }
    }
    return true
  }

  getCode = () => {
    const key = 'rc-authcode'
    const c = window.localStorage.getItem(key)
    if (c) {
      window.localStorage.setItem(key, '')
      return c
    } else {
      return ''
    }
  }

  postMessage = (data) => {
    document.querySelector('#rc-widget-adapter-frame').contentWindow.postMessage(data, '*')
  }

  login = () => {
    const c = this.getCode()
    if (c) {
      this.postMessage({
        type: 'rc-ev-authorization-code',
        callbackUri: `${window.rc.callbackUri}?code=${c}`
      })
    }
  }

  requirePermissions = async () => {
    await this.waitUntilLoad()
    try {
      const { permissions } = cordova.plugins
      const list = [
        permissions.CAPTURE_AUDIO_OUTPUT,
        permissions.RECORD_AUDIO
      ]
      permissions.checkPermission(list, (status) => {
        console.log('permission list', status)
        if (!status.hasPermission) {
          permissions.requestPermissions(
            list,
            (status) => {
              if (!status.hasPermission) {
                console.log('set permission failed')
              }
            },
            console.log
          )
        }
      }, null)
    } catch (e) {
      console.log(e)
    }
  }

  initEvent = () => {
    if (typeof cordova !== 'undefined') {
      window.open = cordova.InAppBrowser.open
    }
    window.addEventListener('message', this.onEvent)
  }

  onEvent = e => {
    const { data } = e
    console.debug('got data from ev', data)
    if (data) {
      switch (data.type) {
        case 'rc-ev-loginPopup':
          // get login oAuthUri from widget
          console.log('rc-ev-loginPopup:', data.oAuthUri)
          window.location.href = this.getUrl()
          //  window.open(data.oAuthUri); // open oauth uri to login
          break
        case 'rc-ev-init':
          this.login()
          this.postMessage({
            type: 'rc-init-rtc'
          })
          break
        default:
          break
      }
    }
  }

  getUrl = () => {
    return window.rc.authUrlDefaultRc.replace(window.rc.defaultState, window.rc.view)
  }

  render () {
    const url = this.isIOS
      ? window.rc.server + '/embeddable/app.html' + window.rc.appConfigQuery
      : 'https://ringcentral.github.io/engage-voice-embeddable/app.html' + window.rc.appConfigQuery
    return (
      <div id='app'>
        <iframe
          id='rc-widget-adapter-frame'
          src={url}
          sandbox='allow-same-origin allow-scripts allow-forms allow-popups'
          allow='microphone'
        />
      </div>
    )
  }
}
