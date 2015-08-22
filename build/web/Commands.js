'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var showOpenDialog = _asyncToGenerator(function* (opts) {
  return new _Promise(function (fulfill, reject) {
    var dialog = require('remote').require('dialog');
    dialog.showOpenDialog(opts, function (selections) {
      fulfill(selections);
    });
  });
});

var Api = require('../application/Api');

module.exports = {

  newExpAsync: _asyncToGenerator(function* () {

    var dialog = require('remote').require('dialog');
    var selections = yield showOpenDialog({
      properties: ['openDirectory', 'createDirectory']
    });

    if (selections == null) {
      console.log("No selections; cancelled New Exp");
      return null;
    }

    var selection = selections[0];

    var env = {
      root: selection
    };

    var init = require('remote').require('./build/commands/init');
    var result = init.runAsync(env, {});

    return env;
  }),

  openExpAsync: _asyncToGenerator(function* () {
    var dialog = require('remote').require('dialog');
    var selections = yield showOpenDialog({
      properties: ['openDirectory']
    });

    // console.log("selections=", selections);

    if (selections == null) {
      console.log("No selections; cancelled Open Exp");
      return null;
    }

    var selection = selections[0];

    var env = {
      root: selection
    };

    return env;
  }),

  sendAsync: _asyncToGenerator(function* (recipient, url_) {
    console.log("sendAsync command");
    var result = yield Api.callMethodAsync('send', [recipient, url_]);
    return result;
  })

};
//# sourceMappingURL=../sourcemaps/web/Commands.js.map