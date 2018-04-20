const woApi = require('./worldApi.js');
const charaApi = require('./characterApi.js');
const countryApi = require('./countryApi.js');
const cultureApi = require('./cultureApi.js');


module.exports = function(app, db) {
	woApi(app, db);
	charaApi(app, db);
	countryApi(app, db);
	cultureApi(app, db);
}