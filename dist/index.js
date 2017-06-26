'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dasherize(inStr) {
  return inStr.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
};

exports.default = function (inApiPath) {
  return function (ctx, next) {
    var urlData = _url2.default.parse(ctx.url);
    var api = (urlData.pathname.split('/') || []).pop();
    var data = ctx.request.body;
    try {
      ctx.body = require(inApiPath + '/' + dasherize(api)).default(ctx, data);
    } catch (_) {
      ctx.body = '[NODE ERROR]: API ERROR~';
    }
    next();
  };
};