const Models = require("./models.js");

//Node v7 do not support async/await
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const Collections = {
  Users: Models.Bookshelf.Collection.extend({
    model: Models.User
  }),

  Lists: Models.Bookshelf.Collection.extend({
    model: Models.List
  }),

  Stores: Models.Bookshelf.Collection.extend({
    model: Models.Store
  }),

  Types: Models.Bookshelf.Collection.extend({
    model: Models.Type
  }),

  Categories: Models.Bookshelf.Collection.extend({
    model: Models.Category
  })
};

//Custom function for Collections
  //Needs to be used with async/await

//find type_id and make new type if it does not exist
Collections.Types.prototype.findTypeId = (type_name) => {
  return new Promise((resolve, reject) => {
    this.query({where: {name: type_name}})
      .fetchOne()
      .then((type) => {
        if(type) {
          resolve(type.id);
        }

        //make new type if type doesn't exist
        new Models.Type({name: type_name})
          .save()
          .then((type) => {
            resolve(type.id);
          })
          .catch((err) => {
            reject('cannot create new Type Model ' + err);
          })
      })
      .catch((err) => {
        reject('cannot query Types Collection ' + err);
      });
  });
}

//find category_ids and make new categories if it does not exist
//TODO
  //finish this function
Collections.Categories.prototype.findCategoryIds = (categoryArr) => {
  // console.log('this', this)
  // return new Promise((resolve, reject) => {
  //   this.query({where: {name: categoryArr}})
  //     .fetch()
  //     .then((categories) => {
  //       if(categories.length === categoryArr.length) {
  //         resolve(categories);
  //       }

  //       var models = categoryArr.map((category) => {
  //         return {name: category.name};
  //       })

  //       // const Categories = Models.Bookshelf.Collection.Categories;
  //       console.log('Categories', Categories);
  //       Categories.add(models)
  //         .then((collection) => {
  //           resolve(collection);
  //         })
  //         .catch((err) => {
  //           reject('cannot create new Category Model ' + err);
  //         })
  //     })
  //     .catch((err) => {
  //       reject('cannot query Categories Collection ' + err);
  //     });
  // });
}

//add new store in database with store obj from client
//TODO 
  //ADD Category
    //query Category
      //if exist get id
      //else make new category
    //attach category_ids
Collections.Stores.prototype.addNew = async((store) => {
  return new Promise((resolve, reject) => {
    //get type_id from type_name
    var Types = new Collections.Types();
    var type_id = await(Types.findTypeId(store.type));
    
    //make new store model with store info
    new Models.Store({
      name: store.name,
      zomato_id: store.zomato_id,
      location: store.location,
      //change JSON/javascript array to postgres array
      address: [JSON.stringify(store.address)],
      thumb: store.thumb,
      price: store.price,
      type_id: type_id
    }).save()
      .then((store) => {
        resolve(store);
      })
      .catch((err) => {
        reject('cannot create new store ' + err);
      })
  });
})



module.exports = Collections;
