import { Component } from 'react'
import { Button } from 'antd'
import Link from '../common/link'

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

  login = () => {
    if (window.rc.c) {
      document.querySelector('#rc-widget-adapter-frame').contentWindow.postMessage({
        type: 'rc-ev-authorization-code',
        callbackUri: `${window.rc.callbackUri}?code=${window.rc.c}`
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
    return window.rc.authUrlDefaultRc
  }

  loginBtn = () => {
    return (
      <div className='pd3x pd3y aligncenter'>
        <div className='pd2y'>RingCentral engage voice embeddable mobile</div>
        <Link href={this.getUrl()}>
          <Button type='primary'>
            Login
          </Button>
        </Link>
      </div>
    )
  }

  render () {
    const logined = !!window.rc.c
    const url = 'https://ringcentral.github.io/engage-voice-embeddable/app.html' + window.rc.appConfigQuery
    // const cls = classnames(
    //   'rc-auth-wrap animate',
    //   {
    //     'rc-hide-to-side': logined
    //   }
    // )
    if (!logined) {
      return this.loginBtn()
    }
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
