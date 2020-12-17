import { Component } from 'react'

export default class App extends Component {
  state = {
    loggedIn: false,
    fetchingUser: false,
    loginning: false
  }

  componentDidMount () {
    this.initEvent()
    this.requirePermissions()
  }

  getCodeFromUrl = () => {
    const reg = /c=([\w\d_\-]+)/
    const arr = window.location.search.match(reg)
    return arr ? arr[1] : ''
  }

  login = () => {
    const c = this.getCodeFromUrl()
    if (c) {
      document.querySelector('#rc-widget-adapter-frame').contentWindow.postMessage({
        type: 'rc-ev-authorization-code',
        callbackUri: `${window.rc.callbackUri}?code=${c}`
      }, '*')
    }
  }

  requirePermissions = () => {
    try {
      const { permissions } = cordova.plugins
      const list = [
        permissions.CAPTURE_AUDIO_OUTPUT,
        permissions.RECORD_AUDIO
      ]
      permissions.hasPermission(list, (status) => {
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
    const url = 'https://ringcentral.github.io/engage-voice-embeddable/app.html' + window.rc.appConfigQuery
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
