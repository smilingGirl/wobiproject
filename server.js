var http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

//Make some settings and create 'app'
//Export into config file later on 
const port = 8080;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

require('./lib/api/index.js')(app, {});

//start the http-server on port defined in config
app.listen(port, () => {
  console.log('We are live on http:localhost:' + port);
  /*db.collection('WoBiCol').findOne({'title':'SomeWorld'}, function(err, item) {
      console.log(item);
  });*/
});

//Basic Handler to handle SchemaValdiation Fails
app.use(function(err, req, res, next) {
  var responseData;

  if (err.name === 'JsonSchemaValidation') {
      // Log the error however you please 
      console.log(err.message);
      // logs "express-jsonschema: Invalid data found" 

      // Set a bad request http response status or whatever you want 
      res.status(400);

      // Format the response body however you want 
      responseData = {
         statusText: 'Bad Request',
         jsonSchemaValidation: true,
         validations: err.validations  // All of your validation information 
      };

      // Take into account the content type if your app serves various content types 
      if (req.xhr || req.get('Content-Type') === 'application/json') {
        res.json(responseData.validations.body);
      } else {
          // If this is an html request then you should probably have 
          // some type of Bad Request html template to respond with 
          //res.render('badrequestTemplate', responseData);
          res.json(responseData.validations.body[0].property + " : " + responseData.validations.body[0].messages);
      }
  } else {
      // pass error to next error middleware handler 
      next(err);
  }
});


/**
 * exit handling - the exitHandler function is called when the events are fired.
 */
function exitHandler(process, event, err) {
  console.warn(`Event ${event.type} received. ${err}`);

  // closeDB Connection if present
  const db = require('./db.js').db;
  db.close()
  .catch(function (err) {
    console.error('Could not close DB Connection');
    console.error(err);
  })
  .then(function () {
    if(event.exit) {
      console.log('Shutting down app on http:localhost:' + port);
      process.exit();
    }
  });
}

// Catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, process, { exit: true, type: 'SIGINT' }));
// Catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, process, { exit: false, type: 'uncaughtException' }));