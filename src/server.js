var http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
var log = require('fancy-log');

//Make some settings and create 'app'
//Export into config file later on 
const port = 8080;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

require('./lib/api/index.js')(app, {});

//start the http-server on port defined in config
app.listen(port, () => {
  log.message('We are live on http:localhost:' + port);
});

//Basic Handler to handle SchemaValdiation Fails
app.use(function(err, req, res, next) {
  var responseData;

  if (err.name === 'JsonSchemaValidation') {
      // Log the error however you please 
      log.error(err.message);

      // Set a bad request http response status or whatever you want 
      res.status(400);

      // Response body
      responseData = {
         statusText: 'Bad Request',
         jsonSchemaValidation: true,
         validations: err.validations,  // All of the validation information 
      };
      
      //Send information about where the request failed at, eg. missing data
      res.json(responseData.validations.body[0].property + " : " + responseData.validations.body[0].messages);

  } else {
      // pass error to next error middleware handler 
      next(err);
  }
});