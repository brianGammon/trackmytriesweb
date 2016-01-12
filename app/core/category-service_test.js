/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Category', function () {
  var factory,
      apiUrl,
      $httpBackend;

  beforeEach(module('core'));

  beforeEach(inject(function (Category, _$httpBackend_, _API_) {
    factory = Category;
    apiUrl = _API_;
    $httpBackend = _$httpBackend_;
  }));

  it('should provide a list of all categories from the backend', function () {
    var categories,
        fakeApiResponse = [
          {name: 'sit ups'},
          {name: 'push ups'}
        ];

    $httpBackend
      .when('GET', apiUrl + '/categories')
      .respond(200, fakeApiResponse);

    factory.getCategories().then(function (result) {
      categories = result;
    });

    $httpBackend.flush();

    expect(categories).to.eql(fakeApiResponse);
  });
});
