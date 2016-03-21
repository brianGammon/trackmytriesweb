(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name workout.factory:Workout
   *
   * @description
   *
   */
  angular
    .module('workout')
    .factory('Workout', Workout);

  function Workout($http, $filter) {
    // The object to be returned
    var WorkoutBase = {};

    WorkoutBase.getWorkouts = function () {
      return $http.get('./workout/fakeWorkouts.json')
        .then(function (result) {
          return result.data;
        });
    };

    WorkoutBase.getWorkoutInstances = function (workoutId) {
      return $http.get('./workout/fakeWorkoutInstances.json')
        .then(function (result) {
          var instances = $filter('filter')(result.data, workoutId);
          return instances;
        });
    };

    WorkoutBase.getWorkoutInstance = function (workoutId, workoutDate) {
      return $http.get('./workout/fakeWorkoutInstances.json')
        .then(function (result) {
          console.log(workoutDate);
          // var instance = $filter('filter')(result.data, workoutId);
          return result.data[0];
        });
    };

    // Giving back the object to the caller
    return WorkoutBase;
  }
}());
