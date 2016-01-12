(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name user.service:User
   *
   * @description
   *
   */
  angular
    .module('user')
    .factory('User', User);

  function User($localStorage, $q) {
    var UserBase = {},
        callbacks = [];

    function notifyCallbacks() {
      angular.forEach(callbacks, function (callback) {
        callback();
      });
    }

    function getCurrentUser() {
      // Check for a token
      // if ($localStorage.token) {
        // Make sure it is valid and not expired
      // }

      // If expried, delete user and token from storage and return null

      // If valid, return user form storage
      return $localStorage.user;
    }

    UserBase.getUser = function () {
      return $localStorage.user;
    };

    UserBase.getToken = function () {
      return $localStorage.token;
    };

    UserBase.setUser = function (data) {
      $localStorage.user = data.user;
      $localStorage.token = data.token;
      notifyCallbacks();
    };

    UserBase.onSignInChange = function (callback) {
      callbacks.push(callback);
    };

    UserBase.clear = function () {
      delete $localStorage.user;
      delete $localStorage.token;
      notifyCallbacks();
    };

    UserBase.signInRequired = function () {
      var deferred = $q.defer(),
          user = getCurrentUser();

      if (user) {
        deferred.resolve(user);
      } else {
        deferred.reject('AUTH_REQUIRED');
      }

      return deferred.promise;
    };

    return UserBase;
  }
}());
