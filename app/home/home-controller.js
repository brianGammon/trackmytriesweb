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
      Item.getStats(vm.currentUser.$id).then(function (categories) {
        vm.categories = categories;
      })
      .finally(function () {
        vm.loading = false;
      });
    }

    // Highchart sample data
    vm.chartConfig = initChart();

    vm.addNew = function (category) {
      var priorBest = category.stats.best[0].$id;
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
        checkForPr(priorBest, category);
      });
    };

    function popMessage(item) {
      ngToast.info('Saved new ' + item.category.name + ' Try');
    }

    function checkForPr(priorBest, category) {
      var bestNow = category.stats.best[0].$id;
      if (bestNow !== priorBest) {
        ngToast.success(
          '<strong>Congratulations!</strong> That\'s a new ' + category.name + ' PR!');
      }
    }

    function initChart() {
      return {
        options: {
          chart: {
            type: 'areaspline'
          },
          yAxis: {
            min: 20,
            title: {text: null},
            plotLines: [{
              value: 72,
              color: 'green',
              width: 2,
              zIndex: 3,
              label: {text: 'Goal: 72'},
              dashStyle: 'shortdash'
            }]
          }
        },
        series: [
          {
            name: 'Number completed',
            data: [
              [Date.UTC(2012, 7, 6), 24],
              [Date.UTC(2012, 7, 17), 40],
              [Date.UTC(2012, 8, 16), 50],
              [Date.UTC(2012, 8, 23), 53],
              [Date.UTC(2012, 9, 20), 61],
              [Date.UTC(2012, 10, 1), 43],
              [Date.UTC(2012, 10, 17), 72],
              [Date.UTC(2012, 10, 28), 65],
              [Date.UTC(2012, 11, 3), 55],
              [Date.UTC(2012, 11, 25), 63],
              [Date.UTC(2013, 0, 31), 66],
              [Date.UTC(2013, 1, 2), 69]
            ],
            marker: {
              enabled: true
            }
          }
        ],
        title: {
          text: 'Push Ups'
        },
        subtitle: {
          text: 'Number of push ups completed in 2 minutes'
        },
        loading: false,
        // Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
        // properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
        xAxis: {
          type: 'datetime'
        }
      };
    }
  }
}());
