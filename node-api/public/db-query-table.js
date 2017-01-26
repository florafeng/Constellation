"use strict";

function getJson(connectionParams, tableName, cb) {

  var knex = require('knex')({
  	client: 'pg',
  	connection: connectionParams
  });

  var retVal;

	knex(tableName).select('*').then(function(row) {
    retVal = JSON.stringify(row);
    console.log(retVal);
  }).finally(function(row) {
    cb(null, retVal);
    knex.destroy();
    return null;
	})
}

module.exports = getJson;
