(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name user.directive:compareTo
   *
   * @description
   *
   */
  angular
    .module('user')
    .directive('compareTo', compareTo);

  function compareTo() {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=compareTo'
      },
      link: function (scope, element, attributes, ngModel) {
        ngModel.$validators.compareTo = function (modelValue) {
          return modelValue === scope.otherModelValue;
        };

        scope.$watch('otherModelValue', function () {
          ngModel.$validate();
        });
      }
    };
  }
}());
