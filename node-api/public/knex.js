var PG_CONNECTION_STRING = {
	user: 'haqgjczsewuoim',
	password: 'Oygd5GBvgRmlfrlOcWQwUvgYkC',
	database: 'd2tjg1p6301ri2',
	host: 'ec2-23-21-100-145.compute-1.amazonaws.com',
	port: 5432,
	ssl: true
};

var knex = require('knex')({
  client: 'pg',
  connection: PG_CONNECTION_STRING
});

knex('students').select('*').then(function(row) {


	console.log(row);
}).finally(function(row) {
	knex('students').count('id').then(function(row) {
		console.log(row[0].count + " records found.")
	}).finally(function() {
		knex.destroy();
	});
});
