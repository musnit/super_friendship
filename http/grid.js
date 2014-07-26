var GridView = Backbone.View.extend({
	className: 'grid',
	events: {
		'click': 'moveMe'
	},
	// collection is the users collection
	// model is the viewer
	initialize: function() {
		this.users = {};
	},
	receiveBroadcast: function(user) {
		var player = this.users[user.nick];

		if (!player) {
			player = this.createUser(user);
		}

		player.model.set(user);
	},
	createUser: function(user) {
		this.users[user.nick]  = new UserView({
			model: new UserModel(user)
		});
	},
	moveMe: function(e) {
		var x = e.x;
		var y = e.y;

		this.me.set({
			x: x, y: y
		});

		socket.emit('ping', {
			x: x, y: y
		});
	}
});