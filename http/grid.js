var GridView = Backbone.View({
	className: 'grid',
	events: {
		'click': 'moveMe'
	},
	initialize: function() {
		this.viewer = this.createUser();
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