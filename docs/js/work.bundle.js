/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/client/app/common.js
function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
async function waitUntilLoad() {
  let inited = false;

  while (!inited) {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.iosrtc) {
      inited = true;
    } else {
      console.log('wait');
      await wait(50);
    }
  }

  return true;
}
function loadScript(url) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'app.js';
  script.async = false;
  document.body.appendChild(script);
}
;// CONCATENATED MODULE: ./src/client/app/check-permission.js
function checkPermission() {
  // First check whether we already have permission to access the microphone.
  cordova.plugins.iosrtc.registerGlobals();
  window.audioinput.checkMicrophonePermission(hasPermission => {
    if (hasPermission) {
      console.log('We already have permission to record.'); // startCapture()
    } else {
      // Ask the user for permission to access the microphone
      window.audioinput.getMicrophonePermission((hasPermission, message) => {
        if (hasPermission) {
          console.log('User granted us permission to record.');
        } else {
          console.warn('User denied permission to record.');
        }
      });
    }
  });
}
;// CONCATENATED MODULE: ./src/client/app/event-handler.js
/**
 * handle events
 */
function postMessage(data) {
  window.postMessage(data, '*');
}

function getCode() {
  const key = 'rc-authcode';
  const c = window.localStorage.getItem(key);

  if (c) {
    window.localStorage.setItem(key, '');
    return c;
  } else {
    return '';
  }
}

function login() {
  const c = getCode();

  if (c) {
    postMessage({
      type: 'rc-ev-authorization-code',
      callbackUri: `${window.rc.callbackUri}?code=${c}`
    });
  }
}

function getUrl() {
  return window.rc.authUrlDefaultRc.replace(window.rc.defaultState, window.rc.view);
}

function onEvent(e) {
  const {
    data
  } = e;
  console.debug('got data from ev', data);

  if (data) {
    switch (data.type) {
      case 'rc-ev-loginPopup':
        // get login oAuthUri from widget
        console.log('rc-ev-loginPopup:', data.oAuthUri);
        window.location.href = getUrl(); //  window.open(data.oAuthUri); // open oauth uri to login

        break;

      case 'rc-ev-init':
        login();
        postMessage({
          type: 'rc-init-rtc'
        });
        break;

      default:
        break;
    }
  }
}

function handleEvent() {
  window.rc = JSON.parse(window.localStorage.getItem('rc-data-ref', JSON.stringify(window.rc))); // window.top = window
  // window.parent = window

  window.addEventListener('message', onEvent);
}
;// CONCATENATED MODULE: ./src/client/work.js
/**
 * replace app default script
 */




async function run() {
  await waitUntilLoad();
  checkPermission();
  loadScript('https://webrtc.github.io/adapter/adapter-latest.js');
  loadScript('app.js');
  handleEvent();
}

run();
/******/ })()
;
//# sourceMappingURL=work.bundle.js.map