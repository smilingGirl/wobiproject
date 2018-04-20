var tingodb = require('tingodb')();
var path = require('path');

// Initialize a new TingoDB in local file system
var db = new tingodb.Db(path.join(__dirname, './db'), {});

var wobicol = db.collection('WoBiCol');

wobicol.insert("test");

exports.db = db;
