/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("favourites_packages", (table) => {
    table.uuid("uuid").notNullable().primary();
    table.string("name", 255);
    table.text("description");
    table.string("filelocation", 255);
    table.string("fileName", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("favourites_packages");
};
