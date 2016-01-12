(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name user.directive:showErrors
   *
   * @description
   *
   */
  angular
    .module('core')
    .directive('showErrors', showErrors);

  function showErrors() {
    function linker(scope, el, attrs, formCtrl) {
      // find the text box element, which has the 'name' attribute
      var inputEl = el[0].querySelector('[name]'),
          // convert the native text box element to an angular element
          inputNgEl = angular.element(inputEl),
          // get the name on the text box
          inputName = inputNgEl.attr('name'),
          blurred = false;

      // only apply the has-error class after the user leaves the text box
      inputNgEl.bind('blur', function () {
        blurred = true;
        el.toggleClass('has-error', formCtrl[inputName].$invalid);
      });

      scope.$watch(function () {
        return formCtrl[inputName].$invalid;
      }, function (invalid) {
        // we only want to toggle the has-error class after the blur
        // event or if the control becomes valid
        if (!blurred && invalid) {
          return;
        }
        el.toggleClass('has-error', invalid);
      });

      scope.$on('show-errors-check-validity', function () {
        el.toggleClass('has-error', formCtrl[inputName].$invalid);
      });
    }

    return {
      restrict: 'A',
      require: '^form',
      link: linker
    };
  }
}());
