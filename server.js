// Dependencies=================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App======================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({type:"application/vnd.api+json"}));
app.use(express.static(__dirname + '/assets'));

//These direct to the js files that handle routing
require('./app/routing/htmlRoutes.js')(app);
require('./app/routing/apiRoutes.js')(app);

//This starts the localhost server listening on port 3000
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
