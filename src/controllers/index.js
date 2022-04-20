const get = async (ctx, next) => {
  ctx.status = 200;
  ctx.body = { message: 'Ok' };
};

module.exports = { get };
