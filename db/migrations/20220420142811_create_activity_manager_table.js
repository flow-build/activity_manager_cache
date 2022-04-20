/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('activity_manager', table => {
      table.uuid("id").primary();
      table.timestamp("created_at").notNullable();
      table.string("type").notNullable();
      table.uuid("process_state_id").notNullable();
      table.jsonb("props").notNullable();
      table.jsonb("parameters").notNullable();
      table.string("status").notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('activity_manager')
};
