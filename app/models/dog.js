/* globals module, require */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DogSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Dog', DogSchema);
