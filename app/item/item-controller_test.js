/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ItemCtrl', function () {
  var ctrl,
      Item,
      currentUser,
      Category,
      $stateParams,
      $filter,
      $modal = {},
      window,
      $q;

  beforeEach(module('ngToast'));
  beforeEach(module('item'));

  beforeEach(inject(function ($rootScope, $controller, _$stateParams_, _$state_, _$filter_, _$q_, _$window_) {
    var item = {
          _id: '5645fd5662047212024e51c7',
          user: {
            _id: '5645fc71890ca80f02ae4dd7',
            name: 'Brian'
          },
          category: {
            _id: '5645fcd1a01ca905ef611b5c',
            name: 'Push Ups',
            description: 'Push ups in 2 minutes',
            dataType: 'number',
            goalType: 'most'
          },
          itemValue: '20',
          notes: 'First day at ST',
          itemDateTime: '2012-08-01T18:11:57.000Z'
        },
        statsResults = {
          stats: {
            name: 'push ups',
            best: item
          }
        };

    $stateParams = _$stateParams_;
    $filter = _$filter_;
    window = _$window_;
    Item = {};
    currentUser = {};
    Category = {};
    $q = _$q_;

    Category.getCategory = function () {
      var deferred = $q.defer(),
          category = {
            _id: '5645fcd1a01ca905ef611b5b',
            name: 'Sit Ups',
            description: 'Sit ups in 2 minutes',
            dataType: 'number',
            goalType: 'most',
            stats: {
              best: {
                _id: '5645fd5662047212024e51c7'
              }
            }
          };

      deferred.resolve(category);
      return deferred.promise;
    };

    Item.getItems = function () {
      var deferred = $q.defer();
      deferred.resolve([item]);

      return deferred.promise;
    };

    Item.getStatsByCategory = function () {
      var deferred = $q.defer();
      deferred.resolve(statsResults);
      return deferred.promise;
    };

    $stateParams.categoryId = '5645fcd1a01ca905ef611b5b';

    ctrl = $controller('ItemCtrl', {Item: Item, currentUser: currentUser, Category: Category, $stateParams: $stateParams, $filter: $filter, $modal: $modal, $window: window});
    $rootScope.$apply();
  }));

  it('should have the correct personal record', function () {
    expect(ctrl.category.stats.best._id).to.equal('5645fd5662047212024e51c7');
  });
});
