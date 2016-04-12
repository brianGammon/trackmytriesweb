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

  /* eslint max-params: [2,8] */
  function ItemCtrl(Category, Item, currentUser, $stateParams, $filter, $uibModal, $window) {
    var vm = this,
        categoryId = $stateParams.categoryId;

    vm.loading = true;

    Category.getCategory(categoryId).$loaded(function (category) {
      vm.category = category;
      vm.category.stats = Item.getStatsByCategory(currentUser.$id, category);

      Item.getItems(currentUser.$id, categoryId).$loaded()
        .then(function (items) {
          vm.items = items;
          vm.items.$watch(function () {
            console.log('items changed');
            initChart();
            refreshChartData();
          });
          if (items.length > 0) {
            initChart();
            refreshChartData();
          }
        })
        .catch(onError)
        .finally(function () {
          vm.loading = false;
        });
    });

    // Item.getStatsByCategory(categoryId)
    //   .then(function (category) {
    //     vm.category = category;
    //
    //     Item.getItems(categoryId)
    //       .then(function (items) {
    //         vm.items = items;
    //         if (items.length > 0) {
    //           initChart();
    //           refreshChartData();
    //         }
    //       })
    //       .catch(onError);
    //   })
    //   .catch(onError)
    //   .finally(function () {
    //     vm.loading = false;
    //   });

    vm.edit = function (item) {
      $uibModal.open({
        templateUrl: 'item/item-modal.tpl.html',
        controller: 'ItemModalCtrl',
        controllerAs: 'itemModal',
        resolve: {
          currentUser: function () {
            return currentUser;
          },
          category: function () {
            return vm.category;
          },
          item: function () {
            return angular.copy(item);
          }
        }
      }).result.then(function (updatedItem) {
        console.log(updatedItem);
        // var key;
        //
        // // Map the updated copy to the original object
        // for (key in updatedItem) {
        //   // Manually set notes in case original item didn't have any
        //   if (item.hasOwnProperty(key) || key === 'notes') {
        //     item[key] = updatedItem[key];
        //   }
        // }
        //
        // refreshChartData();
        // refreshStats();
      });
    };

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
      }).result.then(function (savedItem) {
        console.log(savedItem);
        // vm.items.push(savedItem);
        // refreshChartData();
        // refreshStats(savedItem);
      });
    };

    vm.delete = function (item) {
      if ($window.confirm('Are you sure? Click OK to delete this Try.') === true) {
        console.log(item);
        console.log(vm.category);
        Item.deleteItem(currentUser.$id, vm.category.$id, item.$id)
          .then(function () {
            // vm.items.splice(index, 1);
            // refreshChartData();
            // refreshStats();
          })
          .catch(function (err) {
            onError(err);
          });
      }
    };

    // function refreshStats(newItem) {
    //   Item.getStatsByCategory(categoryId)
    //     .then(function (result) {
    //       vm.category = result;
    //
    //       // If a new item was saved and passed in check if a message should be popped
    //       if (vm.items.length > 1 && newItem && newItem._id === result.stats.best[0]._id) {
    //         ngToast.success('<strong>Congratulations!</strong> That\'s a new ' + result.name + ' PR!');
    //       }
    //     })
    //     .catch(onError);
    // }

    function refreshChartData() {
      var itemsCopy,
          chartSeries1 = [];

      // Sort the items array by date, descending
      itemsCopy = $filter('orderBy')(angular.copy(vm.items), 'itemDateTime', true);

      angular.forEach(itemsCopy, function (item) {
        // Date fix for view
        var d = new Date(item.itemDateTime);
        // value.itemDateTime = d;

        // var yy = $filter('date')(value.itemDateTime, 'yyyy');
        // chartSeries1.push([Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()), value.valueNumber]);
        chartSeries1.push([$filter('date')(d, 'shortDate'), item.valueNumber]);
      });

      vm.chartConfig.series[0].data = chartSeries1.reverse();
    }

    function initChart() {
      var latestTry = vm.category.stats.latest[0].valueNumber,
          seriesName = vm.category.valueType === 'duration' ? 'Time in MM:SS' : 'Number completed',
          goalLabel = 'Goal: ' + (latestTry + 1),
          minY = null;

      if (vm.category.goalType === 'less') {
        minY = Math.round(vm.category.stats.best[0].valueNumber * 0.95, 0);
      }

      if (vm.category.valueType === 'duration') {
        goalLabel = 'Goal: ' + secondsToHms(latestTry - 60);
      }

      vm.chartConfig = {
        options: {
          chart: {
            type: 'areaspline'
          },
          tooltip: {
            pointFormatter: function () {
              if (vm.category.valueType === 'duration') {
                return this.series.name + ': <b>' + secondsToHms(this.y) + '</b>';
              }

              return this.series.name + ': <b>' + this.y + '</b>';
            }
          },
          yAxis: {
            min: minY,
            title: {text: null},
            plotLines: [{
              value: latestTry + 1,
              color: 'green',
              width: 2,
              zIndex: 3,
              label: {text: goalLabel},
              dashStyle: 'shortdash'
            }],
            labels: {
              formatter: function () {
                // Formats the y-axis labels for HH:MM:SS
                if (vm.category.valueType === 'duration') {
                  /* eslint angular/controller-as-vm: [0] */
                  return secondsToHms(this.value);
                }
                return this.value;
              }
            }
          }
        },
        series: [{
          name: seriesName,
          data: [],
          marker: {
            enabled: true
          }
        }],
        title: {
          text: vm.category.name
        },
        subtitle: {
          text: vm.category.description
        },
        xAxis: {
          tickmarkPlacement: 'on',
          type: 'category'
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
