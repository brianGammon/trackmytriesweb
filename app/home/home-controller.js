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
      console.log(vm.currentUser);
      Item.getStats(vm.currentUser.$id).then(function (categories) {
        vm.categories = categories;
      })
      .finally(function () {
        vm.loading = false;
      });
    }

    // Chart sample data
    // vm.chartData = [[24, 40, 50, 53, 61, 43, 63, 65, 55, 63, 66, 72],
    //   [70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70]];
    // vm.chartSeries = ['Number of sit ups completed in 2 minutes', 'Sit ups Goal'];
    // vm.chartLabels = ['8/6/12', '8/17/12', '9/16/12', '9/23/12', '10/20/12', '11/1/12',
    //   '11/17/12', '11/28/12', '12/3/12', '12/25/12', '1/31/13', '2/2/13'];
    // vm.chartOptions = {};

    // Highchart sample data
    vm.chartConfig = {
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
        checkForPr(item);
      });
    };

    function popMessage(item) {
      ngToast.info('Saved new ' + item.category.name + ' Try');
    }

    function checkForPr(newItem) {
      angular.forEach(vm.categories, function (category) {
        if (category.stats && category.stats.best.$id === newItem.$id) {
          ngToast.success(
            '<strong>Congratulations!</strong> That\'s a new ' + newItem.category.name + ' PR!'
          );
        }
      });
    }
  }
}());
