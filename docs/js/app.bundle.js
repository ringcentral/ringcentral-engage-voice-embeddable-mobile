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

;// CONCATENATED MODULE: external "React"
const external_React_namespaceObject = React;
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_namespaceObject);
;// CONCATENATED MODULE: external "ReactDOM"
const external_ReactDOM_namespaceObject = ReactDOM;
var external_ReactDOM_default = /*#__PURE__*/__webpack_require__.n(external_ReactDOM_namespaceObject);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(462);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);
;// CONCATENATED MODULE: ./src/client/components/index/index.jsx


class App extends external_React_namespaceObject.Component {
  constructor(...args) {
    super(...args);

    defineProperty_default()(this, "state", {
      loggedIn: false,
      fetchingUser: false,
      loginning: false
    });

    defineProperty_default()(this, "getCodeFromUrl", () => {
      const reg = /c=([\w\d_\-]+)/;
      const arr = window.location.search.match(reg);
      return arr ? arr[1] : '';
    });

    defineProperty_default()(this, "login", () => {
      const c = this.getCodeFromUrl();

      if (c) {
        document.querySelector('#rc-widget-adapter-frame').contentWindow.postMessage({
          type: 'rc-ev-authorization-code',
          callbackUri: `${window.rc.callbackUri}?code=${c}`
        }, '*');
      }
    });

    defineProperty_default()(this, "requirePermissions", () => {
      try {
        const {
          permissions
        } = cordova.plugins;
        const list = [permissions.CAPTURE_AUDIO_OUTPUT, permissions.RECORD_AUDIO];
        permissions.hasPermission(list, status => {
          if (!status.hasPermission) {
            permissions.requestPermissions(list, status => {
              if (!status.hasPermission) {
                console.log('set permission failed');
              }
            }, console.log);
          }
        }, null);
      } catch (e) {
        console.log(e);
      }
    });

    defineProperty_default()(this, "initEvent", () => {
      if (typeof cordova !== 'undefined') {
        window.open = cordova.InAppBrowser.open;
      }

      window.addEventListener('message', this.onEvent);
    });

    defineProperty_default()(this, "onEvent", e => {
      const {
        data
      } = e;
      console.debug('got data from ev', data);

      if (data) {
        switch (data.type) {
          case 'rc-ev-loginPopup':
            // get login oAuthUri from widget
            console.log('rc-ev-loginPopup:', data.oAuthUri);
            window.location.href = this.getUrl(); //  window.open(data.oAuthUri); // open oauth uri to login

            break;

          case 'rc-ev-init':
            this.login();
            break;

          default:
            break;
        }
      }
    });

    defineProperty_default()(this, "getUrl", () => {
      return window.rc.authUrlDefaultRc;
    });
  }

  componentDidMount() {
    this.initEvent();
    this.requirePermissions();
  }

  render() {
    const url = 'https://ringcentral.github.io/engage-voice-embeddable/app.html' + window.rc.appConfigQuery;
    return /*#__PURE__*/React.createElement("div", {
      id: "app"
    }, /*#__PURE__*/React.createElement("iframe", {
      id: "rc-widget-adapter-frame",
      src: url,
      sandbox: "allow-same-origin allow-scripts allow-forms allow-popups",
      allow: "microphone"
    }));
  }

}
;// CONCATENATED MODULE: ./src/client/index.js
/**
 * entry file for install page
 */





const renderReactDom = () => {
  external_ReactDOM_default().render( /*#__PURE__*/external_React_default().createElement(App, null), document.getElementById('container'));
};

if (window.cordova) {
  document.addEventListener('deviceready', () => {
    renderReactDom();
  }, false);
} else {
  renderReactDom();
}
})();

/******/ })()
;
//# sourceMappingURL=app.bundle.js.map