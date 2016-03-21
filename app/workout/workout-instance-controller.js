(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name workout.controller:WorkoutInstanceCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('WorkoutInstanceCtrl', WorkoutInstanceCtrl);

  function WorkoutInstanceCtrl(currentUser, $stateParams, $filter, Workout) {
    var vm = this;
    vm.workoutDate = $filter('date')($stateParams.workoutDate, 'EEE, MMM d, y');
    vm.isToday = $filter('date')($stateParams.workoutDate, 'yyyy-MM-dd') ===
      $filter('date')(Date.now(), 'yyyy-MM-dd');

    Workout.getWorkoutInstance($stateParams.workoutId, '')
      .then(function (result) {
        console.log(result);
        vm.instance = result;
      });
  }
}());
