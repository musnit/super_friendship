var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var user = {};

io.on('connection', function(socket){

	io.on('register', function(user) {
		register(socket, user);
	});

	io.on('ping', function(ping) {
		receivePing(socket, ping);
	});

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

function register(socket, data) {
	console.log("New user", data);

	users[user.nick] = new User(data);
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

	socket.broadcast.emit('broadcast', user);
}

function User(data) {
	this.nick = data.nick;
	this.color = data.color;
	this.x = data.x;
	this.y = data.y;
}