//Database
const Collections = require('../../database/collections');
const Models = require('../../database/models');
const knex = require('../../database/db');

//Node v7 do not support async/await
const async = require('asyncawait/async');
const await = require('asyncawait/await');

var list = require('../../database/seeds/examples/addList');

module.exports = {
  addList: async((req, res) => {
    var data = req.body;
    var list = data.list;

    //find storeIds
    var Stores = new Collections.Stores();
    var storeIds = await(Stores.findOrCreateIds(list));
    console.log('storeIds', storeIds)
    //make new list
    new Models.List({
      title: data.title,
      user_id: data.userId,
      user_name: data.userName,
      description: data.description,
      city: data.city
    }).save()
      .then((list) => {
        console.log('list', list, 'storeIds', storeIds)
        
        //add list_id and store_id to lists_stores table

        //attach in raw knex
          // storeIds = storeIds.map((storeId) => {
          //   return `${list.id},${storeId}`
          // })
          // var query = `insert into lists_stores (list_id, store_id) values (${storeIds.join("),(")});`;
          // Models.Bookshelf.knex.raw(query)


        list.stores().attach(storeIds)
          .then(() => {
            res.status(201).send();
          })
          .catch((err) => {
            console.log("cannot attach storeIds to list " + err);
          });
      })
      .catch((err) => {
        console.log("cannot create new list " + err);
      })

  }),
  getList: async((req, res) => {
    var listId = req.body.listId;

    Models.List.where({id: listId})
      .fetch({withRelated: ['stores.type', 'stores.categories']})
      .then((list) => {
        res.status(200).send(list)
      })
      .catch((err) => {
        console.log("cannot find a list with listId " + err);
      });

  }),
  getLists: async((req, res) => {
    var userId = req.body.userId;
    var Users = new Collections.Users();
      
    var myList = await(Users.getMyLists(userId));
    var sharedList = await(Users.getSharedLists(userId));
    
    res.status(200).send({
      myList: myList,
      sharedList: sharedList
    });

  }),
  updateList: (req, res) => {
  },
  deleteList: (req, res) => {
    var listId = req.body.listId;
    //delete all relations list has in lists_stores table
    //use detach
    knex('lists_stores').where('list_id', listId).del()
      .then(() => {
        //delete the list
        knex('lists').where('id', listId).del()
          .then(() => {
            res.status(200);
          })
          .catch((err) => {
            console.log("cannot delete from lists " + err);
          })
      })
      .catch((err) => {
        console.log("cannot delete from lists_stores " + err);
      })
  },
};

// var Types = new Collections.Types();
    // var id = await(Types.findOrCreateId('shopping'));
    // console.log('type_id', id);

    // var Categories = new Collections.Categories();
    // console.log(Collections.Categories)
    // var id = await(addCategoryIds(list[0].categories));

    // var Stores = new Collections.Stores();
    // var result = await(Stores.addNew(list[0]));
    // console.log('new Store', result);

    // var Categories = new Collections.Categories();
    // var id = await(Categories.findOrCreateId('Cake'));
    // var ids = await(Categories.findOrCreateIds([ 'Desserts', ' Japanese', ' Korean' ]));
    // console.log('id', id, ids)