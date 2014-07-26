var Game = Backbone.Router.extend({
  routes: {
    'profile': 'profile',
    'play': 'play'
  },
  initialize: function() {

    this.users = new UserCollection();

    this.profile = new ProfileView({
      model: this.users.viewer
    });

    this.grid = new GridView({
      model: this.users.viewer,
      collection: this.users
    });

    this.listen();
  },
  profile: function() {
    $('body').append(this.profile.render().el);
  },
  play: function() {
    $('body').append(this.profile.render().el);
  },
  listen: function() {
  }
});

new Game();


