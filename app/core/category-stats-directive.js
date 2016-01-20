(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name user.directive:showErrors
   *
   * @description
   *
   */
  angular
    .module('core')
    .directive('categoryStats', categoryStats);

  function categoryStats() {
    return {
      restrict: 'E',
      // require: '^form',
      // link: linker
      templateUrl: 'core/category-stats.tpl.html',
      scope: {
        category: '=',
        viewAll: '=',
        addFn: '&'
      }
    };
  }
}());
