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
      'ngStorage',
      'ngMessages',
      'ngToast',
      'home',
      'about',
      'user',
      'item',
      'core',
      'workout'
    ]);
}());
