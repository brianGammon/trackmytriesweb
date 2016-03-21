(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name workout.controller:WorkoutCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('WorkoutCtrl', WorkoutCtrl);

  function WorkoutCtrl(currentUser, Workout) {
    var vm = this;

    Workout.getWorkouts()
      .then(function (result) {
        vm.workouts = result;
      });
  }
}());
