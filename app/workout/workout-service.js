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

  function Workout($localStorage, $q, $http, $filter) {
    // The object to be returned
    var WorkoutBase = {};

    WorkoutBase.getWorkouts = function () {
      return $http.get('./workout/fakeWorkouts.json')
        .then(function (result) {
          return result.data;
        });
    };

    WorkoutBase.getWorkoutInstances = function (workoutId) {
      var deferred = $q.defer(),
          storedInstances;

      if ($localStorage.instances) {
        console.log('Getting instances from storage');
        storedInstances = $filter('filter')($localStorage.instances, workoutId);
        deferred.resolve(storedInstances);
        return deferred.promise;
      }

      return $http.get('./workout/fakeWorkoutInstances.json')
        .then(function (result) {
          var instances;

          $localStorage.instances = result.data;
          instances = $filter('filter')(result.data, workoutId);
          console.log('Getting instances from file');

          return instances;
        });
    };

    WorkoutBase.getWorkoutInstance = function (workoutId, workoutDate) {
      var deferred = $q.defer(),
          instance;
      if ($localStorage.instances) {
        console.log('Getting single instance from storage');
        instance = $filter('filter')($localStorage.instances, {date: workoutDate, workout: {id: workoutId}});
        deferred.resolve($localStorage.instances[0]);
        return deferred.promise;
      }

      return $http.get('./workout/fakeWorkoutInstances.json')
        .then(function (result) {
          $localStorage.instances = result.data;
          instance = $filter('filter')(result.data, {date: workoutDate, workout: {id: workoutId}});
          console.log('Getting single instance from file');
          return instance[0];
        });
    };

    // Giving back the object to the caller
    return WorkoutBase;
  }
}());
