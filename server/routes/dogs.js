/* jshint node: true */

"use strict";

var Dog = require('../../app/models/dog');

var dogs = {

    create: function (req, res) {
        var dog = new Dog();
        dog.name = req.body.name;

        dog.save(function (err) {
            if (err)
                res.send(err);

            res.json({
                message: "Dog added to database!"
            });
        });
    },

    read: function (req, res) {
        Dog.findById(req.params.dog_id, function (err, dog) {
            if (err)
                res.send(err);

            res.json(dog);
        });
    },

    update: function (req, res) {
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
    },

    delete: function (req, res) {
        Dog.remove({
            _id: req.params.dog_id
        }, function (err, dog) {
            if (err)
                res.send(err);

            res.json({
                message: "Dog removed from database!"
            });
        });
    },
    
    all: function (req, res) {
        Dog.find(function (err, dogs) {
            if (err)
                res.send(err);

            res.json(dogs);
        });
    }
};

module.exports = dogs;