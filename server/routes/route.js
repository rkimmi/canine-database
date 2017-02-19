/* jshint node: true */

"use strict";

var express = require('express');
var router = express.Router();


var dogs = require('./dogs.js');

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
    .post(dogs.create)
    .get(dogs.all);

router.route('/dogs/:dog_id')
    .get(dogs.read)
    .put(dogs.update)
    .delete(dogs.delete);

module.exports = router;
