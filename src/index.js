import url from 'url';

export default (inApiPath) => (ctx, next) => {
  const urlData = url.parse(ctx.url);
  const api = (urlData.pathname.split('/') || []).pop();
  const data = ctx.request.body;
  try {
    ctx.body = require(`${inApiPath}/${api}`).default(ctx, data);
  } catch (_) {
    ctx.body = '[NODE ERROR]: API ERROR~';
  }
  next();
}
