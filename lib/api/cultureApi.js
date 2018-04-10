const cs = require('../services/cultureService.js');
var validate = require('express-jsonschema').validate;
var schema = require('../schema.js');

function init(app, ws) {
  app.get('/:worldID/cultures', getCultures);
  console.log(`*** API [GET] /:world/cultures registered`);
  app.post('/:worldID/cultures', validate({ body: schema.Culture }), postCultures);
  console.log(`*** API [POST] /:world/cultures registered`);
  app.get('/:worldID/cultures/:cultureID', getCultureById);
  console.log(`*** API [GET] /:world/cultures/:cultureID registered`);
}

function getCultures(req, res) {
	cs.getCultures(req.params.worldID)
    .then(function (cultures) {
      //logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
      res.json(cultures);
    })
    .catch(function(err) {
      //logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
      res.status(500).send('Failed to update character. ' + err);
    });
}

function postCultures(req, res) {
	const culture = {
		name: req.body.name, 
		believes: req.body.believes, 
		holidays: req.body.holidays, 
		values: req.body.values, 
		type: 'culture', 
		worldId: req.body.worldID
	};
	cs.addCulture(req.params.worldID, culture)
	.then(function (culture) {
		//logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
		res.json(culture);
	})
	.catch(function(err) {
	   //logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
	   res.status(500).send('Failed to create character. ' + err);
	});
}

function getCultureById(req, res) {
	cs.getCultureById(req.params.worldID, req.params.cultureID)
	.then(function (culture) {
		//logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
		res.json(culture);
	})
	.catch(function(err) {
	   //logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
	   res.status(500).send('Failed to update character. ' + err);
	});
}

module.exports = function(app, db){
	init(app, db);
};