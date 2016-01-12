(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name item-new.controller:ItemNewCtrl
   *
   * @description
   *
   */
  angular
    .module('item')
    .controller('ItemNewCtrl', ItemNewCtrl);

  function ItemNewCtrl($modalInstance, currentUser, Item, category, $scope) {
    var vm = this;

    vm.item = {};
    vm.item.user = currentUser;
    vm.item.itemDateTime = new Date(Date.now());
    vm.item.category = category;

    vm.dismiss = function () {
      $modalInstance.dismiss();
    };

    vm.save = function () {
      $scope.$broadcast('show-errors-check-validity');

      if (vm.form.$valid) {
        Item.addItem(vm.item)
          .then(function (result) {
            // Date fix for view
            result.itemDateTime = new Date(result.itemDateTime);
            // Put the populated category back
            result.category = vm.item.category;

            $modalInstance.close(result);
          })
          .catch(function (err) {
            vm.errorMessage = err.data ? err.data : 'An unknown error has occurred';
          });
      }
    };
  }
}());
