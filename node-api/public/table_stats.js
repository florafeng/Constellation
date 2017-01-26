"use strict";

function getJson(connectionParams, cb) {

	var knex = require('knex')({
		client: 'pg',
		connection: connectionParams
	});

  var retVal;

	knex('pg_stat_user_tables').select(
    'relid, schemaname, relname, seq_scan, seq_tup_read, idx_scan, '
    + 'idx_tup_fetch, n_tup_ins, n_tup_upd, n_tup_del')
    .then(function(row) {
      retVal = JSON.stringify(row);
      console.log(retVal);
  }).finally(function(row) {
    cb(null, retVal);
    knex.destroy();
    return null;
	})
}

module.exports = getJson;
