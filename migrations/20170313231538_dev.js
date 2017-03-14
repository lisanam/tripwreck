
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('auth_id')
        .unique()
        .nullable(false);
      table.integer('phone')
        .unique();
      table.string('language')
        .defaultTo('EN');
      table.timestamps();
    }),

    knex.schema.createTable('lists', function(table){
      table.increments('id').primary();
      table.string('title');
      table.string('description');
      table.string('city');
      table.integer('uid')
        .references('id')
        .inTable('users');
      table.timestamps();
    }),

    knex.schema.createTable('stores', function(table){
      table.increments('id').primary();
      table.string('name');
      table.integer('phone');
      table.specificType('location', 'jsonb[]');
      table.specificType('address', 'jsonb[]');
      table.string('zomato_id');
      table.string('thumb');
      table.integer('price');
      table.integer('type_id')
        .references('id')
        .inTable('types');
      table.timestamps();
    }),

    knex.schema.createTable('types', function(table){
      table.increments('id').primary();
      table.string('name');
    }),

    knex.schema.createTable('categories', function(table){
      table.increments('id').primary();
      table.string('name');
    }),
  ])
      
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('lists'),
    knex.schema.dropTable('stores'),
    knex.schema.dropTable('types'),
    knex.schema.dropTable('categories')
  ])
};
