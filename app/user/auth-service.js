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

  function Auth($http, $window, User, $firebaseAuth) {
    var AuthBase = {},
        ref = new $window.Firebase('https://trackmytries-dev.firebaseio.com/'),
        usersRef = ref.child('users'),
        auth = $firebaseAuth(ref);

    // AuthBase.signIn = function (credentials) {
    //   return $http.post(API + '/user/signin', credentials)
    //     .then(function (result) {
    //       User.setUser(result.data);
    //     });
    // };

    AuthBase.signInFb = function (credentials) {
      return auth.$authWithPassword({
        email: credentials.email,
        password: credentials.password
      });
    };

    // AuthBase.signUp = function (credentials) {
    //   return $http.post(API + '/user/signup', credentials)
    //     .then(function (result) {
    //       User.setUser(result.data);
    //     });
    // };

    AuthBase.signUpFb = function (credentials) {
      // Create the firebase account
      return auth.$createUser({
        email: credentials.email,
        password: credentials.password
      }).then(function () {
        // If that worked, sign in
        return auth.$authWithPassword({
          email: credentials.email,
          password: credentials.password
        }).then(function (userInfo) {
          // If sign in was ok, then create a user profile
          return usersRef.child(userInfo.uid).set({
            name: credentials.name,
            email: credentials.email
          });
        });
      });
    };

    AuthBase.changePassword = function (credentials) {
      console.log(credentials);
      return auth.$changePassword({
        email: credentials.email,
        oldPassword: credentials.currentPassword,
        newPassword: credentials.newPassword
      });
    };

    // AuthBase.fbSignIn = function (fbAuthResponse) {
    //   return $http.post(API + '/user/auth/fb', fbAuthResponse)
    //     .then(function (result) {
    //       User.setUser(result.data);
    //     });
    // };

    return AuthBase;
  }
}());
