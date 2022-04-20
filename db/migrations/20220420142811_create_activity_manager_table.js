/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('activity_manager', (table) => {
    table.uuid('id').primary();
    table.uuid('process_id').notNullable();
    table.jsonb('props').notNullable();
    table.string('status').notNullable();
    table.timestamp('created_at').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('activity_manager');
};
