/**
 * handle events
 */

function postMessage (data) {
  window.postMessage(data, '*')
}

function getCode () {
  const key = 'rc-authcode'
  const c = window.localStorage.getItem(key)
  if (c) {
    window.localStorage.setItem(key, '')
    return c
  } else {
    return ''
  }
}

function login () {
  const c = getCode()
  if (c) {
    postMessage({
      type: 'rc-ev-authorization-code',
      callbackUri: `${window.rc.callbackUri}?code=${c}`
    })
  }
}

function getUrl () {
  return window.rc.authUrlDefaultRc.replace(
    window.rc.defaultState,
    window.rc.view
  )
}

function onEvent (e) {
  const { data } = e
  console.debug('got data from ev', data)
  if (data) {
    switch (data.type) {
      case 'rc-ev-loginPopup':
        // get login oAuthUri from widget
        console.log('rc-ev-loginPopup:', data.oAuthUri)
        window.location.href = getUrl()
        //  window.open(data.oAuthUri); // open oauth uri to login
        break
      case 'rc-ev-init':
        login()
        postMessage({
          type: 'rc-init-rtc'
        })
        break
      default:
        break
    }
  }
}

export function handleEvent () {
  window.rc = JSON.parse(
    window.localStorage.getItem('rc-data-ref', JSON.stringify(window.rc))
  )
  // window.top = window
  // window.parent = window
  window.addEventListener('message', onEvent)
}
