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

  function HeaderCtrl($state, $timeout, Category, User, ngToast) {
    var vm = this,
        signoutClicked = true;

    User.getUser().then(function (user) {
      // Grab our current user and start listening for sign in changes
      console.log(user);
      vm.currentUser = user;
      User.onSignInChange(updateUser);
    });

    vm.categories = Category.getCategories();

    // Handle signing out here
    vm.signout = function () {
      signoutClicked = true;
      User.clear();
    };

    // Internal function for handling login state change
    function updateUser() {
      $timeout(function () {
        // Before asking for the current user, see if we had one before
        var userBefore = !!vm.currentUser;

        User.getUser().then(function (user) {
          vm.currentUser = user;
          if (!vm.currentUser && userBefore) {
            // No user now, but there was before
            if (!signoutClicked) {
              // If logout wasn't clicked, then the firebase session has ended
              ngToast.info('Sorry, your session has expired.');
            }

            // Send user back to home page
            $state.go('home', {}, {reload: true});
          } else {
            // Reset click flag for next time
            signoutClicked = false;
          }
        });
      });
    }
  }
}());
