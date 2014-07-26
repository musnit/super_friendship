var Game = Backbone.Router.extend({
  routes: {
    '': 'profile',
    'profile': 'profile',
    'play': 'play'
  },
  initialize: function() {

    this.users = new UserCollection();

    this.profile = new ProfileView({
      el: $('.profile-screen')[0],
      model: this.users.viewer,
      collection: this.users
    });

    this.grid = new GridView({
      el: $('.grid')[0],
      model: this.users.viewer,
      collection: this.users
    });

  },
  profile: function() {
    this.profile.render();
  },
  play: function() {
    this.profile.render();
  }
});

$(function() {
  var game = new Game();

  Backbone.history.start();
});