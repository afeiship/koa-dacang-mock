import url from 'url';

export default (inApiPath) => (ctx, next) => {
  const urlData = url.parse(ctx.url);
  const api = (urlData.pathname.split('/') || []).pop();
  const data = ctx.request.body;
  ctx.body = api && require(`${inApiPath}/${api}`).default(ctx, data);
  next();
};
