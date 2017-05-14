var app = angular.module('app', [
  'ngRoute',
  'transaction',
  'summary'
]);

app.controller('AppCtrl', [function() {
  angular.element(document).ready(function () {
    document.getElementsByClassName('modal').modal();
    document.getElementsByClassName('datepicker').pickadate({
      selectMonths: true,
      selectYears: 15
    });;
    document.getElementsByTagName('select').material_select();
  });
}]);

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider.otherwise({redirectTo: '/'});
});
