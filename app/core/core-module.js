(function () {
  'use strict';

  /* @ngdoc object
   * @name core
   * @description
   *
   */
  angular
    .module('core', [
      'ui.router',
      'smoothScroll'
    ])
    .constant('API', 'http://localhost:8080');
}());
