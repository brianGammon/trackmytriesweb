(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name user.service:Auth
   *
   * @description
   *
   */
  angular
    .module('user')
    .factory('Auth', Auth);

  function Auth($http, User, API) {
    var AuthBase = {};
    AuthBase.signIn = function (credentials) {
      return $http.post(API + '/user/signin', credentials)
        .then(function (result) {
          User.setUser(result.data);
        });
    };

    AuthBase.signUp = function (credentials) {
      return $http.post(API + '/user/signup', credentials)
        .then(function (result) {
          User.setUser(result.data);
        });
    };

    AuthBase.changePassword = function (credentials) {
      return $http.post(API + '/user/password', credentials);
    };

    AuthBase.fbSignIn = function (fbAuthResponse) {
      return $http.post(API + '/user/auth/fb', fbAuthResponse)
        .then(function (result) {
          User.setUser(result.data);
        });
    };

    return AuthBase;
  }
}());
