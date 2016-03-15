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

  function User($localStorage, $q, jwtHelper) {
    var UserBase = {},
        callbacks = [];

    function notifyCallbacks() {
      angular.forEach(callbacks, function (callback) {
        callback();
      });
    }

    function clearUser() {
      delete $localStorage.user;
      delete $localStorage.token;
      notifyCallbacks();
    }

    function getCurrentUser() {
      if ($localStorage.token) {
        // Make sure token is valid and not expired
        if (jwtHelper.isTokenExpired($localStorage.token)) {
          console.log('token is expired');
          clearUser();
        }
      }

      return $localStorage.user;
    }

    UserBase.getUser = function () {
      return getCurrentUser();
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
      clearUser();
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
