(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl(currentUser, Item, $modal) {
    var vm = this;

    function refreshPrs() {
      Item.getRecords().then(function (records) {
        vm.records = records;
      });
    }

    vm.currentUser = currentUser;
    if (vm.currentUser) {
      refreshPrs();
    }

    // Chart sample data
    vm.chartData = [[24, 40, 50, 53, 61, 43, 63, 65, 55, 63, 66, 72]];
    vm.chartSeries = ['Number of sit ups completed in 2 minutes'];
    vm.chartLabels = ['8/6/12', '8/17/12', '9/16/12', '9/23/12', '10/20/12', '11/1/12', '11/17/12', '11/28/12', '12/3/12', '12/25/12', '1/31/13', '2/2/13'];
    vm.chartOptions = {};

    vm.addNew = function (category) {
      $modal.open({
        templateUrl: 'item/item-modal.tpl.html',
        controller: 'ItemNewCtrl',
        controllerAs: 'itemModal',
        resolve: {
          currentUser: function () {
            return currentUser;
          },
          category: function () {
            return category;
          }
        }
      }).result.then(function () {
        refreshPrs();
      });
    };
  }
}());
