/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('HomeCtrl', function () {
  var ctrl,
      $q,
      currentUser = {email: 'bgammon@test.com'},
      Item = {},
      $uibModal = {},
      categories = [{record: 1}, {record: 2}, {record: 3}];

  beforeEach(module('ngToast'));
  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller, _$q_) {
    $q = _$q_;

    Item.getStats = function () {
      var deferred = $q.defer();
      deferred.resolve(categories);

      return deferred.promise;
    };

    ctrl = $controller('HomeCtrl', {currentUser: currentUser, Item: Item, $uibModal: $uibModal});

    $rootScope.$apply();
  }));

  it('should have a list of personal records', function () {
    expect(ctrl.categories).to.equal(categories);
  });
});
