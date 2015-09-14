if (Meteor.isClient) {
  // counter starts at 0
  //Session.setDefault('counter', 0);
  //
  //Template.hello.helpers({
  //  counter: function () {
  //    return Session.get('counter');
  //  }
  //});
  //
  //Template.hello.events({
  //  'click button': function () {
  //    // increment the counter when button is clicked
  //    Session.set('counter', Session.get('counter') + 1);
  //  }
  //});

  Router.configure({
    notFoundTemplate: '404'
  });

  Router.route('/', function () {
    // render the Home template with a custom data context
    this.render('Home');
  });

  Router.route('/login', function () {
    // render the Home template with a custom data context
    this.render('login');
  });

  Router.route('/signUp', function () {
    // render the Home template with a custom data context
    this.render('signUp');
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
