(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name user.directive:stateLoadingIndicator
   *
   * @description
   *
   */
  angular
    .module('core')
    .directive('stateLoadingIndicator', stateLoadingIndicator);

  function stateLoadingIndicator($rootScope) {
    function linker(scope) {
      var onStateChangeStart,
          onStateChangeSuccess;

      scope.isStateLoading = false;

      onStateChangeStart = $rootScope.$on('$stateChangeStart', function () {
        scope.isStateLoading = true;
      });
      onStateChangeSuccess = $rootScope.$on('$stateChangeSuccess', function () {
        scope.isStateLoading = false;
      });
      $rootScope.$on('$destroy', onStateChangeStart, onStateChangeSuccess);
    }

    return {
      restrict: 'E',
      templateUrl: 'core/state-loading-indicator.tpl.html',
      replace: true,
      link: linker
    };
  }
}());
