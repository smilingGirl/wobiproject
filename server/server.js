// Get dependencies
var http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
var db = require('./db.js').db;
var path = require('path');
var log = require('fancy-log');

//Make some settings and create 'app'
//Export into config file later on 
const port = 8080;

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));

app.use(function (req, res, next){
  // Enable CORS for local testing
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Cache-Control, Pragma');
  next();
});

// Set api routes
require('./lib/api/index.js')(app, {});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//start the http-server on port defined in config
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => log('We are live on http:localhost:' +  port));


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