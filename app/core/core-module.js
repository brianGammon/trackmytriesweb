(function () {
  'use strict';

  /* @ngdoc object
   * @name core
   * @description
   *
   */
  angular
    .module('core', [
      'ui.router'
    ])
    .constant('API', 'http://localhost:8080');
}());
