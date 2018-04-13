var express = require('express');
var db = require('../../db.js').db;

var router = express.Router();

// ==============================================
// Database Access
// ==============================================

/**
 * Get all existing characters
 *
 * @param worldId world ID
 * @return {Array} List of characters associated with specific world
 */
exports.getCharacters = function(worldId) {
  return new Promise(function (resolve, reject) {
    var wobiCol = db.collection('WoBiCol');
    var query = {
      type: 'character',
      worldId: worldId,
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
 * Add new character to specific world
 *
 * @param character character data
 * @param worldId world ID
 * @return {Object} Character Details
 */
exports.addCharacter = function(worldId, character)  {
  return new Promise(function (resolve, reject) {
    var wobiCol = db.collection('WoBiCol');

    // Add the User ID as a property for later lookup
    var newCharacter = character;
    newCharacter.worldId = worldId;

    wobiCol.insert(newCharacter, function (error, result) {
      resolve(result);
    });
  });
};

/**
 * Get character by ID
 *
 * @param worldId world ID
 * @param characterId character ID
 * @return {Object} character or null if not found
 */
exports.getCharacterById = function(worldId, characterId) {
  return new Promise(function (resolve, reject) {
    var wobiCol = db.collection('WoBiCol');
    var query = {
      _id: characterId,
      type: 'character',
      worldId: worldId,
    };
    wobiCol.findOne(query, function (error, item) {
      resolve(item);
    });
  });
}

/**
 * Remove character from specific world
 *
 * @param worldId world ID
 * @param characterId character ID
 */
exports.removeCharacter = function(worldId, characterId) {
  return new Promise(function (resolve, reject) {
    var wobiCol = db.collection('WoBiCol');
    var query = {
      _id: characterId,
      type: 'character',
      worldId: worldId,
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
 * @param characterId character ID
 * @param character world data
 * @return {Object} World Details
 */
exports.updateCharacter = function(worldId, characterId, character) {
  return new Promise(function (resolve, reject) {
    var WoBiCol = db.collection('WoBiCol');
    var query = {
      _id: characterId,
      worldId: worldId,
      type: 'character',
    };

    // Add the World ID as a property for later lookup
    var newCharacter = character;
    newCharacter.worldId = worldId;

    WoBiCol.update(query, newCharacter, function (error, item) {
      resolve(item);
    });
  });
};