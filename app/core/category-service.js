(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name core.factory:Category
   *
   * @description
   *
   */
  angular
    .module('core')
    .factory('Category', Category);

  function Category($http, API) {
    // The object to be returned
    var CategoryBase = {};

    CategoryBase.getCategories = function () {
      return $http.get(API + '/categories')
        .then(function (result) {
          return result.data;
        });
    };

    CategoryBase.getCategory = function (categoryId) {
      return $http.get(API + '/categories/' + categoryId)
        .then(function (result) {
          return result.data;
        });
    };

    // Giving back the object to the caller
    return CategoryBase;
  }
}());
