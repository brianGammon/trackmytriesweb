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

  function Item($q, $firebaseArray, $firebaseObject, $window) {
    var ItemBase = {},
        rootRef = new $window.Firebase('https://trackmytries-dev.firebaseio.com'),
        userItemsRef = rootRef.child('userItems');

    ItemBase.getStatsByCategory = function (uid, category) {
      var stats = {};

      if (category.goalType === 'least') {
        stats.best = $firebaseArray(getUserItemsRef(uid).child(category.$id)
          .orderByChild('valueNumber').limitToFirst(1));
      } else {
        stats.best = $firebaseArray(getUserItemsRef(uid).child(category.$id)
          .orderByChild('valueNumber').limitToLast(1));
      }

      stats.latest = $firebaseArray(getUserItemsRef(uid).child(category.$id)
        .orderByChild('itemDateTime').limitToLast(1));
      stats.first = $firebaseArray(getUserItemsRef(uid).child(category.$id)
        .orderByChild('itemDateTime').limitToFirst(1));
      return stats;
    };

    ItemBase.getStats = function (uid) {
      // Get a list of category keys
      var deferred = $q.defer();

      $firebaseArray(rootRef.child('categories')).$loaded().then(function (categories) {
        angular.forEach(categories, function (category) {
          category.stats = {};

          if (category.goalType === 'most') {
            category.stats.best = $firebaseArray(getUserItemsRef(uid).child(category.$id).orderByChild('valueNumber')
              .limitToLast(1));
          } else {
            category.stats.best = $firebaseArray(getUserItemsRef(uid).child(category.$id).orderByChild('valueNumber')
              .limitToFirst(1));
          }

          category.stats.latest = $firebaseArray(getUserItemsRef(uid).child(category.$id).orderByChild('itemDateTime')
            .limitToLast(1));
          category.stats.first = $firebaseArray(getUserItemsRef(uid).child(category.$id).orderByChild('itemDateTime')
            .limitToFirst(1));
        });

        deferred.resolve(categories);
      });

      return deferred.promise;
    };

    ItemBase.getItems = function (uid, categoryId) {
      // b5385492-7a8c-41c2-875e-ada21dd0c8d4/--KF1vDSZUeLSheoTCcT8')
      return $firebaseArray(getUserItemsRef(uid).child(categoryId));
    };

    ItemBase.updateItem = function (uid, item) {
      console.log(item);
      return getUserItemsRef(uid).child(item.category.$id).child(item.$id).update({
        itemDateTime: item.itemDateTime.toJSON(),
        valueNumber: item.valueNumber,
        notes: item.notes ? item.notes : null
      });
    };

    ItemBase.addItem = function (uid, item) {
      console.log(item);
      return getUserItemsRef(uid).child(item.category.$id).push({
        itemDateTime: item.itemDateTime.toJSON(),
        valueNumber: item.valueNumber,
        notes: item.notes ? item.notes : null
      }).then(function (data) {
        console.log(data);
      });
    };

    ItemBase.deleteItem = function (uid, categoryId, itemId) {
      return getUserItemsRef(uid).child(categoryId).child(itemId).set(null);
    };

    return ItemBase;

    function getUserItemsRef(uid) {
      return userItemsRef.child(uid);
    }
  }
}());
