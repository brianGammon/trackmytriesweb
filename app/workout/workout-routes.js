(function () {
  'use strict';

  angular
    .module('workout')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('workout', {
        url: '/workout',
        templateUrl: 'workout/workout.tpl.html',
        controller: 'WorkoutCtrl',
        controllerAs: 'workout',
        resolve: {
          currentUser: ['User', function (User) {
            return User.getUser();
          }]
        }
      });
  }
}());
