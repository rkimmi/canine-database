/* jshint node: true */

var express = require('express');
var bp = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./server/routes/route');

var app = express();
var port = process.env.PORT || 8001;


/* Database Connectivity */

var dbpath = "mongodb://greenlantern:NewOA@ds151059.mlab.com:51059/canine-database";
mongoose.connect(dbpath);

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

app.all('/api/*', [require('./server/middleware/validateRequest')]);

app.post('/process', function(req, res) {
    res.json({
        "message": req.body
    });
});

app.use(bp.urlencoded({
    extended: true
}));

app.use(bp.json());

app.use('/', express.static(__dirname + '/www'));

app.use('/api', routes);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/* Run the server */
app.listen(port);
console.log('Express server listening on port ' + port);
