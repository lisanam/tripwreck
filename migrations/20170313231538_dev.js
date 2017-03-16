
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
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

    knex.schema.createTable('lists', (table) => {
      table.increments('id').primary();
      table.string('title')
        .defaultTo('New List')
        .nullable(false);
      table.text('description');
      table.integer('user_id')
        .references('id')
        .inTable('users')
        .nullable(false);
      table.string('user_name');
      table.string('city');
      table.timestamps();
    }),

    knex.schema.createTable('stores', (table) => {
      table.increments('id').primary();
      table.string('name')
        .nullable(false);
      table.integer('phone').unique();
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

    knex.schema.createTable('types', (table) => {
      table.increments('id').primary();
      table.string('name')
        .unique()
        .nullable(false);
    }),

    knex.schema.createTable('categories', (table) => {
      table.increments('id').primary();
      table.string('name')
        .unique()
        .nullable(false);
    }),

    knex.schema.createTable('shared_lists', (table) => {
      table.integer('user_id')
        .references('id')
        .inTable('users');
      table.integer('list_id')
        .references('id')
        .inTable('lists');
    }),

    knex.schema.createTable('lists_stores', (table) => {
      table.integer('list_id')
        .references('id')
        .inTable('lists');
      table.integer('store_id')
        .references('id')
        .inTable('stores');
    }),

    knex.schema.createTable('stores_categories', (table) => {
      table.integer('store_id')
        .references('id')
        .inTable('stores');
      table.integer('category_id')
        .references('id')
        .inTable('categories');
    })
  ])
      
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
    .dropTable('lists')
    .dropTable('stores')
    .dropTable('types')
    .dropTable('categories')
    .dropTable('shared_lists')
    .dropTable('lists_stores')
    .dropTable('stores_categories');
};
