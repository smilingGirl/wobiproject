const ws = require('../services/worldsService.js');
var validate = require('express-jsonschema').validate;
var schema = require('../schema.js');

function init(app, ws) {
  //Get all existing worlds
  app.get('/worlds', getWorlds);
  console.log(`*** API [GET] /worlds registered`);

  //Post a new world
  app.post('/worlds', validate({ body: schema.World }),  postWorld);
  console.log(`*** API [POST] /worlds registered`);

  //Get world by worldID
  app.get('/worlds/:worldID', getWorldById);
  console.log(`*** API [GET] /worlds/:worldID registered`);

  //Update an existing world
  app.put('/worlds/:worldID', validate({ body: schema.World }), putWorld);
  console.log(`*** API [PUT] /worlds/:worldID registered`);

  app.delete('/worlds/:worldID', deleteWorld);
  console.log(`*** API [DELETE] /worlds/:worldID registered`);
}

function getWorlds(req, res) {
	ws.getWorlds()
	.then(function (worlds) {
		//logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
		res.json(worlds);
	})
	.catch(function(err) {
	   //logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
	   res.status(500).send('Failed to update world %s' + err);
	});
}

function getWorldById(req, res) {
	ws.getWorldById(req.params.worldID)
	.then(function (world) {
		//logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
		res.json(world);
	})
	.catch(function(err) {
	   //logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
	   res.status(500).send('Failed to update world %s' + err);
	});
}

function putWorld(req, res) {
	const world = {name: req.body.name, WorkInProgress: req.body.WorkInProgress, type: 'world' };
	ws.updateWorld(req.params.worldID, world)
	.then(function (world) {
		//logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
		res.json(world);
	})
	.catch(function(err) {
	   //logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
	   res.status(500).send('Failed to update world %s' + err);
	});
}

function postWorld(req, res) {
	//logger.debug(util.format('POST /calendar/%s/events - %j', req.userId, req.body));
	const world = {name: req.body.name, WorkInProgress: req.body.WorkInProgress, type: 'world', history: req.body.history};
	ws.addWorld(world)
	.then(function (world) {
		//logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
		res.json(world);
	})
	.catch(function(err) {
	   //logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
	   res.status(500).send('Failed to create world %s' + err);
	});
}

function deleteWorld(req, res){
	ws.removeWorld(req.params.worldID)
	.then(function (world) {
		//logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
		res.json('World has been deleted.');
	})
	.catch(function(err) {
	   //logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
	   res.status(500).send('Failed to update delete. ' + err);
	});
}

module.exports = function(app, db){
	init(app, db);
};


