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
    vm.ctrlName = '6PM RVA March 18, 2016';
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
      if (vm.checkedIn.indexOf(member) > -1) {
        console.log('Already checked in');
      } else {
        vm.checkedIn.push(member);
      }
    };

    vm.remove = function (member) {
      var index = vm.checkedIn.indexOf(member);
      if (index > -1) {
        vm.checkedIn.splice(index, 1);
      } else {
        console.log('Not found in checked in list');
      }
    };
  }
}());
