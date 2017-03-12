const Model = require("./models.js");

module.exports = {
  Users: Model.Bookshelf.Collection.extend({
    model: Model.User
  }),
  Lists: Model.Bookshelf.Collection.extend({
    model: Model.List
  })
};

