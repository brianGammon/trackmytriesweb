(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name item-edit.controller:ItemEditCtrl
   *
   * @description
   *
   */
  angular
    .module('item')
    .controller('ItemEditCtrl', ItemEditCtrl);

  function ItemEditCtrl($modalInstance, item, Item, $scope) {
    var vm = this;

    vm.item = item;

    vm.dismiss = function () {
      $modalInstance.dismiss();
    };

    vm.save = function () {
      $scope.$broadcast('show-errors-check-validity');

      if (vm.form.$valid) {
        Item.updateItem(vm.item)
          .then(function (updatedItem) {
            // JavaScript DateTime fix
            updatedItem.itemDateTime = new Date(updatedItem.itemDateTime);
            $modalInstance.close(updatedItem);
          })
          .catch(function (err) {
            vm.errorMessage = err.data ? err.data : 'An unknown error has occurred';
          });
      }
    };
  }
}());
