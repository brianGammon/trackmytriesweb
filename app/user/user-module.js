(function () {
  'use strict';

  /* @ngdoc object
   * @name user
   * @description
   *
   */
  angular
    .module('user', [
      'ui.router',
      'ezfb',
      'angular-jwt'
    ])
    .config(function (ezfbProvider) {
      ezfbProvider.setInitParams({
        appId: '427394890789303'
      });
    });
}());
