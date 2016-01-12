(function () {
  'use strict';

  angular
    .module('prttrackerweb')
    .config(config)
    .run(function ($rootScope, $state) {
      var onStateChangeError = $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        event.preventDefault();
        if (error === 'AUTH_REQUIRED') {
          $state.go('signin');
        }
      });
      $rootScope.$on('$destroy', onStateChangeError);
    });

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }
}());
