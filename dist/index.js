'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (inApiPath) {
  return function (ctx, next) {
    var urlData = _url2.default.parse(ctx.url);
    var api = urlData.pathname.split('/').pop();
    var data = ctx.request.body;
    ctx.body = require(inApiPath + '/' + api).default(ctx, data);
    next();
  };
};