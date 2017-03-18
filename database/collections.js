const knex = require("./db.js");
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
  //can be used with async/await
  //name is always in lowercase

//find type_id and make new type if it does not exist
Collections.Types.prototype.findOrCreateId = (typeName) => {
  typeName = typeName.trim().toLowerCase();
  return new Promise((resolve, reject) => {
    Collections.Types
      .query({where: {name: typeName}})
      .fetchOne()
      .then((type) => {
        if(type) {
          resolve(type.id);
        }

        //make new type if type doesn't exist
        new Models.Type({name: typeName})
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

//find category_id and make new category if it does not exist
Collections.Categories.prototype.findOrCreateId = (categoryName) => {
  categoryName = categoryName.trim().toLowerCase();
  return new Promise((resolve, reject) => {
    Collections.Categories
      .query({where: {name: categoryName}})
      .fetchOne()
      .then((category) => {
        if(category) {
          resolve(category.id);
        }

        //make new category if category doesn't exist
        new Models.Category({name: categoryName})
          .save()
          .then((category) => {
            resolve(category.id);
          })
          .catch((err) => {
            reject('cannot create new Category Model ' + err);
          });
      })
      .catch((err) => {
        reject('cannot query Categories Collection ' + err);
      });
  });
}

//find category_ids and make new categories if it does not exist
Collections.Categories.prototype.findOrCreateIds = (categoryArr) => {
  categoryArr = categoryArr.map((categoryName) => {
    //remove spaces and lowercase category names
    return categoryName.trim().toLowerCase();
  })
  return new Promise((resolve, reject) => {
    knex.select('id').from('categories').whereIn('name', categoryArr)
      .then((ids) => {
        ids = ids.map((id) => {
          return id.id;
        })
        if(ids.length === categoryArr.length) {
          resolve(ids);
        }
        //Create tempory table with category names
        knex.raw('CREATE TABLE temp (name varchar(255));')
          .then((table) => {
            var categoryNames = `('${categoryArr.join("'),('")}')`;
            knex.raw(`INSERT INTO temp (name) VALUES ${categoryNames};`)
              .then(() => {
                //select category names that doesn't exist in categories table
                knex.select('name').from('temp')
                .whereRaw('name NOT IN(SELECT name FROM categories)')
                .then((names)=> {
                  //Drop temp table
                  knex.raw('DROP TABLE temp;')
                    .then(() => {
                      //make new categories that doesn't exist
                      var newCategories = Collections.Categories.forge(names);
                      newCategories.invokeThen('save')
                        .then((newCategories) => {
                          //get ids of newCategories
                          newCategories.forEach((idObj) => {
                            ids.push(idObj.id);
                          })
                          resolve(ids);
                        })
                        .catch((err) => {
                          resolve("cannot create new categories " + err);
                        })
                    })
                    .catch((err) => {
                      resolve("cannot drop temp table " + err);
                    })
                })
                .catch((err) => {
                  resolve("cannot select names that doesn't exist in categories table" + err);
                });
              })
              .catch((err) => {
                resolve("cannot insert into temp table " + err);
              });
          })
          .catch((err) => {
            resolve("cannot create temp table " + err);
          });
      })
      .catch((err) => {
        resolve("cannot select from categories " + err);
      });
  });
}

//add new store in database with store obj from client
//TODO 
  //ADD Category
    //query Category
      //if exist get id
      //else make new category
    //attach category_ids
Collections.Stores.prototype.addNew = async((storeInfo) => {
  return new Promise((resolve, reject) => {
    //get type_id from type_name
    var Types = new Collections.Types();
    var type_id = await(Types.findTypeId(storeInfo.type));
    
    //make new store model with storeInfo
    new Models.Store({
      name: storeInfo.name,
      zomato_id: storeInfo.zomato_id,
      location: storeInfo.location,
      //change JSON/javascript array to postgres array
      address: [JSON.stringify(storeInfo.address)],
      thumb: storeInfo.thumb,
      price: storeInfo.price,
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

//find store_id and make new store if needed
Collections.Stores.prototype.findOrCreateId = async((storeInfo) => {
  return new Promise((resolve, reject) => {
    Collections.Stores.query({ where: {
        name: storeInfo.name,
        location: storeInfo.location
      }})
      .fetchOne()
      .then((store) => {
        if(store) {
          resolve(store.id);
        }

        //make new store if type doesn't exist
        var newStore = await(Collections.Stores.addNew(storeInfo));
        resolve(newStore.id);
        
      })
      .catch((err) => {
        reject('cannot query store collection ' + err);
      });
  });
});



module.exports = Collections;
