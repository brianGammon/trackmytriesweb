(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name user.service:AuthInterceptor
   *
   * @description
   *
   */
  angular
    .module('user')
    .factory('AuthInterceptor', authInterceptor)
    .config(pushInterceptor);

  function authInterceptor(User, API) {
    return {
      request: function (config) {
        var token = User.getToken();

        if (token && config.url.indexOf(API) > -1) {
          config.headers['x-access-token'] = token;
        }
        return config;
      }
    };
  }

  function pushInterceptor($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  }
}());
