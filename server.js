/* jshint node: true */

var express = require('express');
var bp = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/route');

var app = express();
var port = process.env.PORT || 8001;

app.use(bp.urlencoded({
    extended: true
}));

app.use(bp.json());

/* Database Connectivity */

var dbpath = "mongodb://greenlantern:NewOA@ds151059.mlab.com:51059/canine-database";
mongoose.connect(dbpath);

// all of our routes will be prefixed with /api
app.use('/api', routes);


/* Run the server */
app.listen(port);
console.log('The magic happens on port ' + port);
