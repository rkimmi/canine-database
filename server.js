/* jshint node: true */

var express = require('express');
var bp = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./server/routes/route');

var app = express();
var port = process.env.PORT || 8001;

app.use(bp.urlencoded({
    extended: true
}));

app.use(bp.json());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    
    res.header('Access-Control-Allow-Headers', 'Content-type, Accept, X-Access-Token, X-Key');
    
    if(req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});


/* Database Connectivity */

var dbpath = "mongodb://greenlantern:NewOA@ds151059.mlab.com:51059/canine-database";
mongoose.connect(dbpath);


app.use('/', express.static(__dirname + '/www'));
app.post('/process', function(req, res) {
    res.json({
        "message": req.body
    });
});


app.use('/api', routes);


/* Run the server */
app.listen(port);
console.log('The magic happens on port ' + port);
