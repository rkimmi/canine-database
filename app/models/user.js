/* jshint node: true */

"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
	email: String,
    role: String
});

module.exports = mongoose.model('User', userSchema);
