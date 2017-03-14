const knex = require('./db');
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

module.exports = {
  User: bookshelf.Model.extend({
    // Bookshelf assumes that table names are plurals 
    // and that the foreign key is the singular name of the related table fixed with _id
    tableName: "users"
  }),

  List: bookshelf.Model.extend({
    tableName: "lists"
  }),

  Store: bookshelf.Model.extend({
    tableName: "stores"
  }),

  Type: bookshelf.Model.extend({
    tableName: "types"
  }),

  Category: bookshelf.Model.extend({
    tableName: "categories"
  }),

  Bookshelf: bookshelf
}