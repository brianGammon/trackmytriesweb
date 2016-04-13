(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name item.controller:ItemModalCtrl
   *
   * @description
   *
   */
  angular
    .module('item')
    .controller('ItemModalCtrl', ItemModalCtrl);

  function ItemModalCtrl($uibModalInstance, item, category, currentUser, Item, $scope) {
    var vm = this,
        defaultValue = 0,
        date;

    if (!item) {
      // Default new item to the value of the last one, if supplied
      if (category.stats.latest.length > 0) {
        defaultValue = category.stats.latest[0].valueNumber;
      }
      vm.item = {};
      vm.item.user = currentUser;
      vm.item.itemDateTime = new Date(Date.now());
      vm.item.valueNumber = defaultValue;
      vm.item.category = category;
    } else {
      vm.item = item;
      vm.item.itemDateTime = new Date(item.itemDateTime);
      vm.item.category = category;
    }

    // if this is a duration category, convert the valueNumber to a date
    if (vm.item.category.valueType === 'duration') {
      date = new Date(vm.item.valueNumber * 1000);
      vm.timePickerDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }

    vm.durationChanged = function () {
      var hh,
          mm,
          ss;

      if (vm.timePickerDate) {
        hh = vm.timePickerDate.getHours();
        mm = vm.timePickerDate.getMinutes();
        ss = vm.timePickerDate.getSeconds();
        vm.item.valueNumber = hh * 60 * 60 + mm * 60 + ss;
        vm.durationError = null;
      } else {
        vm.durationError = 'Invalid duration selected';
      }
    };

    vm.dismiss = function () {
      $uibModalInstance.dismiss();
    };

    vm.save = function () {
      $scope.$broadcast('show-errors-check-validity');

      if (vm.form.$valid && !vm.durationError) {
        if (item) {
          // An item was passed in, so this is an update
          Item.updateItem(currentUser.$id, vm.item)
            .then(onSuccess)
            .catch(onError);
        } else {
          Item.addItem(currentUser.$id, vm.item)
            .then(onSuccess)
            .catch(onError);
        }
      }
    };

    function onSuccess() {
      if (vm.item) {
        $uibModalInstance.close(vm.item);
      } else {
        // If no result, then authorization probably failed
        $uibModalInstance.dismiss();
      }
    }

    function onError(err) {
      vm.errorMessage = err.data ? err.data : 'An unknown error has occurred';
    }
  }
}());
