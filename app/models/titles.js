/* jshint node: true */

"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var titleSchema = new Schema({
    name: String,
    abbr: String,
    desc: String,
    group: String
});

module.exports = mongoose.model('Titles', titleSchema);
