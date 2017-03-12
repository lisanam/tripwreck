var Schema = require("./schema.js");
var Moment = require("moment");
var Promise = require("bluebird");
var Async = require("async");
var _ = require("lodash");
var Model = require("./models.js");

var createTable = function (tableName) {
	return Model.Bookshelf.knex.schema.createTable(tableName, function (table) {
		var column;
		var columnKeys = _.keys(Schema[tableName]);

		columnKeys.forEach(function (key) {
      var field = Schema[tableName][key];
			if (field.type === "text" && field.hasOwnProperty("fieldtype")) {
				column = table[field.type](key, field.fieldtype);
			} else if (field.type === "string" && field.hasOwnProperty("maxlength")) {
				column = table[field.type](key, field.maxlength);
			} else {
				column = table[field.type](key);
			}
			
			if (field.hasOwnProperty("nullable") && field.nullable === true) {
				column.nullable();
			} else {
				column.notNullable();
			}

			if (field.hasOwnProperty("primary") && field.primary === true) {
				column.primary();
			}

			if (field.hasOwnProperty("unique") && field.unique === true) {
				column.unique();
			}

			if (field.hasOwnProperty("unsigned") && field.unsigned === true) {
				column.unsigned();
			}

			if (field.hasOwnProperty("references")) {
				column.references(field.references);
			}

			if (field.hasOwnProperty("defaultTo")) {
				column.defaultTo(field.defaultTo);
			}
		});
	});
};

//change to knex.schema.createTableIfNotExists
var doesTableExist = function (tableName) {
	return Model.Bookshelf.knex.schema.hasTable(tableName);
};

var initDb = function () {
	var calls = [];
	var tableNames = _.keys(Schema);

	tableNames.forEach(function (tableName) {

		var f = function (callback) {
			doesTableExist(tableName)
			.then(function (exists) {
				if (!exists) {
					console.log("Creating database table " + tableName + "...");

					createTable(tableName)
					.then(function (result) {
						console.log("---> Created database table " + tableName);
						callback(null, result);
					})
					.catch(function (err) {
						console.log("Error creating " + tableName + " table " + err);
						callback(err, null);
					});

				} else {
					callback(null, exists);
				}
			})
			.catch(function (error) {
				console.log("Error checking existence of " + tableName + " table " + error);
				callback(error, null)
			});
		};

		calls.push(f);
	});

	Async.series(calls, function (err, result) {
		err ?
      console.log("Error initialising database table: " + err) :
		  console.log("Finished initialising database table");
	});
};

exports.initialisation = initDb;