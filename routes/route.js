/* jshint node: true */

var express = require('express');
var router = express.Router();

var Dog = require('../app/models/dog');

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

module.exports = router;
