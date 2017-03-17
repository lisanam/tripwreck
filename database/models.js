const knex = require('./db');
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

module.exports = {
  User: bookshelf.Model.extend({
    // Bookshelf assumes that table names are plurals 
    // and that the foreign key is the singular name of the related table fixed with _id
    tableName: "users",
    hasTimestamps: true,

    getMyLists: function(){
      var user_id = this.get('user_id');
      Collections.Lists.fetchAll({user_id: user_id})
        .then((lists) => {
          console.log(lists);
        })
    },

    getSharedLists: function() {

    },

    addList: function(list_id) {
      console.log('added', this);
      var lists = this.getMyLists();
      lists = [list_id].concat(lists);
      this.set('lists', lists);
    },
    deleteList: function(list_id) {
      var lists = this.get('lists');
      var ind = lists.indexOf(list_id);
      var deleted = lists.splice(ind, 1);
      this.set('lists', lists);
      console.log('deleted', deleted, this);
    }
  }),

  List: bookshelf.Model.extend({
    tableName: "lists",
    hasTimestamps: true
  }),

  Store: bookshelf.Model.extend({
    tableName: "stores",
    getInfo: function(id) {
      Store.forge({id: id}).fetch({withRelated: ['types']})  
        .then(function(store) {
            console.log('Got store:', store.get('name'));
            console.log('Got type:', store.related('types'));
        });
    }
  }),

  Type: bookshelf.Model.extend({
    tableName: "types"
  }),

  Category: bookshelf.Model.extend({
    tableName: "categories"
  }),

  Bookshelf: bookshelf
}