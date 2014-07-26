var ProfileView = Backbone.View.extend({
	el: '.profile-screen',
	events: {
		'click button': 'saveProfile'
	},
	render: function() {
		this.$el.append("");

		return this;
	},
	saveProfile: function() {
		this.model.set({
			nick: this.$el.find('input[name=nick]').val(),
			color: this.$el.find('input[name=color]').val(),
			x: this.$el.find('input[name=x]').val(),
			y: this.$el.find('input[name=y]').val()
		});

		this.collection.add(this.model);
		this.collection.sync();
	}
});