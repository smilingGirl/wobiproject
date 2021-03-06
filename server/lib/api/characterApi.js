const cs = require('../services/characterService.js');
var validate = require('express-jsonschema').validate;
var schema = require('../schema.js');
var log = require('fancy-log');

function init(app, cs) {
  app.get('/worlds/:worldID/characters', getCharacters);
  log.info(`*** API [GET] worlds/:world/characters registered`);

  app.post('/worlds/:worldID/characters', validate({ body: schema.Character }), postCharacter);
  log.info(`*** API [POST] worlds/:world/characters registered`);

  app.put('/worlds/:worldID/characters/:characterID', validate({ body: schema.Character }), putCharacter);
  log.info(`*** API [PUT] worlds/:world/characters/:characterID registered`);

  app.delete('/worlds/:worldID/characters/:characterID', deleteCharacter);
  log.info(`*** API [DELETE] worlds/:world/characters/:characterID registered`);

  app.get('/worlds/:worldID/characters/:characterID', getCharacterById);
  log.info(`*** API [GET] worlds/:world/characters/:characterID registered`);
}

function getCharacters(req, res) {
	cs.getCharacters(req.params.worldID)
    .then(function (characters) {
      //logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
      res.json(characters);
    })
    .catch(function(err) {
      //logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
      res.status(500).send('Failed to update character. ' + err);
    });
}

function getCharacterById(req, res) {
	cs.getCharacterById(req.params.worldID, req.params.characterID)
	.then(function (character) {
		//logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
		res.json(character);
	})
	.catch(function(err) {
		//logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
		res.status(500).send('Failed to update character. ' + err);
	});
}

function putCharacter(req, res) {
	const character = {
		firstName: req.body.firstName, 
		lastName: req.body.lastName, 
		age: req.body.age, 
		type: 'character',
		status: req.body.status, 
		worldId: req.body.worldID,
		culture: req.body.culture,
		country: req.body.country, 
	};
	cs.updateCharacter(req.params.worldID, req.params.characterID, character)
	.then(function (character) {
		//logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
		res.json(character);
	})
	.catch(function(err) {
		//logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
		res.status(500).send('Failed to update character. ' + err);
	});
}

function postCharacter(req, res) {
	const character = {
		firstName: req.body.firstName, 
		lastName: req.body.lastName, 
		age: req.body.age, 
		type: 'character',
		status: req.body.status,
		worldId: req.body.worldID,
		culture: req.body.culture,
		country: req.body.country, 
	};
	cs.addCharacter(req.params.worldID, character)
	.then(function (character) {
		//logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
		res.json(character);
	})
	.catch(function(err) {
		//logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
		res.status(500).send('Failed to create character. ' + err);
	});
}

function deleteCharacter(req, res){
  cs.removeCharacter(req.params.worldID, req.params.characterID)
	.then(function () {
		//logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
		res.json('Character has been deleted.');
	})
	.catch(function(err) {
		//logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
		res.status(500).send('Failed to delete. ' + err);
	});
}

module.exports = function(app, db){
	init(app, db);
};


