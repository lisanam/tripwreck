var request = require('request');

//Zomato HTTP request options
const HTTPOptions = {
  url: 'https://developers.zomato.com/api/v2.1',
  //ZOMATO_KEY is required in env file
  headers: {'user_key' : '12442e62ae47c1682a8cfccc4d0fc871'}
};

//Helper function - change format of info received from API
const getResturantInfo = function(info) {
  return {
    zomato_id: info.id,
    name: info.name,
    phone: info.phone_number,
    location: [info.location.latitude, info.location.longitude],
    //state and country name is missing
    address: [
      info.location.address, info.location.locality, 
      info.location.city, '', info.location.zipcode, ''
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

var controllers = {
  getSearchResults: function(req, res) {
    // locationId defaults to 280(New York City)
    var locationId = 280;
    // search keyword defaults to food
    var keyword = 'food';

    // Copy HTTPOptions
    var options = JSON.parse(JSON.stringify(HTTPOptions));
    //modify url to include search parameters
    options.url += '/search?entity_type=city'
    options.url += '&entity_id=' + locationId;
    options.url += '&q=' + keyword;
    
    //make a search request to Zomato
    request(options, function(error, response, data) {
      if(error) {
        console.log("We cannot get search results from Zomato");
        throw error;
      }

      //get restaurant data
      var results = JSON.parse(data).restaurants.map((restaurant) => {
        return getResturantInfo(restaurant.restaurant);
      })
      console.log(results)
      res.send(200, results);
    }).end();

  },

  getReviews: function(req, res) {
    zomatoId = 16774318;
    //copy HTTPOptions
    var options = JSON.parse(JSON.stringify(HTTPOptions));
    //find resturant reviews with zomato_id
    options.url += '/reviews?res_id=' + zomatoId;
    
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
}

controllers.getReviews();