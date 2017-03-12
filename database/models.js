const knex = require('knex')({
  client: 'postgresql',
  connection: {
    host     : '127.0.0.1',
    port     : 8080,
    user     : 'cnc',
    password : 'cups',
    database : 'tripwreckTest',
    // host     : process.env.SERVER_IP,
    // port     : process.env.SERVER_PORT,
    // user     : process.env.PG_USER,
    // password : process.env.PG_PASSWORD,
    // database : process.env.PG_DB_NAME,
    charset : 'UTF8_GENERAL_CI'
  }
});

const bookshelf = require('bookshelf')(knex);
bookshelf.plugin("visibility");

module.exports = {
  User: bookshelf.Model.extend({
    // Bookshelf assumes that table names are plurals 
    tableName: "users",
    list: function() {
      // and that the foreignkey is the singular name of the related table fixed with _id
      // one-to-many
      this.hasMany(List, "list_id");
    }
  }),
  List: bookshelf.Model.extend({
    tableName: "lists",
    created_by: function() {
      // one-to-many
      return this.belongsTo(User, "user_id");
    }
  }),
  Bookshelf: bookshelf
}

// Customers.collection().fetch().then(function (collection) {
//   console.log(collection);
// });