var Game = Backbone.Router.extend({
  routes: {
    'profile': 'profile',
    'play': 'play'
  },
  initialize: function() {
    var player = new UserModel();

    this.profile = new ProfileView({
      model: player
    });

    this.grid = new GridView({
      model: player
    });
  },
  profile: function() {
    $('body').append(this.profile.render().el);
  },
  play: function() {
    $('body').append(this.profile.render().el);
  }
});

new Game();


