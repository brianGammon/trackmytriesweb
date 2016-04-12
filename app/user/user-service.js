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

  function User($q, $window, $firebaseAuth, $firebaseObject) {
    var UserBase = {},
        callbacks = [],
        ref = new $window.Firebase('https://trackmytries-dev.firebaseio.com/'),
        usersRef = ref.child('users'),
        auth = $firebaseAuth(ref);

    auth.$onAuth(function () {
      angular.forEach(callbacks, function (callback) {
        callback();
      });
    });

    UserBase.getUser = function () {
      var deferred = $q.defer(),
          authInfo = auth.$getAuth();

      if (!authInfo) {
        deferred.resolve(null);
        return deferred.promise;
      }
      console.log(authInfo);
      return $firebaseObject(usersRef.child(authInfo.uid)).$loaded();
    };

    UserBase.onSignInChange = function (callback) {
      callbacks.push(callback);
    };

    UserBase.clear = function () {
      auth.$unauth();
    };

    UserBase.signInRequired = function () {
      return auth.$requireAuth();
      // return auth.$waitForAuth().then(function (authData) {
      //   var deferred = $q.defer();
      //
      //   console.log('Wait for auth returned');
      //   console.log(authData);
      //   console.log('current user is:');
      //   console.log(currentUser);
      //
      //   if (currentUser) {
      //     deferred.resolve(currentUser);
      //   } else {
      //     deferred.reject('AUTH_REQUIRED');
      //   }
      //
      //   return deferred.promise;
      // });
    };

    return UserBase;
  }
}());
