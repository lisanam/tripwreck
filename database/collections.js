const Model = require("./models.js");

module.exports = {
  Users: Model.Bookshelf.Collection.extend({
    model: Model.User
  }),
  Lists: Model.Bookshelf.Collection.extend({
    model: Model.List
  }),
  Stores: Model.Bookshelf.Collection.extend({
    model: Model.Store
  }),
  Types: Model.Bookshelf.Collection.extend({
    model: Model.Type
  }),
  Categories: Model.Bookshelf.Collection.extend({
    model: Model.Category
  })
};

