UserModel = Backbone.Model.extend({
	receiveUpdate: function(x, y) {
		this.set({
			x: x,
			y: y
		});
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