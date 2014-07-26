var GridView = Backbone.View.extend({
	el: '.grid',
	events: {
		'click': 'moveMe'
	},
	// collection is the users collection
	// model is the viewer
	initialize: function() {
		this.users = {};
		this.listenTo(this.collection, 'add', this.createUserView);
	},
	createUserView: function(user) {
		var view  = new UserView({
			model: new UserModel(user)
		});

		this.users[user.nick] = view;

		this.$el.append(view.render().el);
	},
	moveMe: function(e) {
		var x = e.offsetX;
		var y = e.offsetY;

		this.model.set({
			x: x, y: y
		});

		this.collection.sync();
	}
});