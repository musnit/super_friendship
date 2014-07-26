
UserCollection = Backbone.Collection.extend({
	initialize: function() {
		this.connect();
		// this.listenTo(this, 'broadcast', this.onBroadcast);
		this.viewer = new UserModel();
	},
	// listen to socket broadcasts and transfer event onto this collection
	connect: function() {
		var self = this;
		this.socket = io('http://localhost:5000');

		this.socket.on('broadcast', function(data) {
			self.onBroadcast(data);
		});
	},
	// lookup / create the user and update the properties
	onBroadcast: function(data) {
		var user = this.findWhere({ nick: data.nick });

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
		this.socket.emit('ping', this.viewer.attributes);
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
		this.listenTo(this.model, 'all', this.rerender);
	},
	render: function() {
		this.$el.css({
			position: 'absolute'
		});

		this.rerender();

		return this;
	},
	rerender: function() {
		this.$el.css({
			x: this.model.get('x'),
			y: this.model.get('y'),
			background: '#' + this.model.get('color')
		});
	}
});