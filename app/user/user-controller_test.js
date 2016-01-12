/* global describe, beforeEach, it, expect, inject, module */
/* eslint no-unused-expressions:0 */
/* jshint expr: true */
'use strict';

describe('UserCtrl', function () {
  var ctrl,
      Auth = {},
      state,
      scope;

  beforeEach(function () {
    module(function ($provide) {
      // The AuthInterceptor on user module needs these dependencies
      $provide.constant('$localStorage', {});
      $provide.constant('API', 'http://localhost:8080');
    });
    module('user');
  });

  beforeEach(inject(function ($rootScope, $controller, $state) {
    state = $state;
    scope = $rootScope.$new();

    ctrl = $controller('UserCtrl', {Auth: Auth, $state: state, $scope: scope});
  }));

  it('should have Sign In method', function () {
    expect(ctrl.signIn).to.exist;
  });
});
