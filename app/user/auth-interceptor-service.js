// (function () {
//   'use strict';
//
//   /**
//    * @ngdoc service
//    * @name user.service:AuthInterceptor
//    *
//    * @description
//    *
//    */
//   angular
//     .module('user')
//     .factory('AuthInterceptor', authInterceptor)
//     .config(pushInterceptor);
//
//   function authInterceptor($q, $injector, User, API) {
//     return {
//       request: function (config) {
//         var token = User.getToken();
//
//         if (token && config.url.indexOf(API) > -1) {
//           config.headers['x-access-token'] = token;
//         }
//         return config;
//       },
//       responseError: function (rejection) {
//         if (rejection.status === 401) {
//           // 401 means bad, expired, or no token
//           User.clear();
//           return $injector.get('$state').go('home', {}, {reload: true});
//         }
//
//         return $q.reject(rejection);
//       }
//     };
//   }
//
//   function pushInterceptor($httpProvider) {
//     $httpProvider.interceptors.push('AuthInterceptor');
//   }
// }());
