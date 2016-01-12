(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name header.controller:HeaderCtrl
   *
   * @description
   *
   */
  angular
    .module('core')
    .controller('HeaderCtrl', HeaderCtrl);

  function HeaderCtrl($state, Category, User) {
    var vm = this;

    function updateUser() {
      vm.currentUser = User.getUser();
    }

    Category.getCategories().then(function (result) {
      vm.categories = result;
    });

    vm.currentUser = User.getUser();

    vm.signout = function () {
      // localStorage.clearAll();
      User.clear();
      $state.go('home', {}, {reload: true});
    };

    User.onSignInChange(updateUser);
  }
}());
