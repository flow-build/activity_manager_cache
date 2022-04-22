const { _logger } = require('../utils');

const activities = async (ctx, next) => {
  try {
    _logger.info('activities called');
    const db = ctx.db;
    const actor_id = ctx.state.user.actor_id;

    const activities = await db('user_activity_manager')
      .join(
        'activity_manager',
        'user_activity_manager.activity_manager_id',
        'activity_manager.id'
      )
      .where({ actor_id });

    if (activities.length) {
      ctx.status = 200;
      ctx.body = { activities };
    } else {
      ctx.status = 204;
    }
  } catch (err) {
    ctx.body = { err };
    ctx.status = 404;
  }
};

const activity = async (ctx, next) => {
  try {
    _logger.info('activity called');
    const db = ctx.db;
    const process_id = ctx.params.id;

    const activity = await db('activity')
      .where({
        process_id,
        status: 'started',
      })
      .first();

    if (activity.length) {
      ctx.status = 200;
      ctx.body = activity;
    } else {
      ctx.status = 204;
    }
  } catch (err) {
    ctx.body = { err };
    ctx.status = 404;
  }
};

const activity_manager = async (ctx, next) => {
  try {
    _logger.info('activity_manager called');
    const db = ctx.db;
    const activity_manager_id = ctx.params.id;

    const activity_manager = await db('activity_manager')
      .where({ id: activity_manager_id })
      .first();

    if (activity_manager.length) {
      ctx.status = 200;
      ctx.body = activity_manager;
    } else {
      ctx.status = 204;
    }
  } catch (err) {
    ctx.status = 404;
  }
};

module.exports = { activity, activities, activity_manager };
