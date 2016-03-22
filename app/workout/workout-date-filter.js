(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name workout.filter:workoutDate
   *
   * @description
   *
   */
  angular
    .module('workout')
    .filter('workoutDate', workoutDate);

  function workoutDate($filter) {
    return function (date) {
      var d = new Date(date);
      d.setDate(d.getDate() + 1);
      return $filter('date')(d, 'EEE, MMM d, y');
    };
  }
}());
