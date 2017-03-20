const Collections = require('../../database/collections');
const Users = new Collections.Users();

//Node v7 do not support async/await
const async = require('asyncawait/async');
const await = require('asyncawait/await');

//Implement firebase
//Implement uuid
module.export = {
  signup: async((req, res) => {
    return new Promise(() => {
      //change this after firebse Implementation
      var authId = 'caa47ac6-81d1-408a-8090-6c86cefcfddb';
      var user = await(Users.make(authId));

      //if user is null return 404
      if(!user) {
        res.sendStatus(404);
      }

      res.status(200).send({
        userId: user.id,
        phone: user.phone,
        myLists: [],
        sharedLists: []
      });
    });
  }),

  signin: async((req, res) => {
    return new Promise(() => {
      //change this after firebse Implementation
      var authId = 'caa47ac6-81d1-408a-8090-6c86cefcfdd';

      //find user info with authId
      var user = await(Users.find(authId));

      //if user is null return 404
      if(!user) {
        res.sendStatus(404);
      }

      //get lists created by user
      const Lists = new Collections.Lists();
      var myLists = await(Lists.getMyLists(userId));

      res.status(200).send({
        userId: user.id,
        phone: user.phone,
        myLists: myLists,
        sharedLists: user.lists
      });

    });
  })

  //delete account
    //delete all the list I created
    //delete all the shared list
}