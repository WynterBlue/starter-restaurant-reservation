
exports.up = function(knex) {
  return knex.schema.createTable('tables', (table) => {
    table.increments('table_id').primary()
    table.string('table_name').notNullable()
    table.integer('capacity').notNullable()
    table.string('status').defaultTo("free").notNullable()
    table.integer('people').defaultTo(0)
    //reservation_id column; must be foreign key
    table.integer("reservation_id").unsigned()
    table
        .foreign("reservation_id")
        .references("reservation_id")
        .inTable("reservations")
        .onDelete("CASCADE")
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tables')
};