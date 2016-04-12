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

  function Category($firebaseArray, $firebaseObject, $window) {
    // The object to be returned
    var CategoryBase = {},
        categoriesRef = new $window.Firebase('https://trackmytries-dev.firebaseio.com/categories');

    CategoryBase.getCategories = function () {
      return $firebaseArray(categoriesRef);
    };

    CategoryBase.getCategory = function (categoryId) {
      return $firebaseObject(categoriesRef.child(categoryId));
    };

    // Giving back the object to the caller
    return CategoryBase;
  }
}());
