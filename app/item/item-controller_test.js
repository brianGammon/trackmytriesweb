/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ItemCtrl', function () {
  var ctrl,
      ctrlParams,
      Item,
      currentUser,
      $stateParams,
      $filter,
      $uibModal = {},
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
        valueType: 'number',
        goalType: 'more'
      },
      itemValue: '20',
      notes: 'First day at ST',
      itemDateTime: '2012-08-01T18:11:57.000Z'
    };

    $stateParams = _$stateParams_;
    $filter = _$filter_;
    window = _$window_;
    Item = {};
    currentUser = {};
    $q = _$q_;

    Item.getItems = function () {
      var deferred = $q.defer();
      deferred.resolve([item]);

      return deferred.promise;
    };

    Item.getStatsByCategory = function () {
      var deferred = $q.defer(),
          category = {
            _id: '5645fcd1a01ca905ef611b5b',
            name: 'Sit Ups',
            description: 'Sit ups in 2 minutes',
            valueType: 'number',
            goalType: 'more',
            stats: {
              best: {
                _id: '5645fd5662047212024e51c7'
              },
              latest: {
                valueNumber: 66
              }
            }
          };
      deferred.resolve(category);
      return deferred.promise;
    };

    $stateParams.categoryId = '5645fcd1a01ca905ef611b5b';

    ctrlParams = {
      Item: Item,
      currentUser:
      currentUser,
      $stateParams: $stateParams,
      $filter: $filter,
      $uibModal: $uibModal,
      $window: window
    };

    ctrl = $controller('ItemCtrl', ctrlParams);
    $rootScope.$apply();
  }));

  it('should have the correct personal record', function () {
    expect(ctrl.category.stats.best._id).to.equal('5645fd5662047212024e51c7');
  });
});
