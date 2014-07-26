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


function register(socket, user) {
	console.log("New user", user);

	users[user.nick] = user;
}

// store then broadcast ping
function receivePing(socket, ping) {
	console.log("Received ping", ping);

	var nick = ping.nick;

	if (!(nick in users)) {

	}

	var user = users[nick];

	users.ping = ping;

	broadcastPing(socket, ping);
}

function broadcastPing(socket, ping) {
	console.log("Broadcasting ping", ping);

	io.emit(socket, 'ping', ping);
}