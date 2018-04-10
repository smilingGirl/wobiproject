const cs = require('../services/countryService.js');
var validate = require('express-jsonschema').validate;
var schema = require('../schema.js');

function init(app, ws) {
  app.get('/:worldID/countries', getCountries);
  console.log(`*** API [GET] /:world/countries registered`);
  app.post('/:worldID/countries', validate({ body: schema.Country }), postCountry);
  console.log(`*** API [POST] /:world/countries registered`);
  app.get('/:worldID/countries/:countryID', getCountryById);
  console.log(`*** API [GET] /:world/countries/:countryID registered`);
}

function getCountries(req, res) {
	cs.getCountries(req.params.worldID)
    .then(function (countries) {
      //logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
      res.json(countries);
    })
    .catch(function(err) {
      //logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
      res.status(500).send('Failed to update character. ' + err);
    });
}

function postCountry(req, res) {
	const country = {
		name: req.body.name, 
		neighbours: req.body.neighbour, 
		ruler: req.body.ruler, 
		system: req.body.system, 
		type: 'country', 
		worldId: req.body.worldID
	};
	cs.addCountry(req.params.worldID, country)
	.then(function (country) {
		//logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
		res.json(country);
	})
	.catch(function(err) {
	   //logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
	   res.status(500).send('Failed to create character. ' + err);
	});
}

function getCountryById(req, res) {
	cs.getCountryById(req.params.worldID, req.params.countryID)
	.then(function (country) {
		//logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
		res.json(country);
	})
	.catch(function(err) {
	   //logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
	   res.status(500).send('Failed to update character. ' + err);
	});
}

module.exports = function(app, db){
	init(app, db);
};