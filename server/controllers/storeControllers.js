var async = require('asyncawait/async');
var await = require('asyncawait/await');
var request = require('request');

//Zomato HTTP request options
const HTTPOptions = {
  url: 'https://developers.zomato.com/api/v2.1',
  //ZOMATO_KEY is required in env file
  headers: {'user_key' : process.env.ZOMATO_KEY}
};

//Helper function - find city_id from city_name
const findLocation = function(city_name) {
  return new Promise((resolve, reject) => {
    // Copy HTTPOptions
    var options = JSON.parse(JSON.stringify(HTTPOptions));
    //add city_name to HTTP request url
    options.url += '/cities?q=' + city_name;
    
    //find location through Zomato
    request(options, function(error, response, data) {
      if(error) {
        console.log("We find this city");
        throw error;
      }

      //get location data
      var result = JSON.parse(data).location_suggestions[0];
      var city_state = result.name.split(',');
      !result ? reject() : resolve({
        city_id: result.id,
        city_name: city_state[0].trim(),
        state_name: city_state[1].trim(),
        country_name: result.country_name
      });

    }).end();
  });
}

//Helper function - change format of store info received from API
const getResturantInfo = function(info, location) {
  return {
    zomato_id: info.id,
    name: info.name,
    phone: info.phone_number,
    location: [info.location.latitude, info.location.longitude],
    //get state and country name from previous location query
    address: [
      info.location.address, info.location.locality, 
      info.location.city, location.state_name, 
      info.location.zipcode, location.country_name
    ],
    thumb: info.thumb,
    price: info.price_range,
    type: 'restaurant',
    categories: info.cuisines.split(','),

    //for details
    rating: info.user_rating.aggregate_rating,
    votes: info.user_rating.votes
  };

  //photos are not given in Zomato anymore
  // if(info.photos) {
  //   var photos = info.photos.map((photo) => {
  //     return {
  //       url: photo.url,
  //       user: photo.user.name,
  //       caption: photo.caption,
  //       likes: photo.likes_count,
  //       timestamp: photo.timestamp,
  //       friendly_time: photo.friendly_time
  //     }
  //   });
  //   store.photos = photos;
  // }
} 

module.exports = {
  getSearchResults: async (function(req, res) {

    // find city_id defaults to 280(New York City)
    var city = req.query.city;
    var location = await (findLocation(city));
    var city_id = location.city_id || 280;
    // search keyword defaults to ''
    var keyword = req.query.keyword || '';

    // Copy HTTPOptions
    var options = JSON.parse(JSON.stringify(HTTPOptions));
    //modify url to include search parameters
    options.url += '/search?entity_type=city'
    options.url += '&entity_id=' + city_id;
    options.url += '&q=' + keyword;
    //make a search request to Zomato
    request(options, function(error, response, data) {
      if(error) {
        console.log("We cannot get search results from Zomato");
        throw error;
      }

      //get restaurant data
      var results = JSON.parse(data).restaurants.map((restaurant) => {
        return getResturantInfo(restaurant.restaurant, location);
      });
      res.send(200, results);
    }).end();

  }),

  getReviews: function(req, res) {
    var zomato_id = req.query.zomato_id;
    //copy HTTPOptions
    var options = JSON.parse(JSON.stringify(HTTPOptions));
    //find resturant reviews with zomato_id
    options.url += '/reviews?res_id=' + zomato_id;
    
    //request reviews information from Zomato
    request(options, function(error, response, data) {
      if(error) {
        console.log("We cannot get this store's information from Zomato");
        throw error;
      }

      //reformat reviews
      var reviews = JSON.parse(data).user_reviews;
      var results = reviews.map((review) => {
        review = review.review;
        return {
          rating: review.rating,
          user: review.user.name,
          text: review.review_text,
          likes: review.likes,
          timestamp: review.timestamp,
          friendly_time: review.review_time_friendly
        }
      });
      res.send(200, results);
    }).end();
  }
};