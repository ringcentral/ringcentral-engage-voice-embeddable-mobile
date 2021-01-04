/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 462:
/***/ ((module) => {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {
"use strict";

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
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(462);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);
;// CONCATENATED MODULE: ./src/client/app/check-permission.js


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function checkPermission() {
  // First check whether we already have permission to access the microphone.
  cordova.plugins.iosrtc.registerGlobals();

  if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    navigator.mediaDevices.enumerateDevicesOriginal = navigator.mediaDevices.enumerateDevices;

    navigator.mediaDevices.enumerateDevices = () => {
      const keys = ['deviceId', 'facing', 'groupId', 'id', 'kind', 'label'];
      return navigator.mediaDevices.enumerateDevicesOriginal().then(arr => {
        return arr.map(d => {
          return keys.reduce((p, k) => {
            return _objectSpread(_objectSpread({}, p), {}, {
              [k]: d[k] || ''
            });
          }, {});
        });
      });
    };
  }

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
  loadScript('app.js');
  handleEvent();
}

run();
})();

/******/ })()
;
//# sourceMappingURL=work.bundle.js.map