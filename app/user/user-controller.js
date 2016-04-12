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

    vm.signInFb = function (credentials) {
      $scope.$broadcast('show-errors-check-validity');

      if (vm.loginForm.$valid) {
        Auth.signInFb(credentials)
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

    vm.signUpFb = function (credentials) {
      $scope.$broadcast('show-errors-check-validity');

      if (vm.loginForm.$valid) {
        Auth.signUpFb(credentials)
          .then(function () {
            $state.go('about');
          })
          .catch(function (err) {
            console.log(err);
            vm.errorMessage = err.message ? err.message : err;
          });
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

    function onSuccess() {
      console.log('user event successful');
      $state.go('home');
    }

    function onError(err) {
      console.log(err);
      vm.errorMessage = err.message ? err.message : 'An unknown error has occurred';
    }
  }
}());
