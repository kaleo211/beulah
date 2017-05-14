var app = angular.module('app', [
  'md.data.table',
  'ngRoute',
  'ngMaterial',
  'ngMessages',
  'transaction',
  'summary'
]);

app.controller('AppCtrl', [function() {
  angular.element(document).ready(function () {
  });
}]);

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider.otherwise({redirectTo: '/'});
});
