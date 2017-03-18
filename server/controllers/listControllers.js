//Database
const Collections = require('../../database/collections');
const Models = require('../../database/models');

//Node v7 do not support async/await
const async = require('asyncawait/async');
const await = require('asyncawait/await');

var list = require('../../database/seeds/examples/addList')

//Helper function - find array of category_ids and make new category if needed
const addCategoryIds = (categoryArr) => {
  return new Promise((resolve, reject) => {
    Collections.Categories
      .query({
        whereIn: ['name', categoryArr]
      })
      .fetch()
      .then((categories) => {
        var category_ids = categories.map((category) => {
          return category.id;
        })
        
        if(categories.length >= categoryArr.length) {
          resolve(category_ids);
        }
        var models = categoryArr.map((category) => {
          return {name: category.trim()};
        });

        var categories = Collections.Categories.forge(models);

        categories.invokeThen('save')
          .then((collection) => {
            //get category_ids of newly added categories
            category_ids = collection.map((category) => {
              return category.id;
            })
            resolve(category_ids);
          })
          .catch((err) => {
            reject('cannot create new Category Model ' + err);
          })

      })
      .catch((err) => {
        reject('cannot query categories ' + err);
      });
  });
}


module.exports = {
  addList: async(function(req, res) {
    // var list = req.body.list;

    // var Types = new Collections.Types();
    // var id = await(Types.findOrCreateId('shopping'));
    // console.log('type_id', id);

    // var Categories = new Collections.Categories();
    // console.log(Collections.Categories)
    // var id = await(addCategoryIds(list[0].categories));

    // var Stores = new Collections.Stores();
    // var result = await(Stores.addNew(list[0]));
    // console.log('new Store', result);

    var Categories = new Collections.Categories();
    var id = await(Categories.findOrCreateId('Cake'));
    var ids = await(Categories.findOrCreateIds([ 'Desserts', ' Japanese', ' Korean' ]));
    console.log('id', id, ids)

    // new Models.User({auth_id: '123456'})
    //   .fetch()
    //   .then(function(user) {
    //       console.log('user', user)
    //       // Collections.Users.query()
    //       //   .whereIn('auth_id', '123456').del()
    //       //   .then((user) => {
    //       //     console.log(user, 'deleted')
    //       //   })
    //       return user.addList('1');
    //   });

          res.status(201).send();
  }),
  getList: function(req, res) {
  },
  getLists: function(req, res) {
  },
  updateList: function(req, res) {
  },
  deleteList: function(req, res) {
    var listId = req.body.listId;

  },
};