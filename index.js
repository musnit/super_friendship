var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = {};

io.on('connection', function(socket){

	socket.on('register', function(user) {
		register(socket, user);
	});

	socket.on('ping', function(ping) {
		receivePing(socket, ping);
	});

});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

function register(socket, data) {
	console.log("New user", data);

	users[data.nick] = new User(data);
}

// store then broadcast ping
function receivePing(socket, data) {
	console.log("Received ping", data);

	if (!(data.nick in users)) {
		register(socket, data);
	}

	var user = users[data.nick];

	// update user with all properties received
	for (var prop in data) {
		user[prop] = data[prop];
	}

	broadcastPing(socket, user);
}

function broadcastPing(socket, user) {
	console.log("Broadcasting ping", user);

	io.emit('broadcast', user);
}

function User(data) {
	this.nick = data.nick;
	this.color = data.color;
	this.x = data.x;
	this.y = data.y;
}