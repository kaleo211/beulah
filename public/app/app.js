var app = angular.module('app', [
  'ngRoute',
  'transaction',
  'summary'
]);

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider.otherwise({redirectTo: '/'});
});


