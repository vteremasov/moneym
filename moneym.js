'use strict';

Router.plugin('ensureSignedIn', {
  except: ['home', 'signIn', 'signUp', 'atForgotPassword']
});

Router.configure({
  layoutTemplate: 'main',
  //notFoundTemplate: '404',
  yieldTemplates: {
    nav: {to: 'nav'}
    //  myFooter: {to: 'footer'}
  }
});

AccountsTemplates.configure({
  defaultLayout: 'main',
  confirmPassword: true,
  enablePasswordChange: true,
  showPlaceholders: true,
  showForgotPasswordLink: true,
  lowercaseUsername: false,
  focusFirstInput: true,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true
});

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
    _id: "username",
    type: "text",
    displayName: "username",
    required: true,
    minLength: 3
  },
  {
    _id: 'email',
    type: 'email',
    required: true,
    displayName: "email",
    re: /.+@(.+){2,}\.(.+){2,}/,
    errStr: 'Invalid email'
  },
  pwd
]);

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/login',
  template: 'fullPageAtForm',
  layoutTemplate: 'main',
  redirect: '/wallets'
});

AccountsTemplates.configureRoute('signUp', {
  name: 'signUp',
  path: '/sign-up',
  template: 'fullPageAtForm',
  layoutTemplate: 'main',
  redirect: '/wallets'
});

var Wallets = new Mongo.Collection("wallets");

Router.route('/', function () {
  this.layout('main');
  this.render("nav", {to: "nav"});
  this.render('home');
}, {
  name: 'home'
});


Router.route('/wallets',
//  function () {
//  this.layout('main');
//  this.render("nav", {to: "nav"});
//  this.render('wallets');
//},
  {
    template: "wallets",
    layout: "main",
    nav: {to: "nav"},
    data: function () {return {
      wallets: Wallets.find({})
    };},
    name: 'wallets'
});

if (Meteor.isClient) {
  Template.wallets.events({
    "submit .new-wallet": function (event) {
      event.preventDefault();
      var wallet = {
        type: event.target.type.value,
        name: event.target.name.value,
        currency: event.target.currency.value,
        amountSign: event.target.amountSign.value,
        amount: Math.abs(event.target.amount.value),
        comment: event.target.comment.value,
        users: [Meteor.userId()],
        createdAt: new Date(),
        owner: Meteor.userId()
      };
      $('#addWalletModal').modal('hide');
      Wallets.insert(wallet)
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
