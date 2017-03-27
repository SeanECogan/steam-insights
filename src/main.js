var users = require('./controllers/users-controller.js');

var express = require('express');
var app = express();

app.get('/userid/:userInput', function (req, response) {
	users.steamId(response, req.params.userInput);
});

app.listen(4000);
console.log('Listening on port 4000...');
