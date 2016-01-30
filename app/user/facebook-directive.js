(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name user.directive:facebookLogin
   *
   * @description
   *
   */
  angular
    .module('user')
    .directive('facebookLogin', facebookLogin);

  function facebookLogin() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'user/facebook-login.tpl.html',
      scope: true,
      controllerAs: 'fb',
      controller: function ($scope, $state, ezfb, Auth) {
        var vm = this,
            loginStatus,
            authResponse;

        updateLoginStatus();

        vm.login = function () {
          // If connected already, go straight to API
          if (authResponse && loginStatus === 'connected') {
            apiLogin();
          } else {
            // If not connected, attempt to login
            ezfb.login(function (res) {
              if (res.authResponse) {
                authResponse = res.authResponse;
                apiLogin();
              } else {
                console.log('Didnt connect...');
              }
            }, {scope: 'email'});
          }
        };

        function updateLoginStatus() {
          // ezfb bug, returns old authResponse prop if status changes
          ezfb.getLoginStatus(function (res) {
            authResponse = res.authResponse;
            loginStatus = res.status;
            console.log(res.authResponse);
            console.log('Facebook status: ' + res.status);
          }, true);
        }

        function apiLogin() {
          Auth.fbSignIn(authResponse)
            .then(onSuccess)
            .catch(onError);
        }

        function onSuccess() {
          $state.go('home');
        }

        function onError(err) {
          console.log(err);
          vm.errorMessage = err.data ? err.data : 'An unknown error has occurred';
        }
      }
    };
  }
}());
