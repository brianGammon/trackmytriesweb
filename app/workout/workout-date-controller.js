(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name workout.controller:WorkoutDateCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('WorkoutDateCtrl', WorkoutDateCtrl);

  function WorkoutDateCtrl(currentUser, $stateParams, $filter, Workout) {
    var vm = this;
    vm.today = $filter('date')(Date.now(), 'yyyy-MM-dd');

    Workout.getWorkoutInstances($stateParams.workoutId)
      .then(function (result) {
        vm.workoutInstances = result;
      });
  }
}());
