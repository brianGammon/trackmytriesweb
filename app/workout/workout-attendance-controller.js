(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name workout.controller:WorkoutAttendanceCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('WorkoutAttendanceCtrl', WorkoutAttendanceCtrl);

  function WorkoutAttendanceCtrl(currentUser, Member, Workout, $stateParams, $filter) {
    var vm = this;

    vm.searchType = 'Regulars';
    vm.workoutId = $stateParams.workoutId;
    vm.workoutDate = $filter('date')($stateParams.workoutDate, 'yyyy-MM-dd');
    vm.isToday = $filter('date')($stateParams.workoutDate, 'yyyy-MM-dd') ===
      $filter('date')(Date.now(), 'yyyy-MM-dd');

    Workout.getWorkoutInstance($stateParams.workoutId, $filter('date')($stateParams.workoutDate, 'yyyy-MM-dd'))
      .then(function (result) {
        console.log(result);
        vm.instance = result;
      });

    Member.getMembers()
      .then(function (result) {
        vm.regulars = $filter('filter')(result.results, '6PMRVA');
        vm.members = result.results;
      })
      .catch(function (error) {
        console.log(error);
        vm.errorMessage = error;
      });

    vm.search = function (searchText) {
      console.log(searchText);
      vm.members = [];
    };

    vm.checkIn = function (member) {
      if (vm.indexOfMember(member) > -1) {
        console.log('Already checked in');
      } else {
        vm.instance.attendance.push(member);
      }
    };

    vm.remove = function (member) {
      var index = vm.indexOfMember(member);
      // var index = arrayObjectIndexOf(vm.instance.attendance, member.user.SSN, 'member.user.SSN');
      if (index > -1) {
        vm.instance.attendance.splice(index, 1);
      } else {
        console.log('Not found in checked in list');
      }
    };

    vm.indexOfMember = function (member) {
      return vm.instance.attendance.map(function (e) {
        return e.user.SSN;
      }).indexOf(member.user.SSN);
    };
  }
}());
