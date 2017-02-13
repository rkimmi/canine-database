/* jshint node: true */

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

    var dog = new Dog(); // create a new instance of the Bear model
    dog.name = req.body.name; // set the bears name (comes from the request)

    dog.save(function (err) {
        if (err)
            res.send(err);

        res.json({
            message: "Dog added to database!"
        });
    });
})

.get(function (req, res) {
    Dog.find(function (err, dogs) {
        if (err)
            res.send(err);

        res.json(dogs);
    });
});


router.route('/dogs/:dog_id').get(function (req, res) {
    Dog.findById(req.params.dog_id, function (err, dog) {
        if (err)
            res.send(err);

        res.json(dog);
    });
})

.put(function (req, res) {
    Dog.findById(req.params.dog_id, function (err, dog) {
        if (err)
            res.send(err);

        dog.name = req.body.name;

        dog.save(function (err) {
            if (err)
                res.send(err);

            res.json({
                message: "Dog updated in the database!"
            });
        });
    });
})

.delete(function(req, res) {
   Dog.remove({
       _id: req.params.dog_id
   }, function(err, dog) {
       if(err)
           res.send(err);

       res.json({
           message: "Dog removed from database!"
       });
   });
});


// all of our routes will be prefixed with /api
app.use('/api', router);


/* Run the server */
app.listen(port);
console.log('The magic happens on port ' + port);
