/* global describe, beforeEach, afterEach, it, assert, expect, inject, module */
/* eslint no-unused-expressions: 0 */
/* jshint expr: true */
'use strict';

describe('User', function () {
  var factory,
      $localStorage,
      $rootScope;

  beforeEach(function () {
    module('ngStorage');
    module('user');
  });

  beforeEach(inject(function (User, _$rootScope_, _$localStorage_) {
    $localStorage = _$localStorage_;
    $rootScope = _$rootScope_;
    factory = User;
  }));

  afterEach(function () {
    $localStorage.user = null;
  });

  describe('signInRequired() specs', function () {
    it('should return return valid user stored', function () {
      $localStorage.user = {email: 'bgammon@test.com'};

      factory.signInRequired()
        .then(function (user) {
          expect(user).to.exist;
        })
        .catch(function () {
          assert.ok('false', 'should have returned a user');
        });

      $rootScope.$apply();
    });

    it('should return auth error is user not stored', function () {
      factory.signInRequired()
        .then(function () {
          // Promise should have rejected
          assert.ok(false, 'Should not have returned a user');
        })
        .catch(function (err) {
          expect(err).to.equal('AUTH_REQUIRED');
        });

      $rootScope.$apply();
    });
  });

  describe('clear() specs', function () {
    it('should clear user and token from localStorage', function () {
      $localStorage.user = {email: 'bgammon@test.com'};
      $localStorage.token = '123456789ABC';

      factory.clear();

      expect($localStorage.user).to.not.exist;
      expect($localStorage.token).to.not.exist;
    });

    it('should notify callback when clear called', function () {
      var called = false;

      function cb() {
        called = true;
      }

      factory.onSignInChange(cb);
      factory.clear();

      expect(called).to.be.true;
    });
  });
});
