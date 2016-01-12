(function () {
  'use strict';

  /* @ngdoc object
   * @name prttrackerweb
   * @description
   *
   */
  angular
    .module('prttrackerweb', [
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
