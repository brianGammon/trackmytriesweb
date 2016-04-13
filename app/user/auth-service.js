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
        usersRef = ref.child('userProfiles'),
        auth = $firebaseAuth(ref);

    AuthBase.signIn = function (credentials) {
      return auth.$authWithPassword({
        email: credentials.email,
        password: credentials.password
      }).then(updateUserProfile);
    };

    AuthBase.signUp = function (credentials) {
      // Create the firebase account
      return auth.$createUser({
        email: credentials.email,
        password: credentials.password
      }).then(function () {
        // If that worked, sign in
        return auth.$authWithPassword({
          email: credentials.email,
          password: credentials.password
        }).then(function (authInfo) {
          // If sign in was ok, then create a user profile
          authInfo.name = credentials.name;
          return updateUserProfile(authInfo);
        });
      });
    };

    AuthBase.changePassword = function (credentials) {
      return auth.$changePassword({
        email: credentials.email,
        oldPassword: credentials.currentPassword,
        newPassword: credentials.newPassword
      });
    };

    AuthBase.fbSignIn = function () {
      return auth.$authWithOAuthPopup('facebook')
        .then(updateUserProfile);
    };

    function updateUserProfile(authInfo) {
      var userProfile = {
        provider: authInfo.provider
      };

      switch (authInfo.provider) {
        case 'password':
          if (authInfo.name) {
            userProfile.name = authInfo.name;
          }
          userProfile.email = authInfo.password.email;
          userProfile.providerData = {
            isTemporaryPassword: authInfo.password.isTemporaryPassword,
            profileImageUrl: authInfo.password.profileImageURL
          };
          break;
        case 'facebook':
          userProfile.name = authInfo.facebook.displayName;
          userProfile.providerData = {
            profileImageUrl: authInfo.facebook.profileImageURL,
            accessToken: authInfo.facebook.accessToken
          };
          break;
        default:
          throw new Error('Unsupported auth provider: ' + authInfo.provider);
      }
      return usersRef.child(authInfo.uid).update(userProfile);
    }

    return AuthBase;
  }
}());
