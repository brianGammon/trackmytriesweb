/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('HomeCtrl', function () {
  var ctrl,
      $q,
      currentUser = {email: 'bgammon@test.com'},
      Item = {},
      $modal = {},
      records = [{record: 1}, {record: 2}, {record: 3}];

  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller, _$q_) {
    $q = _$q_;

    Item.getRecords = function () {
      var deferred = $q.defer();
      deferred.resolve(records);

      return deferred.promise;
    };

    ctrl = $controller('HomeCtrl', {currentUser: currentUser, Item: Item, $modal: $modal});

    $rootScope.$apply();
  }));

  it('should have a list of personal records', function () {
    expect(ctrl.records).to.equal(records);
  });
});