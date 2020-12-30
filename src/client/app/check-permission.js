
export function checkPermission () {
  // First check whether we already have permission to access the microphone.
  cordova.plugins.iosrtc.registerGlobals()
  window.audioinput.checkMicrophonePermission((hasPermission) => {
    if (hasPermission) {
      console.log('We already have permission to record.')
      // startCapture()
    } else {
      // Ask the user for permission to access the microphone
      window.audioinput.getMicrophonePermission((hasPermission, message) => {
        if (hasPermission) {
          console.log('User granted us permission to record.')
        } else {
          console.warn('User denied permission to record.')
        }
      })
    }
  })
}
