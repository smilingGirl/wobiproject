var express = require('express');
var db = require('../../db.js').db;

var router = express.Router();

// ==============================================
// Database Access
// ==============================================

/**
 * Get all existing countries for a specific world
 *
 * @param worldId world ID
 * @return {Array} List of countries associated with specific world
 */
exports.getCountries = function(worldId) {
    return new Promise(function (resolve, reject) {
      var wobiCol = db.collection('WoBiCol');
      var query = {
        type: 'country',
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
 * Add new country to specific world
 *
 * @param country country data
 * @param worldId Country Details
 */
exports.addCountry = function(worldId, country)  {
    return new Promise(function (resolve, reject) {
      var wobiCol = db.collection('WoBiCol');
  
      // Add the User ID as a property for later lookup
      var newCountry = country;
      newCountry.worldId = worldId;
  
      wobiCol.insert(newCountry, function (error, result) {
        resolve(result);
      });
    });
  };
  

/**
 * Get country by ID
 *
 * @param worldId world ID
 * @param countryId country ID
 * @return {Object} country or null if not found
 */
exports.getCountryById = function(worldId, countryId) {
    return new Promise(function (resolve, reject) {
      var wobiCol = db.collection('WoBiCol');
      var query = {
        _id: countryId,
        type: 'country',
        worldId: worldId
      };
      wobiCol.findOne(query, function (error, item) {
        resolve(item);
      });
    });
  }
