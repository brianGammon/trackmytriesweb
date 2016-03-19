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

  function WorkoutCtrl(currentUser, Member, $filter) {
    var vm = this;

    vm.checkedIn = [];
    vm.activeTab = 1;
    vm.ctrlName = 'Workout: 6PM RVA';
    vm.username = 'Instructor: ' + currentUser.name;

    Member.getMembers()
      .then(function (result) {
        vm.regulars = $filter('filter')(result.results, '6PMRVA');
      })
      .catch(function (error) {
        console.log(error);
        vm.errorMessage = error;
      });

    vm.checkIn = function (member) {
      vm.checkedIn.push(member);
    }
  }
}());
