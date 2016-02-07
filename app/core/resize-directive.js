(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name core.directive:resize
   *
   * @description
   *
   */
  angular
    .module('core')
    .directive('resize', resize);

  function resize($window) {
    return function (scope, element) {
      var w = angular.element($window);

      w.bind('resize', function () {
        // when window size gets changed
        changeHeight();
      });

      // when page loads
      changeHeight();

      function changeHeight() {
        element.css('height', w.height() + 'px');
      }
    };
  }
}());
