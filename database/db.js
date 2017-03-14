var config      = require('../knexfile.js');  
var env         = 'development';  
const knex      = require('knex')(config[env]);

module.exports = knex;

knex.migrate.latest([config]); 