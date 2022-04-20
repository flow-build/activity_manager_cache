const { v4: uuid } = require('uuid');
const { _logger } = require('../utils');

class Queue {
  constructor(knexInstance) {
    this._queue = [];
    this._db = knexInstance;
    this._running = false;

    _logger.info('[cache] running ');
  }

  set running(status) {
    this._running = status;
  }

  get running() {
    return this._running;
  }

  push(item) {
    this._queue.push(item);
  }

  pop() {
    if (this.isEmpty) {
      this._running = false;
      return 'empty';
    }

    const [head, ...tail] = this._queue;
    this._queue = tail || [];
    return head;
  }

  get size() {
    return this._queue.length;
  }

  get isEmpty() {
    return !this.size;
  }

  async processQueue() {
    this.running = true;

    while (this._running && !this.isEmpty) {
      try {
        const item = this.pop();

        if (item === 'empty') return;

        const action = item.topic.split('/')[4];

        switch (action) {
          case 'create':
            await this.insert(item);
            break;
          case 'finished':
            await this.delete(item.id);
            break;
          default:
            _logger.info(`[cache] action ${action} not found!`);
            break;
        }
      } catch (err) {
        _logger.error(`[cache] error on processing ${err}`);
        this.running = false;
      }
    }
  }

  async delete(activity_manager_id) {
    return this._db.transaction(async (trx) => {
      await trx('user_activity_manager').where({ activity_manager_id }).del();
      await trx('activity_manager').where({ id: activity_manager_id }).del();
    });
  }

  async insert({ activity_manager, actor_id }) {
    return this._db.transaction(async (trx) => {
      await trx('activity_manager').insert({
        ...activity_manager,
        created_at: new Date(),
      });
      await trx('user_activity_manager').insert({
        id: uuid(),
        actor_id,
        activity_manager_id: activity_manager.id,
        created_at: new Date(),
      });
    });
  }
}

module.exports = { Queue };
