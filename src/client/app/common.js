
export function wait (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function waitUntilLoad () {
  let inited = false
  while (!inited) {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.iosrtc) {
      inited = true
    } else {
      console.log('wait')
      await wait(50)
    }
  }
  return true
}

export function loadScript (url) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'app.js'
  script.async = false
  document.body.appendChild(script)
}
