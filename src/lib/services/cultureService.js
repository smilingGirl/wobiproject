var express = require('express');
var db = require('../../db.js').db;

var router = express.Router();

// ==============================================
// Database Access
// ==============================================

/**
 * Get all existing cultures for a specific world
 *
 * @param worldId world ID
 * @return {Array} List of cultures associated with specific world
 */
exports.getCultures = function(worldId) {
    return new Promise(function (resolve, reject) {
      var wobiCol = db.collection('WoBiCol');
      var query = {
        type: 'culture',
        worldId: worldId
      };
      wobiCol.find(query).toArray(function (error, list) {
        list.forEach(function (part, index, theArray) {
          theArray[index] = part; 
        });
  
        resolve(list);
      });
    });
  }

/**
 * Add new culture to specific world
 *
 * @param culture culture data
 * @param worldId world ID
 * @return {Object} Culture Details
 */
exports.addCulture = function(worldId, culture)  {
    return new Promise(function (resolve, reject) {
      var wobiCol = db.collection('WoBiCol');
  
      // Add the User ID as a property for later lookup
      var newCulture = culture;
      newCulture.worldId = worldId;
  
      wobiCol.insert(newCulture, function (error, result) {
        resolve(result);
      });
    });
  };
  

/**
 * Get culture by ID
 *
 * @param worldId world ID
 * @param cultureId culture ID
 * @return {Object} culture or null if not found
 */
exports.getCultureById = function(worldId, cultureId) {
    return new Promise(function (resolve, reject) {
      var wobiCol = db.collection('WoBiCol');
      var query = {
        _id: cultureId,
        type: 'culture',
        worldId: worldId
      };
      wobiCol.findOne(query, function (error, item) {
        resolve(item);
      });
    });
  }
