/* jshint node: true */

"use strict";

var jwt = require('jwt-simple');


var auth = {

    login: function(req, res) {

        var data = req.body;

        var u = data.user || '';
        var p = data.pw || '';

        if(u === '' || p === '') {
            set401(res);

            return;
        }

        var user = auth.validate(u, p);

        if(!user) {
            set401(res);
            return;
        }

        if(user) {
            res.json(genToken(user));
        }
    },

    validate: function(u, p) {
        /* Spoofing DB connection for now */
        var user = {
            name: 'admin',
            role: 'admin',
            username: 'admin@app.com'
        };

        return user;
    },

    validateUser: function(u) {
        /* Spoofing DB connection for now */

        var user = {
            name: 'admin',
            role: 'admin',
            username: 'admin@app.com'
        };

        return user;
    }
};

function genToken(user) {
    var expires = expiresIn(7);
    var token = jwt.encode({
       exp: expires
    }, require('../config/secret')());

    return {
        token: token,
        expires: expires,
        user: user
    };
}

function expiresIn(days) {
    var date = new Date();
    return date.setDate(date.getDate() + days);
}

function set401(res) {
    res.status(401);
    res.json({
        "status": 401,
        "message": "Invalid credentials"
    });
}

module.exports = auth;
