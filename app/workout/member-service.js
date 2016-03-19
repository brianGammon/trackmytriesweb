(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name workout.factory:Member
   *
   * @description
   *
   */
  angular
    .module('workout')
    .factory('Member', Member);

  function Member($http) {
    // The object to be returned
    var MemberBase = {};

    MemberBase.getMembers = function () {
      return $http.get('./workout/fakeMembers.json')
        .then(function (result) {
          return result.data;
        });
    };

    // Giving back the object to the caller
    return MemberBase;
  }
}());
