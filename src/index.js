import url from 'url';

function dasherize(inStr) {
  return inStr.replace(/::/g, '/')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/_/g, '-')
    .toLowerCase()
};

export default (inApiPath) => (ctx, next) => {
  const urlData = url.parse(ctx.url);
  const api = (urlData.pathname.split('/') || []).pop();
  const data = ctx.request.body;
  try {
    ctx.body = require(`${inApiPath}/${dasherize(api)}`).default(ctx, data);
  } catch (_) {
    ctx.body = '[NODE ERROR]: API ERROR~';
  }
  next();
}
