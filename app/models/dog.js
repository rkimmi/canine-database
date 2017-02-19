/* jshint node: true */

"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DogSchema = new Schema({
    name: String,
	nickname: String,
	dateOfBirth: Date,
	dateOfDeath: Date,
	sire: String,
	dam: String
});

module.exports = mongoose.model('Dog', DogSchema);
