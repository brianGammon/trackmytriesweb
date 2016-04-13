(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name user.controller:UserCtrl
   *
   * @description
   *
   */
  angular
    .module('user')
    .controller('UserCtrl', UserCtrl);

  function UserCtrl(currentUser, Auth, $state, $scope) {
    var vm = this;

    vm.signIn = function (credentials) {
      $scope.$broadcast('show-errors-check-validity');

      if (vm.loginForm.$valid) {
        Auth.signIn(credentials)
          .then(onSuccess)
          .catch(onError);
      }
    };

    vm.signUp = function (credentials) {
      $scope.$broadcast('show-errors-check-validity');

      if (vm.loginForm.$valid) {
        Auth.signUp(credentials)
        .then(onSuccess)
        .catch(onError);
      }
    };

    vm.changePassword = function (credentials) {
      $scope.$broadcast('show-errors-check-validity');

      if (vm.loginForm.$valid) {
        credentials.email = currentUser.email;
        Auth.changePassword(credentials)
          .then(onSuccess)
          .catch(onError);
      }
    };

    vm.facebookSignIn = function () {
      Auth.fbSignIn()
        .then(onSuccess)
        .catch(onError);
    };

    function onSuccess() {
      $state.go('home');
    }

    function onError(err) {
      vm.errorMessage = err.message ? err.message : 'An unknown error has occurred';
    }
  }
}());
