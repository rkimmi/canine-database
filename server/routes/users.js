/* jshint node: true */

"use strict";

var User = require('../../app/models/dog');

var users = {
    
    create: function(req, res) {
        var user = new User();
    },
    
    read: function(req, res) {},
    
    update: function(req, res) {},
    
    delete: function(req, res) {},
    
    all: function(req, res) {}
    
};