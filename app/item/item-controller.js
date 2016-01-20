(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name item.controller:ItemCtrl
   *
   * @description
   *
   */
  angular
    .module('item')
    .controller('ItemCtrl', ItemCtrl);

  function ItemCtrl(Item, currentUser, Category, $stateParams, $filter, $modal, $window, ngToast) {
    var vm = this,
        categoryId = $stateParams.categoryId;

    vm.loading = true;
    Category.getCategory(categoryId)
      .then(function (category) {
        vm.category = category;

        Item.getItems(categoryId)
          .then(function (items) {
            vm.items = items;
            if (items.length > 0) {
              buildChartData();
              refreshStats();
            }
          })
          .catch(onError);
      })
      .catch(onError)
      .finally(function () {
        vm.loading = false;
      });

    vm.edit = function (item) {
      $modal.open({
        templateUrl: 'item/item-modal.tpl.html',
        controller: 'ItemEditCtrl',
        controllerAs: 'itemModal',
        resolve: {
          item: function () {
            return angular.copy(item);
          }
        }
      }).result.then(function (updatedItem) {
        var key;

        // Map the updated copy to the original object
        for (key in updatedItem) {
          // Manually set notes in case original item didn't have any
          if (item.hasOwnProperty(key) || key === 'notes') {
            item[key] = updatedItem[key];
          }
        }

        buildChartData();
        refreshStats();
      });
    };

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
      }).result.then(function (savedItem) {
        vm.items.push(savedItem);
        buildChartData();
        refreshStats(savedItem);
      });
    };

    vm.delete = function (index) {
      if ($window.confirm('Are you sure? Click OK to delete this Try.') === true) {
        Item.deleteItem(vm.items[index]._id)
          .then(function () {
            vm.items.splice(index, 1);
            buildChartData();
            refreshStats();
          })
          .catch(function (err) {
            onError(err);
          });
      }
    };

    function refreshStats(newItem) {
      Item.getStatsByCategory(categoryId)
        .then(function (result) {
          vm.category = result;

          // If a new item was saved and passed in check if a message should be popped
          if (vm.items.length > 1 && newItem && newItem._id === result.stats.best._id) {
            ngToast.success('<strong>Congratulations!</strong> That\'s a new ' + result.name + ' PR!');
          }
        })
        .catch(onError);
    }

    function buildChartData() {
      var chartLabels = [],
          chartData = [];
      // Sort the items array by date, descending
      vm.items = $filter('orderBy')(vm.items, 'itemDateTime', true);

      angular.forEach(vm.items, function (value) {
        // Date fix for view
        value.itemDateTime = new Date(value.itemDateTime);

        chartLabels.push($filter('date')(value.itemDateTime, 'shortDate'));

        if (vm.category.dataType === 'number') {
          chartData.push(value.valueNumber);
        } else {
          chartData.push(parseInt(value.valueTime.slice(0, 2), 10) * 60 +
            parseInt(value.valueTime.slice(-2), 10));
        }
      });
      vm.chartLabels = chartLabels.reverse();
      vm.chartData = [chartData.reverse()];
      vm.chartSeries = [vm.category.description];
      // Look into moment.js to deal with hh:mm:ss conversion
      vm.chartOptions = {
        tooltipTemplate: function (label) {
          // Formats the tooltip labels for HH:MM:SS
          if (vm.category.dataType === 'time') {
            return label.label + ' ' + secondsToHms(label.value);
          }
          return label.label + ' ' + label.value;
        },
        scaleLabel: function (label) {
          // Formats the y-axis labels for HH:MM:SS
          if (vm.category.dataType === 'time') {
            return secondsToHms(label.value);
          }
          return label.value;
        }
      };
    }

    function onError(err) {
      vm.errorMessage = err.data ? err.data : 'An unknown error has occurred';
    }

    function secondsToHms(d) {
      var h = Math.floor(Number(d) / 3600),
          m = Math.floor(Number(d) % 3600 / 60),
          s = Math.floor(Number(d) % 3600 % 60);
      return (h > 0 ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }
  }
}());
