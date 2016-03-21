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
        controllerAs: 'wo',
        resolve: {
          currentUser: ['User', function (User) {
            return User.getUser();
          }]
        }
      })
      .state('workout-date', {
        url: '/workout/:workoutId',
        templateUrl: 'workout/workout-date.tpl.html',
        controller: 'WorkoutDateCtrl',
        controllerAs: 'wd',
        resolve: {
          currentUser: ['User', function (User) {
            return User.getUser();
          }]
        }
      })
      .state('workout-instance', {
        url: '/workout/:workoutId/{workoutDate: date}',
        templateUrl: 'workout/workout-instance.tpl.html',
        controller: 'WorkoutInstanceCtrl',
        controllerAs: 'wi',
        resolve: {
          currentUser: ['User', function (User) {
            return User.getUser();
          }]
        }
      })
      .state('workout-attendance', {
        url: '/workout/:workoutId/{workoutDate: date}/attendance',
        templateUrl: 'workout/workout-attendance.tpl.html',
        controller: 'WorkoutAttendanceCtrl',
        controllerAs: 'wa',
        resolve: {
          currentUser: ['User', function (User) {
            return User.getUser();
          }]
        }
      });
  }
}());
