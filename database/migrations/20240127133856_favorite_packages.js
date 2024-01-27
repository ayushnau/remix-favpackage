/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (table) {
  table.uuid("uuid").notNullable().primary();
  table.string("name", 255);
  table.text("description");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("fav_packages");
};
