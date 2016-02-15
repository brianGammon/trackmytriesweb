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

  function HomeCtrl(currentUser, Item, $uibModal, ngToast) {
    var vm = this;

    vm.loading = true;
    vm.currentUser = currentUser;
    if (vm.currentUser) {
      refreshStats();
    }

    // Chart sample data
    vm.chartData = [[24, 40, 50, 53, 61, 43, 63, 65, 55, 63, 66, 72],
      [70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70]];
    vm.chartSeries = ['Number of sit ups completed in 2 minutes', 'Sit ups Goal'];
    vm.chartLabels = ['8/6/12', '8/17/12', '9/16/12', '9/23/12', '10/20/12', '11/1/12',
      '11/17/12', '11/28/12', '12/3/12', '12/25/12', '1/31/13', '2/2/13'];
    vm.chartOptions = {};

    vm.addNew = function (category) {
      $uibModal.open({
        templateUrl: 'item/item-modal.tpl.html',
        controller: 'ItemModalCtrl',
        controllerAs: 'itemModal',
        resolve: {
          currentUser: function () {
            return currentUser;
          },
          category: function () {
            return category;
          },
          item: function () {
            return null;
          }
        }
      }).result.then(function (item) {
        popMessage(item);
        refreshStats(item);
      });
    };

    function popMessage(item) {
      ngToast.info('Saved new ' + item.category.name + ' Try');
    }

    function refreshStats(newItem) {
      Item.getStats().then(function (categories) {
        vm.categories = categories;
        if (newItem) {
          angular.forEach(categories, function (category) {
            if (category.stats && category.stats.best._id === newItem._id) {
              ngToast.success(
                '<strong>Congratulations!</strong> That\'s a new ' + newItem.category.name + ' PR!'
              );
            }
          });
        }
      })
      .finally(function () {
        vm.loading = false;
      });
    }
  }
}());
