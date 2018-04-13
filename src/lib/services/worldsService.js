var express = require('express');
var db = require('../../db.js').db;

var router = express.Router();

// ==============================================
// Database Access
// ==============================================

/**
 * Get all existing worlds
 *
 * @return {Array} List of worlds
 */
exports.getWorlds = function() {
  return new Promise(function (resolve, reject) {
    var wobiCol = db.collection('WoBiCol');
    var query = {
      type: 'world',
    };
    wobiCol.find(query).toArray(function (error, list) {
      list.forEach(function (part, index, theArray) {
        theArray[index] = part; // eslint-disable-line no-param-reassign
      });

      resolve(list);
    });
  });
}

/**
 * Add new world
 *
 * @param world world data
 * @return {Object} World Details
 */
exports.addWorld = function(world)  {
  return new Promise(function (resolve, reject) {
    var wobiCol = db.collection('WoBiCol');

    // Add the User ID as a property for later lookup
    var newWorld = world;

    wobiCol.insert(newWorld, function (error, result) {
      resolve(result[0]);
    });
  });
};

/**
 * Get world by id
 *
 * @param worldId world ID
 * @return {Object} world or null if not found
 */
exports.getWorldById = function(worldId) {
  return new Promise(function (resolve, reject) {
    var wobiCol = db.collection('WoBiCol');
    var query = {
      _id: worldId,
    };
    wobiCol.findOne(query, function (error, item) {
      resolve(item);
    });
  });
}

/**
 * Remove world
 *
 * @param worldId world ID
 */
exports.removeWorld = function(worldId) {
  return new Promise(function (resolve, reject) {
    var wobiCol = db.collection('WoBiCol');
    var query = {
      _id: worldId,
    };
    wobiCol.remove(query, function (error, item) {
      resolve();
    });
  });
}

/**
 * Update world
 *
 * @param worldId world ID
 * @param world world data
 * @return {Object} World Details
 */
exports.updateWorld = function(worldId, world) {
  return new Promise(function (resolve, reject) {
    var WoBiCol = db.collection('WoBiCol');
    var query = {
      _id: worldId,
    };

    // Add the World ID as a property for later lookup
    var newWorld = world;
    //newWorld.id = worldId;

    WoBiCol.update(query, newWorld, function (error, item) {
      resolve(item);
    });
  });
};