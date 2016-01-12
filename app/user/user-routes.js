(function () {
  'use strict';

  angular
    .module('user')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'user/signup.tpl.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'user/signin.tpl.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .state('password', {
        url: '/password',
        templateUrl: 'user/password.tpl.html',
        controller: 'UserCtrl',
        controllerAs: 'user',
        resolve: {
          currentUser: ['User', function (User) {
            return User.signInRequired();
          }]
        }
      });
  }
}());
