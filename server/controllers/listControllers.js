//Database
const listsCollection = require('../../database/collections').Lists;
const Lists = new listsCollection();

//Node v7 do not support async/await
const async = require('asyncawait/async');
const await = require('asyncawait/await');

var list = require('../../database/seeds/examples/addList');

module.exports = {
  //add new List
  addMyList: async((req, res) => {
    var data = req.body;
    var listId = await(Lists.make(data));
    res.status(201).send(listId);
  }),

  //add sharedList
  addSharedList: async((req, res) => {
    var userId = req.body.userId;
    var listId = req.body.listId;
    await(Lists.addSharedList(userId, listId));
    res.status(201);
  }),

  //get detailed informations on stores in a list
  getList: async((req, res) => {
    var listId = req.body.listId;
    var list = await(Lists.getInfo(listId));
    res.status(200).send(list);
  }),

  //get all lists associated with a user
  getLists: async((req, res) => {
    var userId = req.body.userId;
    var myList = await(Lists.getMyLists(userId));
    var sharedList = await(Lists.getSharedLists(userId));
    
    res.status(200).send({
      myList: myList,
      sharedList: sharedList
    });

  }),

  //edit a list
  updateList: (req, res) => {
    var data = req.body;
    //delete the list and create new list
    await(Lists.deleteMyLists(data.listId));
    var listId = await(Lists.make(data));
    res.status(201).send(listId);
  },

  //delete myList (list I created)
  deleteMyList: async((req, res) => {
    var listId = req.body.listId;
    await(Lists.deleteMyLists(listId));
    res.status(200);
  }),

  //delete a sharedList (list someone shared with me)
  deleteSharedList: async((req, res) => {
    var userId = req.body.userId;
    var listId = req.body.listId;
    await(Lists.deleteSharedList(userId, listId));
    res.status(200);
  })

  //delete multiple lists
  
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