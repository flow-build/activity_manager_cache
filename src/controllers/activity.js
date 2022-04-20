const activities = async (ctx, next) => {
  try {
    const db = ctx.db;
  } catch (err) {
    ctx.status = 404;
  }
};

const activity = async (ctx, next) => {
  try {
    const db = ctx.db;
  } catch (err) {
    ctx.status = 404;
  }
};

module.exports = { activity, activities };
