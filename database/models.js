const knex = require('./db');
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

const Models = {
  User: bookshelf.Model.extend({
    // Bookshelf assumes that table names are plurals 
    // and that the foreign key is the singular name of the related table fixed with _id
    tableName: "users",
    hasTimestamps: true,
    lists: function() {
      return this.belongsToMany(Models.List).through(Models.SharedList);
    }
  }),

  List: bookshelf.Model.extend({
    tableName: "lists",
    hasTimestamps: true,
    users: function() {
      return this.belongsToMany(Models.User).through(Models.SharedList)
    },
    stores: function() {
      return this.belongsToMany(Models.Store).through(Models.Lists_Stores);
    }
  }),

  Store: bookshelf.Model.extend({
    tableName: "stores",
    lists: function() {
      return this.belongsToMany(Models.List).through(Models.Lists_Stores);
    },
    categories: function() {
      return this.belongsToMany(Models.Category).through(Models.Store_Categories);
    }
  }),

  Type: bookshelf.Model.extend({
    tableName: "types"
  }),

  Category: bookshelf.Model.extend({
    tableName: "categories",
    stores: function() {
      return this.belongsToMany(Models.Store).through(Models.Stores_Categories);
    }
  }),

  SharedList: bookshelf.Model.extend({
    tableName: "shared_lists"
  }),

  Lists_Stores: bookshelf.Model.extend({
    tableName: "lists_stores",
    // list_id: function() {
    //     return this.hasMany(List);
    // },
    // store_id: function() {
    //     return this.hasMany(Store);
    // }
  }),

  Stores_Categories: bookshelf.Model.extend({
    tableName: "stores_categories"
  }),

  Bookshelf: bookshelf
}

module.exports = Models