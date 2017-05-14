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

  $routeProvider
    .when('/transactions', {
      templateUrl: '／partials/transactions',
      controller: 'TransactionCtrl'
    })
    .otherwise({redirectTo: '/'});
});


