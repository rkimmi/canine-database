/* globals console, process, require */


var express = require('express');
var bp = require('body-parser');

var app = express();
var port = process.env.PORT || 8001;

app.use(bp.urlencoded({
    extended: true
}));

app.use(bp.json());


var router = express.Router();

router.get('/', function(req, res) {
    res.json({
        message: "It works! It really works!"
    });
});

app.use('/api', router);

app.listen(port);

console.log('The magic happens on port ' + port);
