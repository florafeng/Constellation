"use strict";

var pg = require('pg');
var pgStructure = require('pg-structure');

// DB detail
// var DATABASE = 'd2tjg1p6301ri2';
// var USER = 'haqgjczsewuoim';
// var PASSWORD = 'Oygd5GBvgRmlfrlOcWQwUvgYkC';
// var HOST = 'ec2-23-21-100-145.compute-1.amazonaws.com';
// var PORT = 5432;
// var SSL = true;


function getJson(connectionParams, cb) {
  // var PG_CONNECTION_STRING = {
  //   database: database,
  //   user: user,
  //   password: password,
  //   host: host,
  //   port: port,
  //   ssl: ssl
  //   };
  console.log('calling function');
  pgStructure(connectionParams,
    ['public', 'other_schema'])
      .then((db) => {

          // Map of Table objects.
          var tables = db.schemas.get('public').tables;
          var json = { tables: [] };

          // Iterating over table
          tables.forEach(function(tableObj) {
            var jsonEle = {};
            var relationships = {};

            // Define table name
            jsonEle["name"] = tableObj.name;

            // Iterating over column
            var tableCol = [];

            for (let column of tableObj.columns.values()) {

              // Define array of column names
              tableCol.push(column.name);
              jsonEle["columns"] = tableCol;

              if (column.foreignKeyConstraints.size > 0) {

                for (let constraint of column.foreignKeyConstraints.values()) {

                  var relationshipEle = {};
                  var key = constraint.referencedTable.name;
                  relationshipEle["from"] = column.name;
                  relationshipEle["to"] = "id";

                  relationships[key] = relationshipEle;

                }
              }
            }

            // Define table relationships
            jsonEle["relationships"] = relationships

            //Contruct json
            json["tables"].push(jsonEle);

          }, this);
          // console.log(json);

          // get sizes
          var knex = require('knex')({
            client: 'pg',
            connection: connectionParams
          });

          var counter = 0;
          var thisTable;
          json.tables.forEach(function(table) {

            knex(table.name).count()

            .then(function(row) {
              console.log(row[0].count + " records found in table " + table.name);
              thisTable = json.tables.find(function(t) { return t.name == table.name })
              thisTable["size"] = row[0].count
              counter++;
            })

            .finally(function(row) {
              if (counter == json.tables.length) {
                console.log('Success!!! -->' + json)
                knex.destroy();
                cb(null, json);
                return null;
              }
            });
          })
      })
      .catch(err => cb(err, null));
  }

// getJson(DATABASE, USER, PASSWORD, HOST, PORT, SSL, function(err, results){
//   if (err) {console.log(err)}
//
//   console.log(results)
// })

module.exports = getJson;
