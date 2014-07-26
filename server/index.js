var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var user = {};

io.on('connection', function(socket){
	io.on('register', function(user) {
		register(user);
	});
	io.on('ping', function(ping) {});
});

io.on('');

http.listen(3000, function(){
  console.log('listening on *:3000');
});


function register(user) {
	users[user.nick] = user;
}

function receivePing(socket, ping) {
	var nick = ping.nick;

	if (!(nick in users)) {

	}
}

function broadCastPing(socket, ping) {

}