const { v1: uuid } = require('uuid');

const p = {
  process_id: uuid(),
  id: uuid(),
  status: 'started',
  props: {
    result: {
      actor_id: uuid(),
    },
  },
};

console.log(JSON.stringify(p));
