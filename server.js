/* globals console, process, require */


var express = require('express');
var bp = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 8001;

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

router.route('/dogs').post(function (req, res) {
	var dog = new Dog();
	console.log(dog);


	/* dog.save(function (error) {
		console.log('Trying to save the dog!');

		if (error)
			res.send(error);

		res.json({
			message: 'Dog named ' + dog.name + " identified!"
		});
	}); */
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


/* Run the server */
app.listen(port);
console.log('The magic happens on port ' + port);
