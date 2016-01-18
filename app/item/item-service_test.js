/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Item', function () {
  var factory,
      apiUrl,
      $httpBackend;

  beforeEach(function () {
    module(function ($provide) {
      $provide.constant('API', 'http://localhost:8080');
    });
    module('item');
  });

  beforeEach(inject(function (Item, _$httpBackend_, _API_) {
    factory = Item;
    apiUrl = _API_;
    $httpBackend = _$httpBackend_;
  }));

  it('should get list of personal records from API', function () {
    var records,
        fakeApiResponse = [
            {
              record: 1
            },
            {
              record: 2
            }
        ];

    $httpBackend
      .when('GET', apiUrl + '/items/stats')
      .respond(200, fakeApiResponse);

    factory.getStats().then(function (result) {
      records = result;
    });

    $httpBackend.flush();

    expect(records).to.eql(fakeApiResponse);
  });
});
