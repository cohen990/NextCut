// set up ======================================================================
var express  = require('express');
var app      = express();                               // create our app w/ express
var port     = process.env.PORT || 8000;                // set the port
var morgan   = require('morgan');

// configuration ===============================================================

app.use(morgan('dev')); // log every request to the console


// routes ======================================================================
app.use(express.static(__dirname + '/public'));
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
