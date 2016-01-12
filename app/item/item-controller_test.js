/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ItemCtrl', function () {
  var ctrl,
      Item,
      currentUser,
      Category,
      $stateParams,
      $state,
      $filter,
      $modal = {},
      scope,
      window,
      $q;

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
    };

    $stateParams = _$stateParams_;
    $state = _$state_;
    $filter = _$filter_;
    scope = $rootScope.$new();
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
            goalType: 'most'
          };

      deferred.resolve(category);
      return deferred.promise;
    };

    Item.getItems = function () {
      var deferred = $q.defer();
      deferred.resolve([item]);

      return deferred.promise;
    };

    Item.getRecord = function () {
      var deferred = $q.defer();
      deferred.resolve(item);
      return deferred.promise;
    };

    $stateParams.categoryId = '5645fcd1a01ca905ef611b5b';

    ctrl = $controller('ItemCtrl', {Item: Item, currentUser: currentUser, Category: Category, $stateParams: $stateParams, $state: $state, $filter: $filter, $scope: scope, $modal: $modal, $window: window});
    $rootScope.$apply();
  }));

  it('should have the correct personal record', function () {
    expect(ctrl.personalRecord._id).to.equal('5645fd5662047212024e51c7');
  });
});
