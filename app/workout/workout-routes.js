(function () {
  'use strict';

  angular
    .module('workout')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('workout1', {
        url: '/workout1',
        templateUrl: 'workout/workout.tpl.html',
        controller: 'WorkoutCtrl',
        controllerAs: 'workout',
        resolve: {
          currentUser: ['User', function (User) {
            return User.getUser();
          }]
        }
      })
      .state('workout2', {
        url: '/workout2/',
        templateUrl: 'workout/workout-date.tpl.html',
        controller: 'WorkoutCtrl',
        controllerAs: 'workout',
        resolve: {
          currentUser: ['User', function (User) {
            return User.getUser();
          }]
        }
      })
      .state('workout', {
        url: '/workout',
        templateUrl: 'workout/workout-detail.tpl.html',
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
