(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name item.service:Item
   *
   * @description
   *
   */
  angular
    .module('item')
    .factory('Item', Item);

  function Item($http, API) {
    var ItemBase = {};

    function onSuccess(result) {
      return result.data;
    }

    ItemBase.getRecord = function (categoryId) {
      return $http.get(API + '/items/records', {
        params: {categoryId: categoryId}
      }).then(onSuccess);
    };

    ItemBase.getRecords = function () {
      return $http.get(API + '/items/records')
        .then(onSuccess);
    };

    ItemBase.getStatsByCategory = function (categoryId) {
      return $http.get(API + '/items/stats', {
        params: {categoryId: categoryId}
      }).then(onSuccess);
    };

    ItemBase.getStats = function () {
      return $http.get(API + '/items/stats')
        .then(onSuccess);
    };

    ItemBase.getItems = function (categoryId) {
      return $http.get(API + '/items', {
        params: {categoryId: categoryId}
      }).then(onSuccess);
    };

    ItemBase.getItemById = function (itemId) {
      return $http.get(API + '/items/' + itemId)
        .then(onSuccess);
    };

    ItemBase.updateItem = function (item) {
      return $http.put(API + '/items/' + item._id, item)
        .then(onSuccess);
    };

    ItemBase.addItem = function (item) {
      return $http.post(API + '/items', item)
        .then(onSuccess);
    };

    ItemBase.deleteItem = function (itemId) {
      return $http.delete(API + '/items/' + itemId)
        .then(onSuccess);
    };

    return ItemBase;
  }
}());
