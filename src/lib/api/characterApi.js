const cs = require('../services/characterService.js');
var validate = require('express-jsonschema').validate;
var schema = require('../schema.js');

function init(app, cs) {
  app.get('/:worldID/characters', getCharacters);
  console.log(`*** API [GET] /:world/characters registered`);

  app.post('/:worldID/characters', validate({ body: schema.Character }), postCharacter);
  console.log(`*** API [POST] /:world/characters registered`);

  app.put('/:worldID/characters/:characterID', putCharacter);
  console.log(`*** API [PUT] /:world/characters/:characterID registered`);

  app.delete('/:worldID/characters/:characterID', deleteCharacter);
  console.log(`*** API [DELETE] /:world/characters/:characterID registered`);

  app.get('/:worldID/characters/:characterID', validate({ body: schema.Character }), getCharacterById);
  console.log(`*** API [GET] /:world/characters/:characterID registered`);
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
	const character = {firstName: req.body.firstName, lastName: req.body.lastName, age: req.body.age, type: 'character', worldId: req.body.worldID };
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
	const character = {firstName: req.body.firstName, lastName: req.body.lastName, age: req.body.age, type: 'character', worldId: req.body.worldID};
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

