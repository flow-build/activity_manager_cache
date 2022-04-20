/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('user_activity_manager', (table) => {
    table.uuid('id').primary();
    table.timestamp('created_at').notNullable();
    table.uuid('actor_id');
    table.uuid('activity_manager_id').references('activity_manager.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('user_activity_manager');
};
