cordova.define("cordova-audio-permissions-plugin.audioPermissions", function(require, exports, module) {
/* global cordova */

var exec = require('cordova/exec');

var AudioPermissions = {
    check: function(callback) {
        function success(value) {
            callback(value.success || false);
        }
        function fail(err) {
            callback(false);
        }
        exec(success, fail, 'AudioPermissions', 'check', []);
    },

    request: function(callback) {
        function success(value) {
            callback(value.success || false);
        }
        function fail(err) {
            callback(false);
        }
        exec(success, fail, 'AudioPermissions', 'request', []);
    },
};

module.exports = AudioPermissions;

});
