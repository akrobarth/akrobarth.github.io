;(function() {
  /**
   * Definition of the main app module and its dependencies
   */

  angular
    .module('app', ['ngRoute','ngAnimate'])
    .config(function($routeProvider) {
      $routeProvider
      .when("/", {
          templateUrl : "home/home.html",
          controller: 'HomeController',
          resolve: {
            resolvedData: function(appService){
              return appService.get();
            }
          }
      })
      .when("/qc",{
          reloadOnSearch: false,
          templateUrl : "qc/qc.html",
          controller: 'QcController',
          resolve: {
            resolvedData: function(qcService){
              return qcService.get();
            }
          }

      })
    })
    .service('appService', function($http){
      return {
        get: function(){
          return $http.get('js/data.js').then(function(response) {
            return response.data;
          });
        }
      };
    })
    .service('qcService', function($http){
      return {
        get: function(){
          return $http.get('js/qc.js').then(function(response) {
            return response.data;
          });
        }
      };
    })
})();