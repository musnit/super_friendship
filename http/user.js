
UserCollection = Backbone.Collection.extend({
	initialize: function() {
		this.connect();
		this.listenTo(this, 'broadcast', this.onBroadcast);
		this.viewer = new UserModel();
	},
	// listen to socket broadcasts and transfer event onto this collection
	connect: function() {
		var self = this;
		var socket = io('http://localhost:5000');

		socket.on('broadcast', function(data) {
			self.emit('broadcast', data);
		});
	},
	// lookup / create the user and update the properties
	onBroadcast: function(data) {
		var user = this.get(data.id);

		if (!user) {
			return this.onBroadcastCreateUser(data);
		}

		return this.onBroadcastUpdateUser(user, data);
	},
	onBroadcastCreateUser: function(data) {
		user = new UserModel(data);
		this.add(user);
	},
	onBroadcastUpdateUser: function(user, data) {
		user.set(data);
	},
	// sync the viewer's model to the server using a ping event
	sync: function() {
		socket.emit('ping', this.viewer);
	}
});

UserModel = Backbone.Model.extend({
	defaults: {
		nick: '',
		color: '',
		x: 0,
		y: 0
	}
});

UserView = Backbone.View.extend({
	className: 'user',
	initialize: function() {
		this.listenTo(this.model, 'change', this.rerender);
	},
	render: function() {
		this.$el.css({
			position: 'absolute'
		});

		return this;
	},
	rerender: function() {
		this.$el.css({
			x: this.model.get('x'),
			y: this.model.get('y')
		});
	}
});