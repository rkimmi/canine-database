/* jshint node: true */

var express = require('express');
var bp = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 8080;

app.use(bp.urlencoded({
	extended: true
}));

app.use(bp.json());

/* Database Connectivity */

var dbpath = "mongodb://greenlantern:NewOA@ds151059.mlab.com:51059/canine-database";
mongoose.connect(dbpath);

var Dog = require('./app/models/dog');

/* Routes */

var router = express.Router();

router.use(function (req, res, next) {
	console.log("Something is happening!");
	next();
});

router.get('/', function (req, res) {
	res.json({
		message: "It works! It really works!"
	});
});

router.route('/dogs')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {

		var dog = new Dog();		// create a new instance of the Bear model
		dog.name = req.body.name;  // set the bears name (comes from the request)

		dog.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Dog created!' });
		});


	});


// all of our routes will be prefixed with /api
app.use('/api', router);


/* Run the server */
app.listen(port);
console.log('The magic happens on port ' + port);
