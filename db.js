//var util = require('util');
var tingodb = require('tingodb')();
//var path = require('path');

// Initialize a new TingoDB in local file system
var db = new tingodb.Db('./db', {});

var wobicol = db.collection('WoBiCol');

exports.db = db;
