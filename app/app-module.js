(function () {
  'use strict';

  /* @ngdoc object
   * @name trackmytriesweb
   * @description
   *
   */
  angular
    .module('trackmytriesweb', [
      'ui.router',
      'ui.bootstrap',
      'chart.js',
      'ngStorage',
      'ngMessages',
      'home',
      'about',
      'user',
      'item',
      'core'
    ]);
}());
