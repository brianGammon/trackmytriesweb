(function () {
  'use strict';

  angular
    .module('item')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('item', {
        url: '/item?categoryId',
        templateUrl: 'item/item.tpl.html',
        controller: 'ItemCtrl',
        controllerAs: 'item',
        resolve: {
          currentUser: ['User', function (User) {
            return User.signInRequired();
          }]
        }
      });
  }
}());
