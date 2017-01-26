var express = require('express');
var dbConnect = require('../public/db-test.js');
var dbQueryTable = require('../public/db-query-table.js');
var dbTableStats = require('../public/table_stats.js');
var router = express.Router();

var getDbCredentials = function(req) {
  return {
    database: req.body.db,
    user: req.body.user,
    password: req.body.password,
    host: req.body.host,
    port: req.body.port,
    ssl: req.body.ssl
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  console.log(getDbCredentials(req));
  dbConnect(getDbCredentials(req), function(err, results) {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

router.post('/:tableName', function(req, res, next) {
  dbQueryTable(getDbCredentials(req), req.params.tableName, function(err, results) {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

router.post('/stats', function(req, res, next) {
  dbTableStats(getDbCredentials(req), function(err, results) {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;
